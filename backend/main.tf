provider "aws" {
  region = "us-east-2"
}

# Backend S3 Bucket
resource "aws_s3_bucket" "s3_backend" {
  bucket = "gurman-tf-state-bucket"
}

# Define DynamoDB table for locking state file
resource "aws_dynamodb_table" "dynamodb-lock-table" {
  name         = "my-lock-table"
  billing_mode = "PAY_PER_REQUEST" # Good for free tier
  hash_key     = "LockID"          # Partition key

  # Define partition key
  attribute {
    name = "LockID"
    type = "S"
  }
}

# Configure remote backend for state file
terraform {
  backend "s3" {
    bucket         = "gurman-tf-state-bucket"
    key            = "backend/terraform.tfstate"
    region         = "us-east-2"
    dynamodb_table = "my-lock-table"
  }
}

# S3 Bucket
resource "aws_s3_bucket" "website" {
  bucket = "gurman-personal-website"
}

# Configure S3 Bucket as Site
resource "aws_s3_bucket_website_configuration" "website" {
  bucket = aws_s3_bucket.website.id

  index_document {
    suffix = "index.html"
  }
}

# Disable Block Public Access
resource "aws_s3_bucket_public_access_block" "site_access_block" {
  bucket = aws_s3_bucket.website.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# Allow Public Read Access
resource "aws_s3_bucket_policy" "public_read" {
  bucket = aws_s3_bucket.website.id

  # Ensure this policy is not applied until the public access block settings are updated
  depends_on = [aws_s3_bucket_public_access_block.site_access_block]

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.website.arn}/*"
      }
    ]
  })
}

# Configure Cloudfront to have HTTPS requests from client to website
resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    # The website endpoint we want to pull content from (ORIGIN)
    domain_name = aws_s3_bucket.website.website_endpoint
    origin_id   = "websiteS3Origin"

    # Origin settings
    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "CDN for personal website"
  default_root_object = "index.html"

  # AWS Managed Caching Policy (CachingDisabled)
  default_cache_behavior {
    # Using the CachingDisabled managed policy ID:
    cache_policy_id  = "658327ea-f89d-4fab-a63d-7e88639e58f6"
    allowed_methods  = ["GET", "HEAD"]
    target_origin_id = "websiteS3Origin"
    cached_methods   = ["GET", "HEAD"]

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

# Cloudfront distribution domain name
output "cloudfront_distribution_name" {
  value = aws_cloudfront_distribution.s3_distribution.domain_name
}

# Get S3 Bucket URL
output "website_endpoint" {
  value = aws_s3_bucket.website.website_endpoint
}

# Define DynamoDB table for storing number of page visits
resource "aws_dynamodb_table" "basic-dynamodb-table" {
  name         = "VisitCounter"
  billing_mode = "PAY_PER_REQUEST" # Good for free tier
  hash_key     = "VisitId"         # Partition key

  # Define partition key
  attribute {
    name = "VisitId"
    type = "N"
  }
}

# Packages source file into zip
data "archive_file" "lambda_function" {
  type = "zip"

  source_dir  = "${path.module}/lambda_funcs"
  output_path = "${path.module}/lambda_funcs.zip"
}

# S3 Lambda Bucket
resource "aws_s3_bucket" "lambda_bucket" {
  bucket = "gurman-lambda-function-bucket"
}

output "lambda_bucket_name" {
  value = aws_s3_bucket.lambda_bucket.id
}

resource "aws_s3_object" "lambda_function_file" {
  bucket = aws_s3_bucket.lambda_bucket.id

  # Tell bucket where to store this file
  key    = "lambda_funcs.zip"
  source = data.archive_file.lambda_function.output_path

  # Generates a checksum to validate successful file transfer
  etag = filemd5(data.archive_file.lambda_function.output_path)
}

# Lambda Function
resource "aws_lambda_function" "lambda_function" {
  function_name = "visitsLambda"

  s3_bucket = aws_s3_bucket.lambda_bucket.id
  s3_key    = aws_s3_object.lambda_function_file.key

  runtime = "python3.13"
  # Tells Lambda to run this function inside the file
  handler = "lambda_function.lambda_handler"

  # Hash generated based on contents of source file; when the contents change then Terraform re-deploys the Lambda function
  source_code_hash = data.archive_file.lambda_function.output_base64sha256

  role = aws_iam_role.lambda_exec.arn
}

# Cloudwatch Logging
resource "aws_cloudwatch_log_group" "lambda_function_logs" {
  name = "/aws/lambda/${aws_lambda_function.lambda_function.function_name}"

  retention_in_days = 30
}

# Defines a role with a policy that defines that Lambda service can assume (use) this role
resource "aws_iam_role" "lambda_exec" {
  name = "serverless_lambda"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Sid    = ""
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })
}

# Define a policy for read/write access to our Visits table
resource "aws_iam_policy" "lambda_dynamodb_rw" {
  name = "LambdaDynamoDBReadWritePolicy"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:Scan",
          "dynamodb:Query"
        ],
        Resource = aws_dynamodb_table.basic-dynamodb-table.arn
      }
    ]
  })
}

# Attach the definition for lambda_dynamodb_rw policy to our custom IAM role
resource "aws_iam_role_policy_attachment" "lambda_dynamodb_attach" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = aws_iam_policy.lambda_dynamodb_rw.arn
}

# Attach policy to allow for Cloudwatch logging from the Lambda function
resource "aws_iam_role_policy_attachment" "cw_lambda_policy" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_apigatewayv2_api" "website_http_api" {
  name          = "website-http-api"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins  = ["https://${aws_cloudfront_distribution.s3_distribution.domain_name}"]
    allow_methods  = ["POST"]
    allow_headers  = ["Content-Type"]
    expose_headers = []
    max_age        = 3600
  }
}

resource "aws_apigatewayv2_integration" "lambda_integration" {
  api_id                 = aws_apigatewayv2_api.website_http_api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.lambda_function.invoke_arn
  integration_method     = "POST"
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "visit_route" {
  api_id    = aws_apigatewayv2_api.website_http_api.id
  route_key = "POST /visits"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.website_http_api.id
  name        = "$default"
  auto_deploy = true
}

resource "aws_lambda_permission" "apigw_permission" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda_function.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.website_http_api.execution_arn}/*/*"
}

output "http_api_link" {
  value = aws_apigatewayv2_api.website_http_api.api_endpoint
}





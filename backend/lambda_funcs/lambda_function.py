import json
import boto3

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('VisitCounter')

    # Add one to the counter and ask for the new value to be returned
    response = table.update_item(
        Key={'VisitId': 1},
        UpdateExpression="ADD #cnt :val",
        ExpressionAttributeNames={'#cnt': 'Visits'},
        ExpressionAttributeValues={':val': 1},
        ReturnValues="UPDATED_NEW"
    )

    # Retrieve the new value
    visitors = response['Attributes']['Visits']
    visitors = int(visitors) * 100000

    return {
        'statusCode': 200,
        'body': json.dumps(str(visitors))
    }
import "./styles/styles.css"

function ProjectListItem({link, imgSrc, alt, caption}) {
    return (
        <li className="flex-item">
          <a href={link} title="View">
            <figure>
              <div className="thumbnail">
                <span className="overlay">View</span>
                <img src={imgSrc} alt={alt}/>
              </div>
              <figcaption>
                <p style={{margin: "15px", fontSize: "15px"}}>
                  {caption}
                </p>
              </figcaption>
            </figure>
          </a>
        </li>
    );
}

export default ProjectListItem
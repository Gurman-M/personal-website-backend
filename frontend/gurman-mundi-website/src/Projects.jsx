import ProjectList from "./ProjectList"
import "./styles/styles.css"

function Projects() {

  return (
    <>
      {/* Projects Section */}
      <div className="w3-container" style={{padding:"128px 16px"}}>
        <h2 className="w3-center" style={{fontFamily: "pixel-title-font", fontSize: "50px"}}>PROJECTS</h2>

        <p className="w3-large" style={{margin: "50px"}}>
          For me, side projects have been a great way for me to increase my programming knowledge by applying what I have learnt to try to 
          create something unique and useful. Below is a list of projects I have completed so far. You can view the source code on my GitHub.
        </p>
      </div>

      <ProjectList />
    </>
  );
}

export default Projects
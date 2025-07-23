import "./styles/styles.css"
import resume from "/src/assets/gurman-mundi-resume.pdf"

function Resume() {

  return (
    <>
      {/* Resume Section */}
      <div className="w3-container w3-center" style={{padding:"128px 16px"}}>
        <h2 className="w3-center" style={{fontFamily: "pixel-title-font", fontSize: "50px"}}>RESUME</h2>

        <p className="w3-large w3-center">
        If the embed below does not work, you can access it directly <a style={{color: "lightskyblue"}} href={resume} download>here.</a></p>
        <br />

        <embed src={resume} width="500" height="650" type="application/pdf" />
      </div>
    </>
  );
}

export default Resume
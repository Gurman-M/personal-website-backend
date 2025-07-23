import "./styles/styles.css"

function Competitive() {

  return (
    <>
      {/* Competitive Programming Section */}
      <div className="w3-container" style={{padding:"128px 16px"}}>
        <h2 className="w3-center" style={{fontFamily: "pixel-title-font", fontSize: "50px"}}>COMPETITIVE PROGRAMMING</h2>

        <br />

        <p className="w3-large" style={{margin: "50px"}}>
          Competitive programming has been one of my biggest and most recent hobbies in the past couple years.
          On my GitHub profile, I have solutions for some of the problems I have solved. You can visit my repository
          <a style={{color: "lightskyblue"}} href="https://github.com/Gurman-M/Competitive-Programming"> here.</a></p>

        <br />

        <h2 style={{fontFamily: "pixel-title-font", marginLeft: "50px", fontSize: "35px"}}>Online Judge Profiles</h2>

        <p className="w3-large" style={{margin: "50px"}}>
          I use online judges to practice programming problems. Here are my profiles for the online judges that I use.</p>
          <p className="w3-large" style={{margin: "50px"}}>
          <a style={{color: "lightskyblue"}} href="https://dmoj.ca/user/Gurman_M">DMOJ: Gurman-M</a>
          
          <br /><br />

          <a style={{color: "lightskyblue"}} href="https://codeforces.com/profile/gurmanm23#">Codeforces: gurmanm23</a>
        </p>

      </div>
    </>
  );
}

export default Competitive
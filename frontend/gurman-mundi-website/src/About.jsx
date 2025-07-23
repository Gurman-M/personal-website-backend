import "./styles/styles.css"

function About() {
    return (
        <div className="w3-container" style={{padding:"128px 10px"}} id="about">
            <h2 className="w3-center" style={{fontFamily: 'pixel-title-font', fontSize: '50px'}}>ABOUT ME</h2>

            <br />

            <p className="w3-large" style={{margin: '50px'}}>
                    This is where I keep my personal profile, such as my projects, competitive programming endeavours, and resume. 
                    In the future, I may also upload some tools/projects I have used to improve my programming skills. 
                    
                    <br /><br /><br />

                    As of right now, I'm at Carleton University to further increase my knowledge of 
                    computer science and mathematics. I have spent much of the past few years on competitive programming, solving over 
                    300 problems on websites like DMOJ, Codingbat, and USACO. On my GitHub, I've uploaded solutions to the various problems I 
                    have solved and I hope to keep adding to the list I have right now. Feel free to visit my GitHub to learn more. 
                    
                    <br /><br /><br />

                    I hope you stick around and check out some of the things here!
            </p>
        </div>
    );
}

export default About
import About from "./About"
import { useState, useEffect, useMemo } from "react"
import "./styles/styles.css"

function Home() {
  function typeWriter(text, speed) {
    const [index, setIndex] = useState(0);
    const displayText = useMemo(() => text.slice(0, index), [index]);
    
    useEffect(() => {
      if (index >= text.length) return;

      const timeoutId = setTimeout(() => {
        setIndex(prevIndex => prevIndex + 1);
      }, speed);

      return () => {
        clearTimeout(timeoutId);
      };
    }, [index, text, speed]);

    return displayText;
  }

  const [visitors, setVisitors] = useState(null);

  // Get # of visitors
  useEffect(() => {
    fetch('https://n2uco1ui1g.execute-api.us-east-2.amazonaws.com/visits', {
      method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
      setVisitors(data);
    });
  }, []);

  const text = typeWriter("Hey, I'm Gurman.", 100);

  return (
    <>
      {/* Header with full-height image */}
      <header className="bgimg-1 w3-display-container w3-grayscale-min" id="home">
        <div className="w3-display-left w3-text-white" style={{paddingLeft: '48px', paddingRight: '48px', paddingTop: '48px', paddingBottom: '120px'}}>
          <span className="w3-jumbo w3-hide-small" style={{fontFamily: 'pixel-title-font', color: 'white'}} id="name-header">{text}</span><br />
          <hr size="100" width="100%" color="tan" />
          <p><a href="#about" className="w3-button w3-white w3-padding-large w3-large w3-margin-top w3-opacity w3-hover-opacity-off" style={{fontFamily: 'pixel-title-font'}}><font size = "5">Learn More</font></a></p>
          <p>Visits: {visitors === null ? 'Loading...' : visitors}</p>
        </div>
      </header><br />

      {/* About Section */}
      <About />
    </>
  );
}

export default Home
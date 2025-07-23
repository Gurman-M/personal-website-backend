import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from "./Navbar"
import Footer from "./Footer"
import Home from './Home';
import Projects from './Projects';
import Competitive from './Competitive';
import Resume from './Resume';
import ScrollToTop from './ScrollToTop';
import "./styles/styles.css"

function App() {
  return (
    <>
      <div className="container">
        <Navbar />
        <main>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/competitive" element={<Competitive />} />
            <Route path="/resume" element={<Resume />} />

            {/* Nothing matched, re-direct unknown requests to home */}
            {/* Replace will ensure if the user tries to go back by clicking back button, it will go back to last valid page, broken links won't be revisited */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App
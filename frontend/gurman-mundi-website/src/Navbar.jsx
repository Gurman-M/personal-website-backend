import { useState, useEffect } from "react"
import NavbarItem from "./NavbarItem"
import { HashLink } from 'react-router-hash-link';
import "./styles/styles.css"

function Navbar() {
    const [visible, setVisibility] = useState("none");
    const [navBarTop, setNavBarTop] = useState("0");

    const toggleVisibility = () => {
        setVisibility(() => (visible === 'none') ? 'block' : 'none');
    }

    useEffect(() => {
        /* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
        var prevScrollpos = window.pageYOffset;
        function handleScroll() {
            var currentScrollPos = window.pageYOffset;
            if (prevScrollpos > currentScrollPos) {
                /* shows the navbar if scrolling up */
                setNavBarTop("0");
            } else {
                /* hides navbar if scrolling down */
                setNavBarTop("-100px");
            }
            prevScrollpos = currentScrollPos;
        }

        window.addEventListener("scroll", handleScroll);

        // Clean up
        return () => { window.removeEventListener("scroll", handleScroll) };
    }, []);

    return (
        // Navbar (sit on top)
        <header>
            <div className="w3-top">
                <div className="w3-bar w3-light-grey w3-card" style={{top: navBarTop}} id="myNavbar">
                    <NavbarItem link="/" name="HOME" fontName="pixel-title-font" />
                    {/* Right-sided navbar links */}
                    <div className="w3-right w3-hide-small">
                        <HashLink smooth to="/#about" className="w3-bar-item w3-button" style={{fontFamily: "pixel-title-font"}}><font size={"5"}>ABOUT</font></HashLink>
                        <NavbarItem link="/projects" name="PROJECTS" fontName="pixel-title-font" />
                        <NavbarItem link="/competitive" name="COMPETITIVE PROGRAMMING" fontName="pixel-title-font" />
                        <NavbarItem link="/resume" name="RESUME" fontName="pixel-title-font" />
                    </div>
                    {/* Hide right-floated links on small screens and replace them with a menu icon */}
                    <button className="w3-bar-item w3-button w3-right w3-hide-large w3-hide-medium" onClick={toggleVisibility}>
                        <i className="fa fa-bars"></i>
                    </button>
                </div>

                {/* Sidebar on small screens when clicking the menu icon */}
                <nav className="w3-sidebar w3-bar-block w3-black w3-card w3-animate-left w3-hide-medium w3-hide-large" style={{display: visible}}>
                    <HashLink smooth to="/#about" className="w3-bar-item w3-button" style={{fontFamily: "'Archivo Black', sans-serif"}}><font size={"4"}>ABOUT ME</font></HashLink>
                    <NavbarItem link="/projects" name="PROJECTS" fontName="'Archivo Black', sans-serif" fontSize="4" />
                    <NavbarItem link="/competitive" name="COMPETITIVE PROGRAMMING" fontName="'Archivo Black', sans-serif" fontSize="4" />
                    <NavbarItem link="/resume" name="RESUME" fontName="'Archivo Black', sans-serif" fontSize="4" />
                </nav>
            </div>
        </header>
    );
}

export default Navbar
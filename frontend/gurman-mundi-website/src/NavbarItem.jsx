import { Link } from 'react-router-dom';
import "./styles/styles.css"

function NavbarItem({ link, name, fontName, fontSize = "5"}) {
    return <Link to={link} className="w3-bar-item w3-button" style={{fontFamily: fontName}}><font size={fontSize}>{name}</font></Link>;
}

export default NavbarItem
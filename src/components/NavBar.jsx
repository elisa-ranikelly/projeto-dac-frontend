import { Link } from "react-router-dom";
import "./NavBar.css";
import logo from "../assets/LetreiroBranco.png"

function NavBar({links}) {

    return (
        <nav className="nav-bar">
            <Link to="/">
                <img src={logo} alt="IF Logo" className="img-nav-bar"/>
            </Link>
            <ul className="list">
                {links.map(link => (
                    <li className="item" key={link.nome}><Link to={link.to}>{link.nome}</Link></li>
                ))}
            </ul>
        </nav>
    )      
}

export default NavBar;
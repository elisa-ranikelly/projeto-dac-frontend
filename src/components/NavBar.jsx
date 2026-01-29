import { Link } from "react-router-dom";
import "./NavBar.css";
import logo from "../assets/LetreiroBranco.png";
import LogoutButton from "./LogoutButton";

function NavBar({links}) {

    return (
        <nav className="nav-bar">
            <Link to="/">
                <img src={logo} alt="IF Logo" className="img-nav-bar"/>
            </Link>
            
            <ul className="list">
                {links.map(link => (
                <li className="item" key={link.nome}>
                    {link.nome === "Sair" ? <LogoutButton /> 
                    : <Link to={link.to}>{link.nome}</Link> }
                </li>
                ))}
            </ul>
        </nav>
    )      
}

export default NavBar;
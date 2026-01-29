import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/autenticacao";
import "./LogoutButton.css";

function LogoutButton(){
    const navigate = useNavigate();

    function handleLogout(event){
        event.preventDefault();
        logout();
        navigate("/");
    }

    return(
        <div>
            <Link to="/" onClick={handleLogout}>Sair</Link>
        </div>
    )
}

export default LogoutButton;
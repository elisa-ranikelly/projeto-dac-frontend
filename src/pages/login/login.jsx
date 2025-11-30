import {FaUser, FaLock} from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-negociaif-fundo-trasparente.png";
import "./login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submicao = (event) =>{
        event.preventDefault();
        console.log("Envio.");
    }
        

  return (

    <article className="page">
        <img src={logo} alt="Logo" className="logo" />

        <section className="container">

            <form onSubmit={submicao}>
                <h1>Acesse o sistema</h1>

                <div className="input">
                    <input type="email" placeholder="E-mail acadêmico" required onChange={(e) => setEmail(e.target.value)}/>
                    <FaUser className="icon"/>
                </div>

                <div className="input">
                    <input type="password" placeholder="Senha" required onChange={(e) => setPassword(e.target.value)}/>
                    <FaLock className="icon" />
                </div>

                <div className="lembranca">
                    <label>
                        <input type="checkbox"/> Lembre-se de mim
                    </label>
                </div>
                <button type="submit">Entrar</button>

                <div className="cadastro">
                    <p>Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link></p>
                </div>
            </form>

        </section>
    </article>
  );
}

export default Login

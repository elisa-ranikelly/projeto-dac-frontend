import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-negociaif-fundo-trasparente.png";
import "./Cadastro.css";

const Cadastro = () => {
    const [nome, setNome] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [telefone, setTelefone] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const cadastrar = (event) => {
        event.preventDefault();

        if(senha !== confirmarSenha){
            alert("As senhas não são iguais!");
        }

        console.log("Cadastro realizado");
    }

    return (
        <section className="cadastro-container">
            <form onSubmit={cadastrar}>

                <div className="titulo-logo">
                    <img src={logo} alt="logo" className="logo-cadastro"/>
                    <h1>Cadastre-se</h1>
                </div>

                <div className="input">
                    <input type="text" placeholder="Nome completo" required onChange={(e) => setNome(e.target.value)}/>
                </div>

                <div className="input">
                    <input type="email" placeholder="E-mail acadêmico" required onChange={(e) => setUserName(e.target.value)}/>
                </div>

                <div className="input">
                    <input type="tel" placeholder="Telefone" required onChange={(e) => setTelefone(e.target.value)}/>
                </div>

                <div className="input">
                    <input type="password" placeholder="Senha" required onChange={(e) => setConfirmarSenha(e.target.value)}/>
                </div>

                <div className="input">
                    <input type="password" placeholder="Confirmar senha" value={confirmarSenha} required onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <button type="submit">Cadastrar</button>

                <div className="cadastro">
                    <p>Já possui uma conta? <Link to="/login">Faça Login</Link>
                    </p>
                </div>
                

            </form>

        </section>
    )
}

export default Cadastro
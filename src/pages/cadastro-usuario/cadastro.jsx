import { useState } from "react";
import { Link } from "react-router-dom";
import "./cadastro.css";

const Cadastro = () => {
    const [nome, setNome] = useState("");
    const [useremail, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [telefone, setTelefone] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const cadastrar = (event) => {
        event.preventDefault();

        if(password !== confirmarSenha){
            alert("As senhas não são iguais!");
        }

        console.log("Cadastro realizado");
    }

    return (
        <article className="page-cadastro">
            <section className="cadastro-container">
                <h1>Cadastre-se</h1>
                <form onSubmit={cadastrar}>

                    <div className="input">
                        <input type="text" placeholder="Nome" required onChange={(e) => setNome(e.target.value)}/>
                    </div>

                    <div className="input">
                        <input type="email" placeholder="E-mail acadêmico" required onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div className="input">
                        <input type="tel" placeholder="Telefone (xx) xxxxx-xxxx" pattern="\(\d{2}\)\s?\d{4,5}-\d{4}" required onChange={(e) => setTelefone(e.target.value)}/>
                    </div>

                    <div className="input">
                        <input type="password" placeholder="Senha" required onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    <div className="input">
                        <input type="password" placeholder="Confirmar senha" value={confirmarSenha} required onChange={(e) => setConfirmarSenha(e.target.value)}/>
                    </div>

                    <button type="submit">Cadastrar</button>

                    <div className="cadastro">
                        <p>Já possui uma conta? <Link to="/">Faça Login</Link>
                        </p>
                    </div>        
                </form>
            </section>
        </article>
    )
}

export default Cadastro
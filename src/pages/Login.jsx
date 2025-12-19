import {FaUser, FaLock} from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/LogoTransparente.png"
import "./Login.css";
import "./media-queries/forms.css";
import { login } from "../services/autenticacao";
import { toast } from "react-toastify";
import LinkButton from "../components/LinkBtn";
import "../components/LinkBtn.css";
import Input from "../components/Input"

const Login = () => {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const navigate = useNavigate();


    async function handleLogin(event){
        event.preventDefault();

        try{
            const response = await login (email,senha);

            localStorage.setItem("usuario", JSON.stringify(response.data));
            console.log("Login response:", response.data)

            toast.success("Login realizado com sucesso!");
            console.log("Role:", response.data.roles);

            navigate("/catalogo");
        } catch (error){
            toast.error("Email ou senha inválidos!");
        }
    }

  return (

    <article className="page">
        <img src={logo} alt="Logo" className="logo" />

        <section className="container">

            <form onSubmit={handleLogin}>
                <h1>Acesse o sistema</h1>

                <Input
                    type="email"
                    placeholder="Email acadêmico"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    icon={FaUser}
                />

                <Input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    required
                    onChange={(e) => setSenha(e.target.value)}
                    icon={FaLock}
                />

                <div className="lembranca">
                    <label>
                        <input type="checkbox"/> Lembre-se de mim
                    </label>
                </div>
                <button type="submit" className="btn">Entrar</button>

                <LinkButton to="/" text="Voltar" />

                <div className="cadastro">
                    <p>Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link></p>
                </div>
            </form>

        </section>
    </article>
    );
}


export default Login

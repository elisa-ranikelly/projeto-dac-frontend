import "../pages/CadastroUsuario.css"
import "../pages/media-queries/forms.css"
import { Link } from "react-router-dom"
import LinkButton from "./LinkBtn"
import Input from "./Input"


const AdminForm = ({usuario, setUsuario, confirmarSenha, setConfirmarSenha, onSubmit}) => {

    return (
        <article className="page-cadastro">
            <section className="cadastro-container">
                <h1>Cadastre-se</h1>
                <form onSubmit={onSubmit}>

                    <Input
                        type="text"
                        placeholder="Nome"
                        value={usuario.nome}
                        required
                        onChange={e => setUsuario({...usuario, nome: e.target.value})} 
                    />

                    <Input
                        type="email"
                        placeholder="E-mail acadêmico"
                        value={usuario.email}
                        required
                        onChange={e => setUsuario({...usuario, email: e.target.value})} 
                    />

                    <Input
                        type="password"
                        placeholder="Senha"
                        value={usuario.senha}
                        required
                        onChange={e => setUsuario({...usuario, senha: e.target.value})} 
                    />

                    <Input
                        type="password"
                        placeholder="Confirmar senha"
                        value={confirmarSenha}
                        required
                        onChange={e => setConfirmarSenha(e.target.value)} 
                    />

                    <button type="submit" className="btn">Cadastrar</button>

                    <LinkButton to="/" text="Voltar" />

                    <div className="cadastro">
                        <p>Já possui uma conta? <Link to="/login">Faça Login</Link>
                        </p>
                    </div>           
                </form>
            </section>
        </article>
    )
 }

 export default AdminForm
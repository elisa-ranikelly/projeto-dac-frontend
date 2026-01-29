import { Link, useNavigate } from "react-router-dom";
import { excluirUsuario } from "../services/usuarioService";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./PerfilCard.css";

function PerfilCard({usuario}){

    const navigate = useNavigate();

    async function handleExcluir(){
        if (!window.confirm("Tem certeza que deseja excluir sua conta?")) return;

        try{
            await excluirUsuario(usuario.id);
            localStorage.removeItem("auth");
            localStorage.clear();
            toast.success("Conta excluída com sucesso!");
            navigate("/");
        } catch (error){
            const mensagemErro = error.response?.data?.mensagem || "Erro ao excluir conta.";
            toast.error(mensagemErro);
        }
    }

    return(
        <section className="perfil-card">
            <h2>Informações da sua conta</h2>
            <div className="informacoes">
                <p><strong>Nome:</strong> {usuario.nome}</p>
                <p><strong>Email:</strong> {usuario.email}</p>
                {usuario.telefone && (
                    <p><strong>Telefone:</strong> {usuario.telefone}</p>
                )}
            </div>

            <div className="acoes">
                <Link to={`/editar-perfil/${usuario.id}`} className="btn btn-editar"> <FaEdit className="icone"/> Editar </Link>

                <button className="btn btn-excluir" onClick={handleExcluir}> <FaTrash className="icone"/> Excluir conta </button>
            </div>
        </section>
    )
}

export default PerfilCard;
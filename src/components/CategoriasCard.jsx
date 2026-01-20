import { Link } from "react-router-dom";
import { excluirCategoria } from "../services/categoriaService";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./CategoriaCard.css";

function CategoriaCard({categoria, recarregarCategorias}) {

    async function handleExcluir() {

        if(!window.confirm("Tem certeza que deseja excluir essa categoria?")) return;

        try{
            await excluirCategoria(categoria.id);
            toast.success("Categoria excluída com sucesso!");
            recarregarCategorias();
        }catch (error){
            const mensagemErro = error.response?.data?.mensagem || "Erro ao excluir categoria, pois há item cadastrado nela!";
            toast.error(mensagemErro);
        }
    }

    return (
        <section className="meus-itens-card categoria-card">
            <div className="informacoes">
                <p><strong>{categoria.nome}</strong></p>
            </div>

            <div className="acoes">
                <Link
                    to={`/editar-categoria/${categoria.id}`} className="btn btn-editar"
                > <FaEdit className="icone" /> Editar </Link>

                <button className="btn btn-excluir" onClick={handleExcluir}> <FaTrash className="icone" /> Excluir</button>
            </div>
        </section>
    )
}

export default CategoriaCard;
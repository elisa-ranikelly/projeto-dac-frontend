import { FaEdit, FaTrash, FaCheck  } from "react-icons/fa";
import ItemFoto from "./ItemFoto";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { excluirItem, marcarItemComoVendido, marcarItemComoTrocado } from "../services/itemService";
import "./MeusItensCard.css";
import { formatarPreco } from "../utils/formatadores";
import { formatarDisponibilidade } from "../utils/formatadores";
import { formatarAprovacao } from "../utils/formatadores";

function MeusItensCard({ item, recarregarItens }) {

    async function handleExcluir() {
        if(!window.confirm("Tem certeza que deseja excluir este item?")) return;

        try {
            await excluirItem(item.id);
            toast.success("Item excluído com sucesso.");
            recarregarItens();
        } catch (error) {
            const mensagemErro = error.response?.data?.mensagem || "Erro ao excluir item.";
            toast.error(mensagemErro);
        }
    }

    async function handleMarcarComoVendido(){
        try {
            await marcarItemComoVendido(item.id);
            toast.success("Item marcado como vendido.");
            recarregarItens();
        }catch (error) {
            const mensagemErro = error.response?.data?.mensagem || "Erro ao marcar item como vendido.";
            toast.error(mensagemErro);
        }
    }

    async function handleMarcarComoTrocado() {
        try {
            await marcarItemComoTrocado(item.id);
            toast.success("Item marcado como trocado.");
            recarregarItens();
        }catch (error) {
            const mensagemErro = error.response?.data?.mensagem || "Erro ao marcar item como trocado.";
            toast.error(mensagemErro);
        }
    }

    return (
        <section className="meus-itens-card">
            <div className="imagem">
                {item.fotos && item.fotos.length > 0 && (
                    <ItemFoto
                        src={`http://localhost:8080${item.fotos[0].url}`}
                        alt={item.nome}/>
                )}
            </div>

            <div className="informacoes">
                <p><strong>{item.nome}</strong></p>
                <p><strong>{item.descricao}</strong></p>
                <p><strong>Categoria:</strong> {item.categoria}</p>
                <p><strong>Status do item:</strong> {formatarAprovacao(item.statusAprovacao)}</p>
                <p><strong>Disponibilidade:</strong> {formatarDisponibilidade(item.statusDisponibilidade)}</p>

                {formatarPreco(item) && (
                    <p><strong>Preço: {formatarPreco(item)}</strong></p>
                )}

                {item.statusAprovacao === "REPROVADO" && (
                    <p className="motivo-reprovacao"><strong>Motivo da reprovação: {item.motivoReprovacao}</strong></p>
                )}
            </div>

            <div className="acoes">
                <Link className="btn btn-editar" to={`/editar-item/${item.id}`}>
                    <FaEdit className="icone"/> Editar
                </Link>
                    
                <button className="btn btn-excluir" onClick={handleExcluir}> <FaTrash className="icone"/> Excluir </button>

                {item.statusAprovacao === "APROVADO" && item.statusDisponibilidade === "DISPONIVEL_VENDA" && (
                    <button className="btn btn-status" onClick={handleMarcarComoVendido}> <FaCheck  className="icone"/> Marcar como Vendido </button>
                )}

                {item.statusAprovacao === "APROVADO" && item.statusDisponibilidade === "DISPONIVEL_TROCA" && (
                    <button className="btn btn-status" onClick={handleMarcarComoTrocado}> <FaCheck  className="icone"/> Marcar como Trocado </button>
                )}
            </div>
        </section>
    )
}

export default MeusItensCard;
        
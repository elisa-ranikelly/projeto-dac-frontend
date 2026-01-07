import { useState } from "react";
import { aprovarItem, reprovarItem } from "../services/itemService";
import { toast } from "react-toastify";
import Input from "./Input";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import "./ItensPendentesCard.css";
import ItemFoto from "./ItemFoto";

function ItensPendentesCard({ item, recarregarItens }) {

    const [motivoReprovacao, setMotivoReprovacao] = useState("");
    
    async function handleAprovar() {
        try {
            await aprovarItem(item.id);
            toast.success("Item aprovado com sucesso!");
            recarregarItens();
        } catch (error) {
            const mensagemErro = error.response?.data?.message || "Erro ao aprovar item!";
            toast.error(mensagemErro);
        }
    }

    async function handleReprovar() {
        if(motivoReprovacao.trim() === "") {
            toast.error("Por favor, insira um motivo para a reprovação.");
            return;
        }
        try {
            await reprovarItem(item.id, { motivo: motivoReprovacao });
            toast.success("Item reprovado com sucesso!");
            recarregarItens();
        }catch (error) {
            const mensagemErro = error.response?.data?.message || "Erro ao reprovar item!";
            toast.error(mensagemErro);
        }
    }

    return (
        <section className="item-pendente-card">
            
            {item.fotos && item.fotos.length > 0 && (
                <ItemFoto 
                    src={`http://localhost:8080${item.fotos[0].url}`}
                    alt={item.nome}
                    className="item-foto"
                />
            )}
            <div className="textos">
                
                <p><strong>{item.descricao}</strong></p>
                <p><strong>Categoria:</strong> {item.categoria}</p>
                <p><strong>Disponibilidade:</strong> {item.statusDisponibilidade}</p>
                <p><strong>Preço:</strong> {item.preco}</p>
            </div>

            <div className="acoes">

                <button onClick={handleAprovar} className="btn"> <BsCheckCircleFill className="icon-aprovar"/> Aprovar</button>

                <div className="input-motivo">
                    <Input
                        type="text"
                        placeholder="Motivo da reprovação"
                        value={motivoReprovacao}
                        onChange={(e) => setMotivoReprovacao(e.target.value)}
                    />
                    <button onClick={handleReprovar} className="btn"> <BsXCircleFill  className="icon-reprovar"/> Reprovar</button>
                </div>
            </div>
        </section>
    )
}

export default ItensPendentesCard;
       
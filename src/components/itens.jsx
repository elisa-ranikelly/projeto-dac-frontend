import { useState, useEffect } from "react";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { FaRegHandshake, FaWhatsapp } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

export default function Itens({item}){

    function entrarEmContato(){
        const numero = item.telefone || "";
        const mensagem = `Olá, tenho interesse no item: ${item.nome}`;
        const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
        window.open(url, "_blank");
    }

    return(
        <article className="item-card">
            <section className="imagem-item">
                {item.fotos && item.fotos.length > 0 ? (
                    <img src={item.fotos[0]} alt={item.nome} />
                ) : (
                    <div className="sem-imagem">Sem imagem</div>
                )}
            </section>

            <section className="item-conteudo">
                <h3 className="item-nome">{item.nome}</h3>
                <p className="item-descricao">{item.descricao}</p>
                {item.statusDisponibilidade === "DISPONIVEL_VENDA" ?  (
                    <p className="item-preco">{item.preco}</p>
                ) : (
                    <p className="item-troca">Disponível para troca</p>
                )}
                
                <p className="item-telefone">Contato: {item.telefone}</p>
            </section>

            <button type="submit" className="bnt-interesse" onClick={entrarEmContato}>Tenho interesse <FaWhatsapp
            /> </button>
        </article>
    )  
}

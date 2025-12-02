import { useState, useEffect } from "react";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { FaRegHandshake, FaWhatsapp } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import "./itens.css";

export default function Itens({item}){

    function entrarEmContato(){
        let numero = item.telefone || "";
        numero = numero.replace(/\D/g, "");

        if(!numero.startsWith("55")){
            numero = "55" + numero;
        }

        const mensagem = `Olá, tenho interesse no item: ${item.nome}`;
        const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
        window.open(url, "_blank");
    }

    const venda = item.statusDisponibilidade === "DISPONIVEL_VENDA";
    const troca = item.statusDisponibilidade === "DISPONIVEL_TROCA";

    const precoFormatado = Number(troca ? 0 : item.preco)
        .toFixed(2)
        .replace(".", ",");



    return(
        <article className="item-card">
            <section className="imagem-item">
                {item.fotos && item.fotos.length > 0 ? (
                    <img src={item.fotos[0]} alt={item.nome} />
                ) : (
                    <div className="sem-imagem">Imagem</div>
                )}
            </section>

            <section className="item-conteudo">

                <h3 className="item-nome">{item.nome}</h3>
                <p className="item-descricao">{item.descricao}</p>

                <p className="item-status">
                    {venda ? "Disponível para venda" : "Disponível para troca"}
                </p>
                
                <p className="item-preco">
                    Preço: R$ {precoFormatado}
                </p>
                            
                <p className="item-telefone">Contato: {item.telefone}</p>
            </section>

            <button type="submit" className="bnt-interesse" onClick={entrarEmContato}>Tenho interesse <FaWhatsapp
            /> </button>
        </article>
    )  
}

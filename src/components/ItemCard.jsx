import { FaWhatsapp } from "react-icons/fa";
import "./ItemCard.css";
import ItemFoto from "./ItemFoto";
import CarroselFotos from "./CarroselFotos";
import { useState } from "react";

export default function Itens({item}){

    function entrarEmContato(){
        
        let numero = item.telefone || "";
        numero = numero.replace(/\D/g, "");

        if(!numero.startsWith("55")){
            numero = "55" + numero;
        }

        const linkItem = `${window.location.origin}/item/${item.id}`;

        const mensagem = `Olá, tenho interesse no item: ${item.nome}Link do item: ${linkItem}`;

        const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
        window.open(url, "_blank");
    }

    const venda = item.statusDisponibilidade === "DISPONIVEL_VENDA";
    const troca = item.statusDisponibilidade === "DISPONIVEL_TROCA";

    const precoFormatado = Number(troca ? 0 : item.preco)
        .toFixed(2)
        .replace(".", ",");

    const [fotoIndex, setFotoIndex] = useState(0);

    return(
        <article className="item-card">
            <section className="imagem-item">
                {item.fotos && item.fotos.length > 0 ? (
                    <ItemFoto src={`http://localhost:8080${item.fotos[fotoIndex].url}`} 
                    alt={item.nome} />
                ) : (
                    <div className="sem-imagem">Imagem</div>
                )}
            </section>

            <section className="controle-carrosel">
                <CarroselFotos
                    total={item.fotos.length}
                    indexAtual={fotoIndex}
                    onChange={setFotoIndex}
                />
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

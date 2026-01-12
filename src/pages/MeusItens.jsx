import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MeusItensCard from "../components/MeusItensCard";
import { listarMeusItens } from "../services/itemService";

function MeusItens() {

    const [itens, setItens] = useState([]);
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    async function carregarMeusItens() {
        try {
            const response = await listarMeusItens(usuario.id);
            console.log("Resposta completa:", response);
            console.log("Dados recebidos:", response.data);
            console.log("Quantidade:", response.data.length);
            setItens(response.data);
        } catch (error) {
            const mensagemErro = error.response?.data?.mensagem
            toast.error(mensagemErro);
        }
    }

    useEffect(() => {
        carregarMeusItens();
    }, []);

    

    return (
        <article>
            <NavBar 
                links={[
                    {nome: "Voltar", to:"/perfil-usuario"},
            ]} />
            <section className="meus-itens-container">
                <h1>Meus Itens</h1>
                
                {itens.length === 0 ? (
                    <p className="mensagem-vazia">Você não possui itens cadastrados.</p>
                ) : (
                    itens.map(item => (
                        <MeusItensCard
                            key={item.id}
                            item={item}
                            recarregarItens={carregarMeusItens}
                        />
                    ))
                )}
            </section>
        </article>
    );

}

export default MeusItens;
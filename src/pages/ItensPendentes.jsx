import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { listarItensPendentes } from "../services/itemService";
import NavBar from "../components/NavBar";
import ItensPendentesCard from "../components/ItensPendentesCard";
import "./ItensPendentes.css";

function ItensPendentes() {

    const [itens, setItens] = useState([]);

    async function buscarItensPendentes() {
        try {
            const response = await listarItensPendentes();
            setItens(response.data);
        } catch (error) {
            const mensagemErro = error.response?.data?.message || "Erro ao verificar itens pendentes!";
            toast.error(mensagemErro);
        }
    }

   useEffect(() => {
        buscarItensPendentes();
   }, []);
    

  return (
    <section>
        <NavBar 
            links={[
                {nome: "Voltar", to:"/perfil-admin"}
        ]} />
        <div>
            <h1>Itens Pendentes</h1>
        </div>
        {itens.length === 0 ? (
            <p className="mensagem-vazia">Não há itens pendentes no momento!</p>
        ) : (
            
        <div>
            {itens.map((item) => (
                <ItensPendentesCard
                    key={item.id}
                    item={item}
                    recarregarItens={buscarItensPendentes}
                />
            ))}
        </div>
        )}
    </section>
  );
}

export default ItensPendentes;
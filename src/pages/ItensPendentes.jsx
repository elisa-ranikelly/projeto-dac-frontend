import { useEffect, useState } from "react";
import { listarItensPendentes } from "../services/itensService";
import { toast } from "react-toastify";
import { listarItensPendentes } from "../services/itemService";

function ItensPendentes() {

    const [itens, setItens] = useState([]);

    useEffect(() => {
        async function buscarItensPendentes() {
            try {
                const response = await listarItensPendentes();
                setItens(response.data);
            } catch (error) {
                toast.error("Erro ao buscar itens pendentes!");
            }
        }

        buscarItensPendentes();
    }, []);

  return (
    <section>
        <h1>Itens Pendentes</h1>
        
    </section>
  );
}

export default ItensPendentes;
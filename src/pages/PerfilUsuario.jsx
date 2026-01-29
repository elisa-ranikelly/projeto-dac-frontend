import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import {buscarUsuarioLogado} from "../services/usuarioService";
import PerfilCard from "../components/PerfilCard";
import {toast} from "react-toastify";

function PerfilUsuario() {

    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        async function carregarPerfil(){
            try{
                const response = await buscarUsuarioLogado();
                setUsuario(response.data);
            }catch (error) {
                const mensagemErro = error.response?.data?.mensagem || "Erro ao carregar perfil.";
                toast.error(mensagemErro);
            }
        }
        carregarPerfil();
    }, []);

    return (
        <article>
            <NavBar 
                links={[
                    {nome: "Catálogo", to:"/catalogo"},
                    {nome: "Meus itens", to:"/meus-itens"},
                    {nome: "Sair", to:"/"}
            ]} />
            <section>
                <h1>Perfil</h1>

                {usuario && <PerfilCard usuario={usuario} />}
            </section>
        </article>
    );
}

export default PerfilUsuario;
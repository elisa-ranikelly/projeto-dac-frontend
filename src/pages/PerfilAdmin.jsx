import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import PerfilCard from "../components/PerfilCard";
import { buscarUsuarioLogado } from "../services/usuarioService";
import {toast} from "react-toastify";

function PerfilAdmin() {

    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        async function carregarPerfil(){
            try{
                const response = await buscarUsuarioLogado();
                setUsuario(response.data);
            }catch(error){
                const mensagemErro = error.response?.data?.mensagem || "Erro ao carregar perfil.";
                toast.error(mensagemErro);
            }
        }
        carregarPerfil();
    },[])
    return(
        <article>
            <NavBar 
                links={[
                    {nome: "Catálogo", to:"/catalogo"},
                    {nome: "Categorias", to:"/gerenciar-categorias"},
                    {nome: "Cadastrar admin", to:"/cadastro?tipo=admin"},
                    {nome: "Itens Pendentes", to:"/itens-pendentes"},
                    {nome: "Sair", to:"/"}
            ]} />
            <section>
                <h1>Perfil</h1>
                {usuario && <PerfilCard usuario={usuario} /> }
            </section>
        </article>
    )
}

export default PerfilAdmin;
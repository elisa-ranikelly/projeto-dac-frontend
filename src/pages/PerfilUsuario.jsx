import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import {buscarUsuarioPorId} from "../services/usuarioService";
import PerfilCard from "../components/PerfilCard";

function PerfilUsuario() {

    const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        async function carregarUsuario(){
            try{
                const response = await buscarUsuarioPorId(usuarioLogado.id);
                setUsuario(response.data);
            }catch (error) {
                toast.error("Erro ao carregar usuário!");
            }
        }
        carregarUsuario();
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
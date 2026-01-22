import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import PerfilCard from "../components/PerfilCard";

function PerfilAdmin() {

    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));
        setUsuario(usuarioLogado);
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
import NavBar from "../components/NavBar";

function PerfilUsuario() {
    return (
        <article>
            <NavBar 
                links={[
                    {nome: "Meus itens", to:"/cadastro-item"},
                    {nome: "Catálogo", to:"/catalogo"},
                    {nome: "Sair", to:"/"}
            ]} />
        </article>
    );
}

export default PerfilUsuario;
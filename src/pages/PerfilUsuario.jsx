import NavBar from "../components/NavBar";

function PerfilUsuario() {
    return (
        <article>
            <NavBar 
                links={[
                    {nome: "Meus itens", to:"/meus-itens"},
                    {nome: "Catálogo", to:"/catalogo"},
                    {nome: "Sair", to:"/"}
            ]} />
        </article>
    );
}

export default PerfilUsuario;
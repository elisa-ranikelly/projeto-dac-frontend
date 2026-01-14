import NavBar from "../components/NavBar";

function PerfilUsuario() {
    return (
        <article>
            <NavBar 
                links={[
                    {nome: "Catálogo", to:"/catalogo"},
                    {nome: "Meus itens", to:"/meus-itens"},
                    {nome: "Sair", to:"/"}
            ]} />
        </article>
    );
}

export default PerfilUsuario;
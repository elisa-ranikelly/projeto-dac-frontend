import NavBar from "../components/NavBar";

function PerfilAdmin() {
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
        </article>
    )
}

export default PerfilAdmin;
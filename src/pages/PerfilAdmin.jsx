import NavBar from "../components/NavBar";

function PerfilAdmin() {
    return(
        <article>
            <NavBar 
                links={[
                    {nome: "Criar categoria", to:"/categoria"},
                    {nome: "Cadastrar admin", to:"/cadastro?tipo=admin"},
                    {nome: "Itens Pendentes", to:"/itens-pendentes"},
                    {nome: "Sair", to:"/"}
            ]} />
        </article>
    )
}

export default PerfilAdmin;
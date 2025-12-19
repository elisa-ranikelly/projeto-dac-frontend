import NavBar from "../components/NavBar";

function PerfilUsuario() {
    return (
        <article>
            <NavBar 
                links={[
                    {nome: "Criar item", to:"/cadastro-item"},
                    {nome: "Sair", to:"/"}
            ]} />
        </article>
    );
}

export default PerfilUsuario;
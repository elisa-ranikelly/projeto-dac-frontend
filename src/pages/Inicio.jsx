import "./Inicio.css"
import logo from "../assets/LogoTransparente.png"
import NavBar from "../components/NavBar"

function Inicio () {

    return (
        <>
            <NavBar links={[
            {nome : "Inicio", to: "/"},
            {nome : "Login", to: "/login"},
            {nome: "Cadastre-se", to: "/cadastro"}
        ]} />
            <section className="home-container">
                <h1>Bem vindo ao <strong>Negocia IF</strong></h1>
                <p>Comece a negociar os seus itens agora mesmo!</p>
                <img src={logo} alt="Logo" />
            </section>
        </>
    )
}

export default Inicio;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Categoria.css";
import "./media-queries/forms.css";
import Input from "../components/Input";

const Categoria = () => {
    const [nomeCategoria, setNomeCategoria] = useState("");

    const cadastrarCategoria = (event) => {
        event.preventDefault();
        
        console.log("Cadastro realizado");
    }

  return (
    <article className="page-cadastro-categoria">
        <section className="cadastro-categoria-container">
            <h1>Cadastre uma categoria</h1>
            <form onSubmit={cadastrarCategoria}>

                <Input
                    type="text"
                    placeholder="Categoria" 
                    required
                    onChange={(e) => setNomeCategoria} 
                />

                <button type="submit" className="btn">Cadastrar</button>

                <Link to={"/perfil-admin"} className="btn">Voltar</Link>
            </form>
        </section>

    </article>
  )
}

export default Categoria

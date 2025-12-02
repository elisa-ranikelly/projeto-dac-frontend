import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./categoria.css";

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
                <div className="input">
                    <input type="text" placeholder="Categoria" required onChange={(e) => setNomeCategoria}/>
                </div>

                <button type="submit">Cadastrar</button>
                <Link to={"/perfil-admin"} className="btn-voltar">Voltar</Link>
            </form>
        </section>

    </article>
  )
}

export default Categoria

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Categoria.css";
import "./media-queries/forms.css";
import Input from "../components/Input";
import { criarCategoria } from "../services/categoriaService";
import { toast } from "react-toastify";

const Categoria = () => {
    const [nomeCategoria, setNomeCategoria] = useState("");
    const navigate = useNavigate();

    const cadastrarCategoria = async(event) => {
        event.preventDefault();
        
        if(nomeCategoria.trim() === "") {
            toast.error("O nome da categoria não pode estar vazio!");
            return;
        }

        try {
            await criarCategoria({ nome: nomeCategoria });
            toast.success("Categoria cadastrada com sucesso!");
            setNomeCategoria("");
            navigate("/gerenciar-categorias");
        } catch (error) {
            const mensagemErro = error.response?.data?.message || "Erro ao cadastrar categoria!";
            toast.error(mensagemErro);
        }
    };

  return (
    <article className="page-cadastro-categoria">
        <section className="cadastro-categoria-container">
            <h1>Cadastre uma categoria</h1>
            <form onSubmit={cadastrarCategoria}>

                <Input
                    type="text"
                    placeholder="Categoria" 
                    required
                    value={nomeCategoria}
                    onChange={(e) => setNomeCategoria(e.target.value)} 
                />

                <button type="submit" className="btn">Cadastrar</button>

                <Link to={"/gerenciar-categorias"} className="btn">Voltar</Link>
            </form>
        </section>

    </article>
  )
}

export default Categoria

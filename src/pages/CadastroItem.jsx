import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CadastroItem.css";
import "./media-queries/forms.css";
import Input from "../components/Input";
import Select from "../components/Select";
import TextArea from "../components/TextArea";

const CadastroItem = () => {

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [statusDisponibilidade, setStatusDisponibilidade] = useState("");
    const [preco, setPreco] = useState("");
    const [categoria, setCategoria] = useState("");
    const [fotos, setFotos] = useState([]);

    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/categorias")
            .then(response => response.json())
            .then(data => setCategorias(data))
            .catch(error => console.log("Erro ao carregar categorias", error));
    }, []);

    const handleDisponibilidade = (value) => {
        setStatusDisponibilidade(value);

        if(value === "DISPONIVEL_TROCA"){
            setPreco("0.00");
        }else{
            setPreco("");
        }
    }

    const cadastrarItem = (event) => {
        event.preventDefault();

        if(fotos.length === 0){
            alert("Adicione pelo menos uma foto!");
            return;
        }

        if(statusDisponibilidade === "DISPONIVEL_VENDA" && preco.trim() === ""){
            alert("Preço é obrigatório para venda!");
            return;
        };

        const novoItem = {
            nome, 
            descricao, 
            statusDisponibilidade,
            preco: statusDisponibilidade === "DISPONIVEL_VENDA" ? preco : 0, 
            categoria, 
            fotos,
        };

        console.log("Item cadastrado!");

        setNome("");
        setDescricao("");
        setStatusDisponibilidade("");
        setPreco("");
        setCategoria("");
        setFotos([]);
    };

    const handleFotos = (event) => {
        const arquivos = Array.from(event.target.files);
        setFotos(arquivos);
    };

    return (
        <article className="page-cadastro-item">
            <section className="cadastro-item-container">
                <h1>Cadastre o item</h1>
                <form onSubmit={cadastrarItem}>

                    <Input
                        type="text"
                        placeholder="Nome do item"
                        required
                        onChange={(e) => setNome(e.target.value)}
                    />
                        
                    <TextArea
                        placeholder="Descrição"
                        value={descricao}
                        required
                        onChange={(e) => setDescricao(e.target.value)}
                    />  
                    
                    <Select
                        required
                        placeholder="Selecione Disponibilidade"
                        onChange={(e) => handleDisponibilidade(e.target.value)}
                        options={[
                            {value : "DISPONIVEL_TROCA", label: "Disponível para troca"},
                            {value : "DISPONIVEL_VENDA", label: "Disponível para venda"}
                        ]}
                    />

                    <Input
                        type="number"
                        placeholder="Preço"
                        value={preco}
                        min={0}
                        required={statusDisponibilidade === "DISPONIVEL_VENDA"}
                        disabled={statusDisponibilidade === "DISPONIVEL_TROCA"}
                        onChange={(e) => setPreco(e.target.value)}
                    />
                    
                    <Select
                        value={categoria}
                        required
                        placeholder="Selecione uma categoria"
                        onChange={(e) => setCategoria(e.target.value)}
                        options={categorias.map(cat => ({
                            value: cat.id,
                            label: cat.nome
                        }))}
                    />
                    
                    <Input
                        type="file"
                        accept="image/*"
                        multiple
                        required
                        onChange={handleFotos}
                    />
                    
                    <button type="submit" className="btn">Cadastrar</button>

                    <Link to={"/catalogo"} className="btn">Catálogo</Link>

                </form>
            </section>

        </article>
    
  );
};

export default CadastroItem

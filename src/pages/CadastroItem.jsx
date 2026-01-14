import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CadastroItem.css";
import "./media-queries/forms.css";
import Input from "../components/Input";
import Select from "../components/Select";
import TextArea from "../components/TextArea";
import { toast } from "react-toastify";

import { criarItemMultipart } from "../services/itemService";
import { listarCategorias } from "../services/categoriaService";

const CadastroItem = () => {

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [statusDisponibilidade, setStatusDisponibilidade] = useState("");
    const [preco, setPreco] = useState("");
    const [idCategoria, setIdCategoria] = useState("");
    const [fotos, setFotos] = useState([]);

    const [categorias, setCategorias] = useState([]);

    const navigate = useNavigate();

    // carregar categorias
    useEffect(() => {
        listarCategorias()
            .then(res => setCategorias(res.data))
            .catch(() => toast.error("Erro ao carregar categorias!"));
    }, []);

    //verifica disponibilidade
    const handleDisponibilidade = (value) => {
        setStatusDisponibilidade(value);

        if(value === "DISPONIVEL_TROCA"){
            setPreco("0.00");
        }else{
            setPreco("");
        }
    }

    async function cadastrarItem(event)  {
        event.preventDefault();

        const usuario = JSON.parse(localStorage.getItem("usuario"));

        if(!usuario) {
            toast.error("Usuário não encontrado!")
            return;
        }

        if(fotos.length === 0){
            toast.error("Adicione pelo menos uma foto!");
            return;
        }

        if(statusDisponibilidade === "DISPONIVEL_VENDA" && preco.trim() === ""){
            toast.error("Preço é obrigatório para venda!");
            return;
        };

        const novoItem = {
            nome, 
            descricao, 
            statusDisponibilidade,
            preco: statusDisponibilidade === "DISPONIVEL_VENDA" ? preco : 0, 
            idCategoria: Number(idCategoria), 
        };

        const fd = new FormData();
        fd.append("item",
            new Blob([JSON.stringify(novoItem)], {
                type: "application/json"
            })
        );

        fotos.forEach(foto => {
            fd.append("fotos", foto);
        });

        try{
            await criarItemMultipart(usuario.id, fd);
            toast.success("Item cadastrado com sucesso! Aguardando aprovação.");

            setNome("");
            setDescricao("");
            setStatusDisponibilidade("");
            setPreco("");
            setIdCategoria("");
            setFotos([]);

            navigate("/catalogo");
        } catch (error){
            const mensagemErro = error.response?.data?.message || "Erro ao cadastrar item!";
            toast.error(mensagemErro);
        }
    };

    function handleFotos(event) {
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
                        value={nome}
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
                        value={statusDisponibilidade}
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
                        value={idCategoria}
                        required
                        placeholder="Selecione uma categoria"
                        onChange={(e) => setIdCategoria(e.target.value)}
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

                    <Link to={"/catalogo"} className="btn">Voltar</Link>

                </form>
            </section>

        </article>
    
  );
};

export default CadastroItem

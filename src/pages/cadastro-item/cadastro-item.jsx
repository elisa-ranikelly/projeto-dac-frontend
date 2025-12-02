import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./cadastro-item.css";
import "../media-queries/forms.css";

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

                    <div className="form-grid">
                        <div className="input">
                            <input type="text" placeholder="Nome do item" required onChange={(e) => setNome(e.target.value)}/>
                        </div>
                        <div className="input">
                            <textarea placeholder="Descrição" required onChange={(e) => setDescricao(e.target.value)}></textarea>
                        </div>
                    </div>

                    <div className="form-grid">
                        <div className="input">
                            <select required onChange={(e) => handleDisponibilidade(e.target.value)}>
                                <option>Selecione Disponibilidade</option>
                                <option value="DISPONIVEL_VENDA">Disponível para venda</option>
                                <option value="DISPONIVEL_TROCA">Disponível para troca</option>
                            </select>
                        </div>
                        <div className="input" id="preco">
                            <input type="number" placeholder="Preço" value={preco} min="0" required={statusDisponibilidade === "DISPONIVEL_VENDA"
                            }
                            disabled={statusDisponibilidade === "DISPONIVEL_TROCA"} onChange={(e) => setPreco(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-grid">
                        <div className="input">
                            <select value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
                                <option value="">Selecione uma categoria</option>
                                {categorias.map(cat => (
                                    <option key={cat.id} value={cat.id}>    {cat.nome}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="input">
                            <input type="file" accept="image/*" multiple onChange={handleFotos} />
                        </div>
                    </div>

                    <button type="submit">Cadastrar</button>

                    <Link to={"/catalogo"} className="btn-catalogo">Catálogo</Link>

                </form>
            </section>

        </article>
    
  );
};

export default CadastroItem

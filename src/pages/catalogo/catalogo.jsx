import React, { useEffect, useState } from "react";
import "./catalogo.css";
import Itens from "../../components/itens";
import logo from "../../assets/logo-negociaif-fundo-trasparente.png";
import { Link } from "react-router-dom";
import { FaShoppingBasket, FaUserCircle } from "react-icons/fa";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

export default function Catalogo() {
    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
    const [nomeBusca, setNomeBusca] = useState("");
    const [itens, setItens] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 8;

    async function buscarNome(){

        if(!categoriaSelecionada){
            alert("Selecione uma categoria para perquisar o nome do item!");
            return;
        }

        if (nomeBusca.trim() === "") {
            alert("Digite um nome para pesquisar.");
            return;
        }

        const itensFiltrados = itens.filter(item =>
            item.nome.toLowerCase().includes(nomeBusca.toLowerCase())
        );

        if (itensFiltrados.length === 0) {
            alert("Nenhum item encontrado com esse nome nessa categoria.");
            return;
        }

        setItens(itensFiltrados);
        setPaginaAtual(1);
    }

    useEffect(() => {
        fetch("https://localhost:8080/categorias")
            .then(res => res.json())
            .then(data => setCategorias(data))
            .catch(() => console.log("Erro ao carregar categorias"));
    }, []);

    useEffect(() => {
        if(!categoriaSelecionada) 
            return;

        fetch(`http://localhost:8080/itens/categoria/${categoriaSelecionada}`)
            .then(res => res.json())
            .then(data => setItens(data))
            .catch(() => console.log("Erro ao carregar itens"));
    }, [categoriaSelecionada]);

    const inicio = (paginaAtual - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    const itensPagina = itens.slice(inicio, fim);

    const totalPaginas = Math.ceil(itens.length / itensPorPagina);

    useEffect(() => {

        const itensAprovadosSimulados = [
            {
                id: 1,
                nome: "Kit de canetas",
                descricao: "Kit de canetas azuis novo com 15 unidades.",
                statusDisponibilidade: "DISPONIVEL_VENDA",
                preco: 15.0,
                telefone: "(83) 99999-9999",
                fotos: ""
            },
            {
                id: 2,
                nome: "Notebook Samsung",
                descricao: "Semi-novo, 8GB RAM",
                statusDisponibilidade: "DISPONIVEL_VENDA",
                preco: 2200,
                telefone: "(81) 88888-8888",
                fotos: ""
            }
        ];   

        setItens(itensAprovadosSimulados);
    }, []);

    return (
        <article className="itens-container">

          <nav className="menu">
                <div className="menu-left">
                    <img className="logo-menu" src={logo} alt="Logo" />
                </div>

                <div className="menu-center">

                    <div className="barra-pesquisa">
                        <input type="text" placeholder="Buscar item por nome" value={nomeBusca} onChange={(e) => setNomeBusca(e.target.value)}/>

                        <button onClick={buscarNome} className="btn-lupa">
                            <FaSearch className="icon-lupa" />
                        </button>
                    </div>

                    <div className="select-categorias">
                        <select value={categoriaSelecionada} onChange={(e) => {
                            setCategoriaSelecionada(e.target.value);
                            setPaginaAtual(1);
                        }}>
                            <option value="">Categorias</option>
                            {categorias.map(cat => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="menu-right">
                    <Link to="/cadastro-item" className="btn-cadastrar-item"> 
                        Criar item 
                        <FaShoppingBasket className="icon-cesta" />
                    </Link>

                    <Link to="/perfil-usuario" className="perfil-icon">
                        <FaUserCircle />
                    </Link>
                </div>
            </nav>

            <section className="itens">
                {itens.map((item) => (
                    <Itens key={item.id} item={item} />
                ))}
            </section>
            
            {itens.length > 0 && (
                <section className="paginacao">
                    <button
                        disabled={paginaAtual == 1}
                        onClick={() => setPaginaAtual(paginaAtual - 1)} >
                            <FaArrowCircleLeft/>
                    </button>

                    <span>{paginaAtual} / {totalPaginas}</span>

                    <button disabled={paginaAtual === totalPaginas} onClick={() => setPaginaAtual(paginaAtual + 1)}>
                        <FaArrowCircleRight/>
                    </button>
                </section>
            )}
        </article>
    );

}


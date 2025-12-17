import React, { useEffect, useState } from "react";
import "./Catalogo.css";
import Itens from "../components/ItemCard.jsx";
import logo from "../assets/letreiro-branco.png";
import { Link } from "react-router-dom";
import { FaShoppingBasket, FaUserCircle } from "react-icons/fa";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import "./media-queries/catalogo-resp.css";
import BarraPesquisa from "../components/BarraPesquisa.jsx";
import {listarCategorias} from "../services/categoriaService.js"
import { listarItensPorCategoria, buscarItemPorNomeECategoria } from "../services/ItemService.js";
import { toast } from "react-toastify";


export default function Catalogo() {
    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
    const [nomeBusca, setNomeBusca] = useState("");
    const [itens, setItens] = useState([]);

    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 8;

    const [openMenu, setOpenMenu] = useState(false);

    //buscar categorias
    useEffect(() => {
        listarCategorias()
            .then(res => setCategorias(res.data))
            .catch(() => toast.error("Erro ao carregar categorias!"));
    }, []);

    //buscar itens por categorias
    useEffect(() => {
        if(!categoriaSelecionada) {
            return;
        }
        listarItensPorCategoria(categoriaSelecionada)
            .then(res => setItens(res.data))
            .catch(() => toast.error("Erro ao carregar itens"));
    }, [categoriaSelecionada]);

    //buscar nome e categoria
    async function buscarNome(){

        if(!categoriaSelecionada){
            toast.error("Selecione uma categoria!");
            return;
        }

        if (nomeBusca.trim() === "") {
            toast.error("Digite um nome para pesquisar!");
            return
        }

        const itensFiltrados = itens.filter(item =>
            item.nome.toLowerCase().includes(nomeBusca.toLowerCase())
        );

        if (itensFiltrados.length === 0) {
            toast.error("Nenhum item encontrado com esse nome nessa categoria.");
            return;
        }

        try{
            const res = await buscarItemPorNomeECategoria(
                nomeBusca,
                categoriaSelecionada
            );
            setItens(itensFiltrados);
        }catch {
            toast.error("Nenhum item encontrado!");
        }

        setPaginaAtual(1);
    }

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
                statusDisponibilidade: "DISPONIVEL_TROCA",
                telefone: "(81) 88888-8888",
                fotos: ""
            },
            {
                id: 3,
                nome: "Notebook Samsung",
                descricao: "Semi-novo, 8GB RAM",
                statusDisponibilidade: "DISPONIVEL_TROCA",
                telefone: "(81) 88888-8888",
                fotos: ""
            },
            {
                id: 4,
                nome: "Kit de canetas",
                descricao: "Kit de canetas azuis novo com 15 unidades.",
                statusDisponibilidade: "DISPONIVEL_VENDA",
                preco: 15.0,
                telefone: "(83) 99999-9999",
                fotos: ""
            },
            {
                id: 5,
                nome: "Notebook Samsung",
                descricao: "Semi-novo, 8GB RAM",
                statusDisponibilidade: "DISPONIVEL_TROCA",
                telefone: "(81) 88888-8888",
                fotos: ""
            },
            {
                id: 6,
                nome: "Kit de canetas",
                descricao: "Kit de canetas azuis novo com 15 unidades.",
                statusDisponibilidade: "DISPONIVEL_VENDA",
                preco: 15.0,
                telefone: "(83) 99999-9999",
                fotos: ""
            },
            {
                id: 7,
                nome: "Notebook Samsung",
                descricao: "Semi-novo, 8GB RAM",
                statusDisponibilidade: "DISPONIVEL_TROCA",
                telefone: "(81) 88888-8888",
                fotos: ""
            },
            {
                id: 8,
                nome: "Notebook Samsung",
                descricao: "Semi-novo, 8GB RAM",
                statusDisponibilidade: "DISPONIVEL_TROCA",
                telefone: "(81) 88888-8888",
                fotos: ""
            },
            {
                id: 9,
                nome: "Kit de canetas",
                descricao: "Kit de canetas azuis novo com 15 unidades.",
                statusDisponibilidade: "DISPONIVEL_VENDA",
                preco: 15.0,
                telefone: "(83) 99999-9999",
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

                <div className="menu-right">
                    <Link to="/cadastro-item" className="btn-cadastrar-item"> 
                        Criar item 
                        <FaShoppingBasket className="icon-cesta" />
                    </Link>
                </div>

                <div className="perfil-container">
                    <button className="perfil-icon" onClick={() => setOpenMenu(!openMenu)}> <FaUserCircle />
                    </button>

                    {openMenu && (
                        <div className="perfil-dropdown">
                            <Link to="/perfil-usuario" className="dropdown-item">Perfil</Link>
                            <Link to="/" className="dropdown-item">Sair</Link>
                        </div>
                    )}
                </div>
            </nav>

            <BarraPesquisa
                nomeBusca={nomeBusca}
                setNomeBusca={setNomeBusca}
                categoriaSelecionada={categoriaSelecionada}
                setCategoriaSelecionada={setCategoriaSelecionada}
                categorias={categorias}
                onBuscar={buscarNome}
            />

            <Select
                value={categoriaSelecionada}
                onChange={e => setCategoriaSelecionada(e.target.value)}
                options={cate}
                
        
      
            />

            <section className="itens">
                {itensPagina.map((item) => (
                    <Itens key={item.id} item={item} />
                ))}
            </section>

            <footer>
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
            </footer>
        </article>
        
    );

}


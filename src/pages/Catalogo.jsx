import React, { useEffect, useState } from "react";
import "./Catalogo.css";
import Itens from "../components/ItemCard.jsx";
import "./media-queries/catalogo-resp.css";
import BarraPesquisa from "../components/BarraPesquisa.jsx";
import {listarCategorias} from "../services/categoriaService.js"
import { listarItensPorCategoria, buscarItemPorNomeECategoria } from "../services/itemService.js";
import { toast } from "react-toastify";
import NavBar from "../components/NavBar.jsx";
import Paginacao from "../components/Paginacao.jsx";


export default function Catalogo() {

    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
    const [nomeBusca, setNomeBusca] = useState("");
    const [itens, setItens] = useState([]);

    //paginação
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 8;
    const inicio = (paginaAtual - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    const itensPagina = itens.slice(inicio, fim);

    const totalPaginas = Math.ceil(itens.length / itensPorPagina);

    const usuario = JSON.parse(localStorage.getItem("usuario") || "null");
    const isAdmin = usuario?.roles?.includes("ADMIN");

    const linksNavbar = [
        !isAdmin && {nome: "Criar item", to: "/cadastro-item"},
        {nome: "Sair", to: "/"}
    ].filter(Boolean);

    //buscar categorias
    useEffect(() => {
        listarCategorias()
            .then(res => setCategorias(res.data))
            //.catch(() => toast.error("Erro ao carregar categorias!"));
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

            <NavBar 
                usuario={usuario}
                links={linksNavbar} />

            <BarraPesquisa
                nomeBusca={nomeBusca}
                setNomeBusca={setNomeBusca}
                categoriaSelecionada={categoriaSelecionada}
                setCategoriaSelecionada={setCategoriaSelecionada}
                categorias={categorias}
                onBuscar={buscarNome}
            />

            <section className="itens">
                {itensPagina.map((item) => (
                    <Itens key={item.id} item={item} />
                ))}
            </section>

            <Paginacao
                paginaAtual={paginaAtual}
                totalPaginas={totalPaginas}
                onPageChange={setPaginaAtual}
            />
        </article>       
    );

}


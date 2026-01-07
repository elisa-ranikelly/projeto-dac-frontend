import React, { use, useEffect, useState } from "react";
import "./Catalogo.css";
import Itens from "../components/ItemCard.jsx";
import "./media-queries/catalogo-resp.css";
import BarraPesquisa from "../components/BarraPesquisa.jsx";
import {listarCategorias} from "../services/categoriaService.js"
import { listarItensPorCategoria, buscarItemPorNomeECategoria, listarItensAprovados } from "../services/itemService.js";
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

    //verificar se é admin ou usuario comum
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
            .catch(() => toast.error("Erro ao carregar categorias!"));
    }, []);

    //buscar itens por categorias
    /*useEffect(() => {
        if(!categoriaSelecionada) {
            return;
        }
        listarItensPorCategoria(categoriaSelecionada)
            .then(res => setItens(res.data))
            .catch(() => toast.error("Erro ao carregar itens"));
    }, [categoriaSelecionada]);*/

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
        async function carregarItens() {
            try {
                if (!categoriaSelecionada) {
                    const res = await listarItensAprovados();
                    setItens(res.data);
                }else {
                    const res = await listarItensPorCategoria(categoriaSelecionada);
                    setItens(res.data);
                }
            } catch {
                const mensagemErro = error.response?.data?.message || "Erro ao verificar itens pendentes!";
                toast.error(mensagemErro);
            }
        }
        carregarItens();
    }, [categoriaSelecionada]);


    return (
        <article className="itens-container">

            <NavBar
                links={linksNavbar}
                usuario={usuario}/>

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


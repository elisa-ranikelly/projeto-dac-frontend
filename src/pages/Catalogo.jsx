import { useEffect, useState } from "react";
import "./Catalogo.css";
import Itens from "../components/ItemCard.jsx";
import "./media-queries/catalogo-resp.css";
import BarraPesquisa from "../components/BarraPesquisa.jsx";
import {listarCategorias} from "../services/categoriaService.js"
import { toast } from "react-toastify";
import NavBar from "../components/NavBar.jsx";
import Paginacao from "../components/Paginacao.jsx";
import { listarItensCatalogo, listarItensCatalogoPorCategoria, listarItensCatalogoPorNome, listarItensCatalogoPorNomeECategoria } from "../services/itemService.js";

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
    const authLocal = localStorage.getItem("auth");
    const authSession = sessionStorage.getItem("auth");

    const usuario = authLocal
        ? JSON.parse(authLocal)
        : authSession
        ? JSON.parse(authSession)
        : null;
        
    const isAdmin = usuario?.roles?.includes("ADMIN");
    const perfilRoute = isAdmin ? "/perfil-admin" : "/perfil-usuario";

    const linksNavbar = [
        !isAdmin && {nome: "Criar item", to: "/cadastro-item"},
        usuario && {nome: "Perfil", to: perfilRoute},
        {nome: "Sair", to: "/"}
    ].filter(Boolean);

    //buscar categorias
    useEffect(() => {
        listarCategorias()
            .then(res => setCategorias(res.data))
            .catch(() => toast.error("Erro ao carregar categorias!"));
    }, []);

    //buscar nome e categoria
    async function buscarNome(){

        if (nomeBusca.trim() === "") {
            toast.error("Digite um nome para pesquisar!");
            return;
        }

        try {
            let res;

            if(categoriaSelecionada){
                res = await listarItensCatalogoPorNomeECategoria(categoriaSelecionada, nomeBusca);
            }else{
                res = await listarItensCatalogoPorNome(nomeBusca);
            }

            if(res.data.length === 0){
                toast.error("Nenhum item encontrado com esse nome nessa categoria!");
                return;
            }

            setItens(res.data);
            setPaginaAtual(1);
            setNomeBusca("");
        } catch (error) {
            const mensagemErro = error.response?.data?.message || "Erro ao realizar busca do item!";
            toast.error(mensagemErro);
        }
    }

    useEffect(() => {
        async function carregarItens() {
            try {
                let res;
                if (!categoriaSelecionada) {
                    res = await listarItensCatalogo();
                }else {
                    res = await listarItensCatalogoPorCategoria(categoriaSelecionada);
                }
                setItens(res.data);
                setPaginaAtual(1);
            } catch (error){
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
            {itens.length === 0 && (
                <p className="mensagem-vazia">Não há itens disponíveis no momento!</p>
            )}
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


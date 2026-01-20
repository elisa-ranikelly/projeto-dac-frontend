import { toast } from "react-toastify";
import NavBar from "../components/NavBar";
import { listarCategorias } from "../services/categoriaService";
import { useEffect, useState } from "react";
import CategoriaCard from "../components/CategoriasCard";

function GerenciarCategorias(){

    const [categorias, setCategorias] = useState([]);

    async function carregarCategorias(){
        try{
            const response = await listarCategorias();
            setCategorias(response.data);
        }catch (error){
            const mensagemErro = error.response?.data?.mensagem || "Erro ao carregar categorias";
            toast.error(mensagemErro);
        }
    }

    useEffect(() => {
        carregarCategorias();
    },[]);

    return(
        <article>
            <NavBar 
                links={[
                    {nome: "Criar categoria", to:"/categoria"},
                    {nome: "Voltar", to:"/perfil-admin"}
            ]} />

            <section className="categorias-container">
                <h1>Categorias Cadastradas</h1>

                {categorias.length === 0 ? (
                    <p className="mensagem-vazia">Nenhuma categoria cadastrada.</p>
                ) : (
                    categorias.map(categoria => (
                        <CategoriaCard
                            key={categoria.id}
                            categoria={categoria}
                            recarregarCategorias={carregarCategorias}
                        />
                    ))
                )}
            </section>
        </article>
    )
}

export default GerenciarCategorias;
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { atualizarCategoria, buscarCategoriaPorId } from "../services/categoriaService";
import { toast } from "react-toastify";
import Input from "../components/Input";
import "./EditarCategoria.css";
import LinkButton from "../components/LinkBtn";

const EditarCategoria = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [nome, setNome] = useState("");

    useEffect(() => {
        async function carregarCategorias(){
            const response = await buscarCategoriaPorId(id);
            setNome(response.data.nome);
        }
        carregarCategorias();
    }, [id]);

    async function handleSubmit(event) {
        event.preventDefault();

        try{
            await atualizarCategoria(id, {nome});
            toast.success("Categoria atualizada com sucesso!");
            navigate("/gerenciar-categorias");
        }catch (error){
            const mensagemErro = error.response?.data?.mensagem || "Erro ao atualizar categoria!";
            toast.error(mensagemErro);
        }
    }

    return (
        <section className="editar-categoria-container">
            <h1>Editar categoria</h1>
            
            <form onSubmit={handleSubmit} className="form-editar-categoria">
                <Input
                    type="text"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    required
                />

                <button type="submit" className="btn">Salvar Alterações</button>
                <LinkButton to="/gerenciar-categorias" text="Cancelar" />
            </form>
        </section>
    )
}

export default EditarCategoria;
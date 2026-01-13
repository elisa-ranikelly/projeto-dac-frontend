import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { buscarItemPorId, atualizarItemMultipart } from "../services/itemService";
import { listarCategorias } from "../services/categoriaService";
import { toast } from "react-toastify";
import Input from "../components/Input";
import Select from "../components/Select";
import TextArea from "../components/TextArea";
import FotoItem from "../components/ItemFoto"
import LinkButton from "../components/LinkBtn";
import "./EditarItem.css";
import { FaTrash  } from "react-icons/fa";

const EditarItem = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [item, setItem] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [novasFotos, setNovasFotos] = useState([]);
    const [idsFotosRemovidas, setIdsFotosRemovidas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function carregarDados() {

            try{
                const itemResponse = await buscarItemPorId(id);
                const categoriasResponse = await listarCategorias();
                const itemData = itemResponse.data;

                setItem({
                    ...itemData,
                    idCategoria: itemData.idCategoria ?? itemData.categoriaId
                });

                setCategorias(categoriasResponse.data);
            } catch (error) {
                const mensagemErro = error.response?.data?.mensagem || "Erro ao carregar dados do item.";
                toast.error(mensagemErro);
            } finally {
                setLoading(false);
            }
        }

        carregarDados();
    }, [id]);


    async function handleSubmit(event){
        event.preventDefault();

        const totalfotos = item.fotos.length + novasFotos.length;

        if(totalfotos === 0){
            toast.error("Adicione pelo menos uma foto!");
            return;
        }

        if(item.statusDisponibilidade === "DISPONIVEL_VENDA" && (item.preco === null || Number(item.preco) <= 0)){
            toast.error("Preço é obrigatório para venda!");
            return;
        };

        const formData = new FormData();

        const itemAtualizado = {
            nome: item.nome,
            descricao: item.descricao,
            statusDisponibilidade: item.statusDisponibilidade,
            idCategoria: item.idCategoria
        };

        if(item.statusDisponibilidade === "DISPONIVEL_VENDA"){
            itemAtualizado.preco = Number(item.preco);
        }

        formData.append(
            "item",
            new Blob([JSON.stringify(itemAtualizado)], { type: "application/json" })
        );

        /*formData.append(
            "item",
            new Blob([JSON.stringify({
                nome: item.nome,
                descricao: item.descricao,
                statusDisponibilidade: item.statusDisponibilidade,
                preco: item.statusDisponibilidade === "DISPONIVEL_TROCA" ? null : item.preco,
                idCategoria: item.idCategoria
            })], { type: "application/json" })
        );*/

        novasFotos.forEach(foto => {
            formData.append("novasFotos", foto);
        });

        if(idsFotosRemovidas.length > 0){
            formData.append(
                "idsFotosRemovidas",
                new Blob([JSON.stringify(idsFotosRemovidas)], { type: "application/json" })
            );
        }

        try{
            await atualizarItemMultipart(id, formData);
            toast.success("Item atualizado com sucesso!");
            navigate("/meus-itens");
        } catch (error){
            const mensagemErro = error.response?.data?.mensagem || "Erro ao atualizar item.";
            toast.error(mensagemErro);
        }
    }

    function removerFotoExistente(idFoto){

        const confirmar = window.confirm("Tem certeza que deseja remover esta foto?");

        if(!confirmar) return;

        setIdsFotosRemovidas(prevIds => [...prevIds, idFoto]);

        setItem(prevItem => ({
            ...prevItem,
            fotos: prevItem.fotos.filter(foto => foto.id !== idFoto)
        }));
    }

    if(loading || !item){
        return <p>Carregando...</p>;
    }


    return (
        <section className="editar-item-container">
            <h1>Editar Item</h1>

            <form onSubmit={handleSubmit} className="form-editar-item">

                {item.fotos.length > 0 && item.fotos.map(foto => (
                    <div key={foto.id} className="foto-item">
                        <FotoItem src={`http://localhost:8080${foto.url}`} alt="Foto do item" />

                        <button type="button" className="btn btn-remover" onClick={() => removerFotoExistente(foto.id)}> <FaTrash className="icone"/> Remover foto
                        </button>
                    </div>
                ))}

                <Input
                    type="text"
                    placeholder="Nome do Item"
                    value={item.nome}
                    required
                    onChange={e => setItem({...item, nome: e.target.value})} 
                />

                <TextArea
                    placeholder="Descrição"
                    value={item.descricao}
                    required
                    onChange={e => setItem({...item, descricao: e.target.value})} 
                />

                <Select
                    required
                    placeholder="Selecione Disponibilidade"
                    value={item.statusDisponibilidade}
                    onChange={e => setItem({...item, statusDisponibilidade: e.target.value})}
                    options={[
                            {value : "DISPONIVEL_TROCA", label: "Disponível para troca"},
                            {value : "DISPONIVEL_VENDA", label: "Disponível para venda"}
                    ]}
                />

                <Input
                    type="number"
                    placeholder="Preço"
                    value={item.statusDisponibilidade === "DISPONIVEL_TROCA" ? "" : item.preco ?? ""}
                    min={0}
                    required={item.statusDisponibilidade === "DISPONIVEL_VENDA"}
                    disabled={item.statusDisponibilidade === "DISPONIVEL_TROCA"}
                    onChange={e => setItem({...item, preco: e.target.value})}
                />
                
                {item.statusAprovacao !== "APROVADO" && (
                    <Select
                        value={item.idCategoria}
                        placeholder="Selecione uma categoria"
                        disabled={item.statusAprovacao === "APROVADO"}
                        onChange={e => setItem({...item, idCategoria: e.target.value})}
                        options={categorias.map(cat => ({
                                value: cat.id,
                                label: cat.nome
                        }))}
                    />
                )}
                
                <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={e => setNovasFotos(Array.from(e.target.files))}
                />

                <button type="submit" className="btn">Salvar Alterações</button>

                <LinkButton to="/meus-itens" text="Cancelar" />

            </form>

        </section>

    )

}

export default EditarItem;
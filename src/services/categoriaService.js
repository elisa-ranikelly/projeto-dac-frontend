import api from "./api"

export function buscarCategoriaPorId(id){
    return api.get(`/api/negocia-if/categorias/buscar-categoria/${id}`);
}

export function listarCategorias(){
    return api.get("/api/negocia-if/categorias/listar-categorias");
}

export function criarCategoria(data){
    return api.post("/api/negocia-if/categorias/criar-categoria", data);
}

export function atualizarCategoria(id, categoriaAtualizada){
    return api.put(`/api/negocia-if/categorias/atualizar-categoria/${id}`, categoriaAtualizada);
}

export function excluirCategoria(id){
    return api.delete(`/api/negocia-if/categorias/excluir-categoria/${id}`);
}
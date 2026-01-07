import api from "./api"

export function listarItensPorCategoria(idCategoria){
    return api.get(`/api/negocia-if/itens/listar-item-categoria/${idCategoria}`);
}

export function buscarItemPorNomeECategoria(nome, idCategoria) {
    return api.get(`/api/negocia-if/itens/buscar-item-por-nome/${idCategoria}`, {
        params: {nome}
    })
}

export function criarItemMultipart(idUsuario, formData){
    return api.post(`/api/negocia-if/itens/criar-item/${idUsuario}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}

export function listarItensPendentes(){
    return api.get(`/api/negocia-if/itens/listar-itens-pendentes`);
}

export function listarItensAprovados(){
    return api.get(`/api/negocia-if/itens/listar-itens-aprovados`);
}

export function aprovarItem(id){
    return api.put(`/api/negocia-if/itens/aprovar-item/${id}`);
}

export function reprovarItem(id, data){
    return api.put(`/api/negocia-if/itens/reprovar-item/${id}`, data);
}
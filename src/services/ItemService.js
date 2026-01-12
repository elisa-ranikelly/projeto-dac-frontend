import api from "./api"

export function buscarItemPorId(id){
    return api.get(`/api/negocia-if/itens/buscar-item/${id}`);
}

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

export function atualizarItemMultipart(idItem, formData){
    return api.put(`/api/negocia-if/itens/atualizar-item/${idItem}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}

export function listarMeusItens(idUsuario){
    return api.get(`/api/negocia-if/itens/listar-meus-itens/${idUsuario}`);
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

export function excluirItem(id){
    return api.delete(`/api/negocia-if/itens/excluir-item/${id}`);
}

export function marcarItemComoVendido(id){
    return api.put(`/api/negocia-if/itens/marcar-como-vendido/${id}`);
}

export function marcarItemComoTrocado(id){
    return api.put(`/api/negocia-if/itens/marcar-como-trocado/${id}`);
}
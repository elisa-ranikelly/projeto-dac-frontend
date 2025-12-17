import api from "./api"

export function listarItensPorCategoria(idCategoria){
    return api.get(`/api/negocia-if/itens/listar-item-categoria/${idCategoria}`);
}

export function buscarItemPorNomeECategoria(nome, idCategoria) {
    return api.get(`/api/negocia-if/itens/buscar-item-por-nome/${idCategoria}`, {
        params: {nome}
    })
}
       
import api from "./api"

export function listarCategorias(){
    return api.get("/api/negocia-if/categorias/listar-categorias");
}
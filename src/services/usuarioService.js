import api from "./api";

export function buscarUsuarioPorId(id){
    return api.get(`/api/negocia-if/usuarios/buscar-usuario/${id}`);
}

export function listarUsuarios() {
    return api.get(`/api/negocia-if/usuarios/listar-usuarios`);
}

export function criarUsuario(payload) {
    return api.post("/api/negocia-if/usuarios/criar-usuario", payload);
}

export function atualizarUsuario(id, usuarioAtualizado) {
    return api.put(
        `/api/negocia-if/usuarios/atualizar-usuario/${id}`,
        usuarioAtualizado
    );
}

export function excluirUsuario(id) {
    return api.delete(`/api/negocia-if/usuarios/excluir-usuario/${id}`);
}
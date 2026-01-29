import api from "./api";

export function login(email, senha){
    return api.post("/api/negocia-if/auth/login", {
        email, senha
    });
}

export function logout(){
    localStorage.removeItem("auth");
    sessionStorage.removeItem("auth");
}
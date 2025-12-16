import { useEffect, useState } from "react";
import UsuarioForm from "../components/UsuarioForm";
import AdminForm from "../components/AdminForm"
import api from "../services/api"
import { toast } from "react-toastify";


const CadastroUsuario = () => {
    
    const [usuario, setUsuario] = useState({
        nome: "",
        email: "",
        senha: "",
        telefone: "",
    });

    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [isPrimeiroUsuario, setIsPrimeiroUsuario] = useState(false);

    useEffect(() => {
        api.get("/api/negocia-if/usuarios/listar-usuarios")
        .then(resp => {
            if (resp.data.length === 0) {
                setIsPrimeiroUsuario(true);
            }
        })
        .catch(() => {
            toast.error("Erro ao verificar usuários existentes!");
        })
    }, []);

    const cadastrar = async (event) => {
        event.preventDefault();

        if(usuario.senha !== confirmarSenha){
             toast.error("As senhas precisam ser iguais!")
             return
        }

        try{
            await api.post("/api/negocia-if/usuarios/criar-usuario", usuario)

            toast.success("Cadastro realizado com sucesso!")

            setUsuario({
                nome: "",
                email: "",
                senha: "",
                telefone: "",
            });
            setConfirmarSenha("");
        } catch(error){
            const mensagemErro = error.response?.data?.message || "Erro ao cadastrar usuário!";
            toast.error(mensagemErro);
            console.error(error)
        }

         
    }

    return (
            <div>
                {isPrimeiroUsuario ? (
                <AdminForm
                    usuario={usuario}
                    setUsuario={setUsuario}
                    confirmarSenha={confirmarSenha}
                    setConfirmarSenha={setConfirmarSenha}
                    onSubmit={cadastrar} />
                ) : (
                <UsuarioForm
                    usuario={usuario}
                    setUsuario={setUsuario}
                    confirmarSenha={confirmarSenha}
                    setConfirmarSenha={setConfirmarSenha}
                    onSubmit={cadastrar}
                />
                )}
            </div>
        
    )
}

export default CadastroUsuario
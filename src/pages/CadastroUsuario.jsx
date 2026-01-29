import { useEffect, useState } from "react";
import UsuarioForm from "../components/UsuarioForm";
import AdminForm from "../components/AdminForm"
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import {listarUsuarios, criarUsuario} from "../services/usuarioService";

const CadastroUsuario = () => {
    
    const [usuario, setUsuario] = useState({
        nome: "",
        email: "",
        senha: "",
        telefone: "",
    });
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const [searchParams] = useSearchParams();
    const tipoCadastro = searchParams.get("tipo");

    const [isPrimeiroUsuario, setIsPrimeiroUsuario] = useState(false);

    const authLocal = localStorage.getItem("auth");
    const authSession = sessionStorage.getItem("auth");

    const usuarioLogado = authLocal
        ? JSON.parse(authLocal)
        : authSession
        ? JSON.parse(authSession)
        : null;

    const isAdminLogado = usuarioLogado?.roles?.includes("ADMIN");
    const isCadastroAdmin = tipoCadastro === "admin";

    const voltarPara = isPrimeiroUsuario ? "/" : "/perfil-admin"

    useEffect(() => {
        listarUsuarios().then(resp => {
            if (resp.data.length === 0) {
                setIsPrimeiroUsuario(true);
            }
        })
        .catch((error) => {
            if(error.response?.status !== 403){
                toast.error("Erro ao verificar usuários existentes!");
            }
        })
    }, []);

    const cadastrar = async (event) => {
        event.preventDefault();

        if(usuario.senha !== confirmarSenha){
             toast.error("As senhas precisam ser iguais!")
             return
        }

        const tipoUsuario = isPrimeiroUsuario || (isAdminLogado && isCadastroAdmin) ? "ADMIN" : "USER";

        const payload = {
            nome: usuario.nome,
            email: usuario.email,
            senha: usuario.senha,
            tipoUsuario
        };

        if(tipoUsuario === "USER") {
            if(!usuario.telefone || usuario.telefone.trim() === ""){
                toast.error("Telefone é obrigatório para usuários comuns!");
                return;
            }
            payload.telefone = usuario.telefone;
        }

        try{
            await criarUsuario(payload);
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
                {(isPrimeiroUsuario || (isAdminLogado && isCadastroAdmin)) ? (
                <AdminForm
                    usuario={usuario}
                    setUsuario={setUsuario}
                    confirmarSenha={confirmarSenha}
                    setConfirmarSenha={setConfirmarSenha}
                    onSubmit={cadastrar}
                    voltarPara={voltarPara}
                    />
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

export default CadastroUsuario;
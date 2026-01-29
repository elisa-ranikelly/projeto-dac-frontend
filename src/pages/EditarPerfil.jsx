import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { atualizarUsuario, buscarUsuarioLogado, buscarUsuarioPorId } from "../services/usuarioService";
import { toast } from "react-toastify";
import Input from "../components/Input";
import LinkButton from "../components/LinkBtn";
import "./EditarPerfil.css"

function EditarPerfil(){

    const {id} = useParams();
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState({
        nome: "",
        email: "",
        senha: "",
        telefone: ""
    });

    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [roles, setRoles] = useState([]);

    const ehAdmin = roles.includes("ADMIN")

    useEffect(() => {
        async function carregarPerfil() {
            try{
                const response = await buscarUsuarioLogado();
                setUsuario({
                    nome: response.data.nome,
                    email: response.data.email,
                    senha: "",
                    telefone: response.data.telefone || ""
                });
                setRoles(response.data.roles);
            }catch (error){
                toast.error("Erro ao carregar dados do usuário!");
            }
        }
        carregarPerfil();
    }, []);

    function handleChange(e){
        const {name, value} = e.target;
        setUsuario(prev => ({... prev, [name]: value}));
    }

    async function handleSubmit(event){
        event.preventDefault();

        if(usuario.senha !== confirmarSenha){
            toast.error("As senhas não coincidem!");
            return;
        }

        const usuarioParaAtualizar = { ...usuario };

        if (!usuario.senha) {
            delete usuarioParaAtualizar.senha;
        }

        if (ehAdmin) {
            delete usuarioParaAtualizar.telefone;
        }

        try{
            const response = await atualizarUsuario(id, usuarioParaAtualizar);
            toast.success("Usuário atualizado com sucesso!");

            if(response.data.token){
                localStorage.setItem(
                    "auth", 
                    JSON.stringify({ token: response.data.token })
                );
            }

            navigate(ehAdmin? "/perfil-admin" : "/perfil-usuario");
        }catch (error){
            const mensagemErro = error.response?.data?.message || "Erro ao atualizar perfil.";
            toast.error(mensagemErro);
        }
    }

    return(
        <section className="editar-perfil-container">
            <h1>Editar Perfil</h1>

            <form onSubmit={handleSubmit} className="editar-perfil-form">
                
                <Input
                    type="text"
                    name="nome"
                    placeholder="Nome"
                    value={usuario.nome}
                    onChange={handleChange}
                />

                <Input
                    type="email"
                    name="email"
                    placeholder="E-mail acadêmico"
                    value={usuario.email}
                    onChange={handleChange}
                />

                {!ehAdmin && (
                    <Input
                    type="text"
                    name="telefone"
                    placeholder="Telefone"
                    value={usuario.telefone}
                    onChange={handleChange}
                />)}

                <Input
                    type="password"
                    name="senha"
                    placeholder="Nova senha (opcional)"
                    value={usuario.senha}
                    onChange={handleChange}
                />

                <Input
                    type="password"
                    placeholder="Confirmar nova senha"
                    value={confirmarSenha}
                    onChange={e => setConfirmarSenha(e.target.value)}
                />

                <button type="submit" className="btn">Salvar Alterações</button>

                <LinkButton to={ehAdmin ? "/perfil-admin" : "/perfil-usuario"} text="Cancelar" />
                
            </form>
            
        </section>
    )
}

export default EditarPerfil;
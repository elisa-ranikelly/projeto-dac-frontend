import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Categoria from "./pages/Categoria";
import CadastroItem from "./pages/CadastroItem";
import Catalogo from "./pages/Catalogo";
import CadastroUsuario from "./pages/CadastroUsuario";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Inicio from "./pages/Inicio"
import PerfilAdmin from "./pages/PerfilAdmin"
import PerfilUsuario from "./pages/PerfilUsuario"
import ItensPendentes from "./pages/ItensPendentes";
import MeusItens from "./pages/MeusItens";
import EditarItem from "./pages/EditarItem";
import GerenciarCategorias from "./pages/GerenciarCategorias";
import EditarCategoria from "./pages/EditarCategoria";
import EditarPerfil from "./pages/EditarPerfil";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<CadastroUsuario />} />
          
          <Route path="/categoria" element={<PrivateRoute><Categoria /></PrivateRoute>} />
          <Route path="/catalogo" element={<PrivateRoute><Catalogo /></PrivateRoute>} />
          <Route path="/cadastro-item" element={<PrivateRoute><CadastroItem /></PrivateRoute>}/>
          <Route path="/perfil-usuario" element={<PrivateRoute><PerfilUsuario /></PrivateRoute>}/>
          <Route path="/perfil-admin" element={<PrivateRoute><PerfilAdmin /></PrivateRoute>}/>
          <Route path="/itens-pendentes" element={<PrivateRoute><ItensPendentes /></PrivateRoute>}/>
          <Route path="/meus-itens" element={<PrivateRoute><MeusItens /></PrivateRoute>}/>
          <Route path="/editar-item/:id" element={<PrivateRoute><EditarItem /></PrivateRoute>} />
          <Route path="/gerenciar-categorias" element={<PrivateRoute><GerenciarCategorias /></PrivateRoute>}/>
          <Route path="/editar-categoria/:id" element={<PrivateRoute><EditarCategoria /></PrivateRoute>}/>
          <Route path="/editar-perfil/:id" element={<PrivateRoute><EditarPerfil /></PrivateRoute>}/>
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
      />
    </BrowserRouter>
  );
}

export default App;

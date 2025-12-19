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
import AdminForm from "./components/AdminForm";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<CadastroUsuario />} />
          <Route path="/categoria" element={<Categoria />} />
          <Route path="/cadastro-item" element={<CadastroItem/>} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/perfil-usuario" element={<PerfilUsuario/>} />
          <Route path="/perfil-admin" element={<PerfilAdmin/>} />
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

export default App

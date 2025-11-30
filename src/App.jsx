import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
import Cadastro from "./pages/cadastro-usuario/Cadastro";
import Categoria from "./pages/categoria/categoria";
import CadastroItem from "./pages/cadastro-item/cadastro-item";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/categoria" element={<Categoria />} />
          <Route path="/cadastro-item" element={<CadastroItem/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App

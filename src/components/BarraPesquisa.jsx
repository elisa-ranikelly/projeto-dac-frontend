import Input from "./Input"
import Select from "./Select"
import "./BarraPesquisa.css"
import { FaSearch } from "react-icons/fa"

const BarraPesquisa = ({nomeBusca, set}) => {
    

    return(
        <div className="barra-pesquisa">
            <Input
                type="text"
                placeholder="Buscar item"
                value={nomeBusca}
                onChange={(e) => setNomeBusca(e.target.value)} 
            />

            <Select
                value={categoriaSelecionada}
                onChange={(e) => setCategoriaSelecionada(e.target.value)}
                options={categorias}
                placeholder="Categorias"
            />

            <button onClick={handleBuscar} className="btn-lupa">
                icon={FaSearch}
            </button>
        </div>
    )
}

export default BarraPesquisa;
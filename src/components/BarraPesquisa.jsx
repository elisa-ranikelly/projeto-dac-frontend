import Input from "./Input"
import Select from "./Select"
import "./BarraPesquisa.css"
import { FaSearch } from "react-icons/fa"

const BarraPesquisa = ({nomeBusca, setNomeBusca, categoriaSelecionada, setCategoriaSelecionada, categorias, onBuscar}) => {
    

    return(
        <div className="barra-pesquisa">
            <div className="campo-busca">
                <Input
                    type="text"
                    placeholder="Buscar item"
                    value={nomeBusca}
                    onChange={(e) => setNomeBusca(e.target.value)}
                />
                <button onClick={onBuscar} className="btn-lupa">
                    <FaSearch/>
                </button>
            </div>

            <div className="select-catalogo">
                <Select
                    value={categoriaSelecionada}
                    onChange={(e) => setCategoriaSelecionada(e.target.value)}
                    options={categorias.map(cat => ({
                        value: cat.id,
                        label: cat.nome
                    }))}
                    placeholder="Categorias"
                />
            </div>
         </div>
    )
}

export default BarraPesquisa;
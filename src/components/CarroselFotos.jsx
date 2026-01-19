import "./CarroselFotos.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";


function CarroselFotos({ total, indexAtual, onChange }) {

    function anterior(){
        if(indexAtual > 0) {
            onChange(indexAtual - 1);
        }
    }

    function proximo() {
        if(indexAtual < total - 1){
            onChange(indexAtual + 1);
        }
    }

    return (
        <div className="carrossel-custom">
            <button onClick={anterior} disabled={indexAtual === 0}>
                <FiChevronLeft size={22} />
            </button>

            <span className="contador">
                {indexAtual + 1} / {total}
            </span>

            <button onClick={proximo} disabled={indexAtual === total - 1}>
                <FiChevronRight size={22} />
            </button>
        </div>
    );
}

export default CarroselFotos;


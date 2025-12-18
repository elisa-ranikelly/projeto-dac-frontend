import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import "./Paginacao.css";

function Paginacao({paginaAtual, totalPaginas, onPageChange}) {
    if(totalPaginas <= 1){
        return null;
    }

    return(
        <footer>
            <section className="paginacao">
                <button
                    disabled={paginaAtual == 1}
                    onClick={() => onPageChange(paginaAtual - 1)} >
                        <FaArrowCircleLeft/>
                </button>
                <span>{paginaAtual} / {totalPaginas}</span>
                <button disabled={paginaAtual === totalPaginas} onClick={() => onPageChange(paginaAtual + 1)}>
                    <FaArrowCircleRight/>
                </button>
            </section>
        </footer>
    );
}

export default Paginacao;
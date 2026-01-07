import "./ItemFoto.css";

function ItemFoto({ src, alt }) {

    return (
        <div className="item-foto-container">
            <img src={src} alt={alt || "Foto do item"} /> 
        </div>
    );
}

export default ItemFoto;
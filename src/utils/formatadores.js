export function formatarPreco(item) {

    if (item.statusDisponibilidade === "DISPONIVEL_TROCA") {
        return "Troca";
    }

    if (item.statusDisponibilidade === "DISPONIVEL_VENDA" && item.preco != null) {
        return "R$ " + Number(item.preco).toFixed(2).replace(".", ",");
    }

    return "—";
}

export function formatarDisponibilidade(status) {
    switch(status) {
        case "DISPONIVEL_VENDA":
            return "Disponível para Venda";
        case "DISPONIVEL_TROCA":
            return "Disponível para Troca";
        case "VENDIDO":
            return "Vendido";
        case "TROCADO":
            return "Trocado";
        default:
            return status;
    }
}

export function formatarAprovacao(status) {
    switch(status) {
        case "PENDENTE":
            return "Pendente";
        case "APROVADO":
            return "Aprovado";
        case "REPROVADO":
            return "Reprovado";
        default:
            return status;
    }
}
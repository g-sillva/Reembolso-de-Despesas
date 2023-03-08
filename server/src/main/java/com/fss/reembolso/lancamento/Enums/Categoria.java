package com.fss.reembolso.lancamento.Enums;

public enum Categoria {
    CATEGORIA,
    OUTRO,
    ALIMENTACAO,
    TRANSPORTE_GASOLINA,
    HOSPEDAGEM,
    SOFTWARE,
    TREINAMENTO;

    public static Categoria findByName(String name) {
        Categoria result = null;
        for (Categoria c : values()) {
            if (c.name().equalsIgnoreCase(name)) {
                result = c;
                break;
            }
        }
        return result;
    }
}

package com.fss.reembolso.lancamento.Enums;

    public enum Status {
    EM_RASCUNHO,
    ENVIADO,
        ANALISE,
    NEGADO,
    CREDITADO;

    public static Status findByName(String name) {
        Status result = null;
        for (Status s : values()) {
            if (s.name().equalsIgnoreCase(name)) {
                result = s;
                break;
            }
        }
        return result;
    }
}

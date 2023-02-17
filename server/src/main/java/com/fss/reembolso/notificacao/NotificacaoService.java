package com.fss.reembolso.notificacao;

import org.springframework.http.ResponseEntity;

import java.util.List;

public interface NotificacaoService {

    List<Notificacao> getNotificacoes(String titulo, String ano, String mes, String msg, String usuario);
    Notificacao getNotificacaoPorId(String id);
    Notificacao visualizarNotificacao(String id);
    ResponseEntity<?> adicionarNotificacao(Notificacao notificacao);
    boolean deletarNotificacao(String id);
}

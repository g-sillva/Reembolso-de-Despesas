package com.fss.reembolso.usuario.DTOs;

import com.fss.reembolso.lancamento.Lancamento;
import com.fss.reembolso.notificacao.Notificacao;
import com.fss.reembolso.usuario.Usuario;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
public class UsuarioRetornoDTO {

    private String id;
    private String nome;
    private String email;
    private LocalDate dataCadastro;
    private String telefone;
    private List<Notificacao> notificacaos;
    private boolean ativo;

    public UsuarioRetornoDTO(Usuario u) {
        this.id = u.getId();
        this.nome = u.getNome();
        this.email = u.getEmail();
        this.dataCadastro = u.getDataCadastro();
        this.telefone = u.getTelefone();
        this.notificacaos = u.getNotificacaos();
    }
}

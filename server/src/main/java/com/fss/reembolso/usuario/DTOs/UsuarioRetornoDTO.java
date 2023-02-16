package com.fss.reembolso.usuario.DTOs;

import com.fss.reembolso.lancamento.Lancamento;
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
    private List<Lancamento> lancamentos;
    private boolean ativo;

    public UsuarioRetornoDTO(String nome, String email, LocalDate dataCadastro, String telefone, List<Lancamento> lancamentos) {
        this.nome = nome;
        this.email = email;
        this.dataCadastro = dataCadastro;
        this.telefone = telefone;
        this.lancamentos = lancamentos;
    }

    public UsuarioRetornoDTO(Usuario u) {
        this.id = u.getId();
        this.nome = u.getNome();
        this.email = u.getEmail();
        this.dataCadastro = u.getDataCadastro();
        this.telefone = u.getTelefone();
        this.lancamentos = u.getLancamentos();
    }
}

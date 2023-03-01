package com.fss.reembolso.usuario.DTOs;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioRegistroDTO {
    private String nome;
    private String email;
    private String telefone;
    private String senha;
}

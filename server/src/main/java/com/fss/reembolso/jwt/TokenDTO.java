package com.fss.reembolso.jwt;

import com.fss.reembolso.usuario.DTOs.UsuarioRetornoDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TokenDTO {

    private String token;
    private UsuarioRetornoDTO usuario;
}

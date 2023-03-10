package com.fss.reembolso.jwt;

import com.fss.reembolso.usuario.Usuario;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TokenDTO {

    private String token;
    private Usuario usuario;
}

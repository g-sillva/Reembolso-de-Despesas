package com.fss.reembolso.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.fss.reembolso.usuario.Usuario;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    private String secret = "secret";

    public String gerarToken(Usuario usuario) {
        Algorithm algorithm = Algorithm.HMAC256(secret);
        return JWT.create()
                .withIssuer("API reembolso")
                .withSubject(usuario.getEmail())
                .withExpiresAt(dataExpiracao())
                .sign(algorithm);
    }

    public String getSubject(String tokenJWT) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("API reembolso")
                    .build()
                    .verify(tokenJWT)
                    .getSubject();
        } catch (JWTVerificationException e) {
            throw new RuntimeException("Token JWT inválido ou expirado");
        }
    }

    private Instant dataExpiracao() {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }
}

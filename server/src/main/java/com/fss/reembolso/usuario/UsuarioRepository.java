package com.fss.reembolso.usuario;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends MongoRepository<Usuario, String> {

    Usuario findByEmail(String email);
    Usuario findByCodigoVerificacao(String codigo);
}

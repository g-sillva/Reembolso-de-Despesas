package com.fss.reembolso.lancamento;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LancamentoRepository extends MongoRepository<Lancamento, String> {
    Page<Lancamento> findByUsuarioId(String usuarioId, Pageable pageable);
}

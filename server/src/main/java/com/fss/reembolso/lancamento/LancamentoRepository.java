package com.fss.reembolso.lancamento;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LancamentoRepository extends MongoRepository<Lancamento, String> {
    List<Lancamento> findByUsuarioId();
}

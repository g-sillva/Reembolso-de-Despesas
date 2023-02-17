package com.fss.reembolso.lancamento;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface LancamentoService {
    List<Lancamento> getTodosLancamentos(String titulo, String descricao, String status, String ano, String mes, String categoria);
    List<Lancamento> getLancamentosPorUsuarioId(String usuario_id);
    Lancamento salvarLancamento(Lancamento lancamento, MultipartFile img) throws IOException;
    Lancamento getLancamentoPorId(String id);
    Lancamento patchLancamento(String id, Map<String, Object> field, MultipartFile img) throws IOException;
    boolean deletarLancamento(String id);
}

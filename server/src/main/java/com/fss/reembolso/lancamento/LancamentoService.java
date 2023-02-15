package com.fss.reembolso.lancamento;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface LancamentoService {
    List<Lancamento> getTodosLancamentos();
    Lancamento salvarLancamento(Lancamento lancamento, MultipartFile img) throws IOException;
    Lancamento getLancamentoPorId(String id);
    Lancamento patchUsuario(String id, Map<String, Object> field);
}

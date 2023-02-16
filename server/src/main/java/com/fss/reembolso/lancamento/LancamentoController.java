package com.fss.reembolso.lancamento;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/lancamentos")
@AllArgsConstructor
public class LancamentoController {

    private LancamentoService lancamentoService;

    @GetMapping
    public ResponseEntity<?> getLancamentos(@RequestParam(name = "titulo", defaultValue = "") String titulo,
                                            @RequestParam(name ="descricao", defaultValue = "") String descricao,
                                            @RequestParam(name ="status", defaultValue = "") String status,
                                            @RequestParam(name ="ano", defaultValue = "") String ano,
                                            @RequestParam(name ="mes", defaultValue = "") String mes,
                                            @RequestParam(name ="categoria", defaultValue = "") String categoria,
                                            @RequestParam(name = "usuario_id", defaultValue = "") String usuario_id) {

        return new ResponseEntity<>(
                lancamentoService.getTodosLancamentos(titulo, descricao, status, ano, mes, categoria, usuario_id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getLancamentoId(@PathVariable String id) {
        Lancamento l = lancamentoService.getLancamentoPorId(id);
        if (l != null) return new ResponseEntity<>(l, HttpStatus.OK);
        return new ResponseEntity<>("Usuário não encontrado.", HttpStatus.NOT_FOUND);
    }

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<?> postLancamento(@RequestPart("lancamento") Lancamento lancamento,
                                            @RequestPart("img") MultipartFile img) throws IOException {
        Lancamento l = lancamentoService.salvarLancamento(lancamento, img);
        if (l != null) return new ResponseEntity<>(l, HttpStatus.OK);
        return new ResponseEntity<>("Lançamento não encontrado", HttpStatus.NOT_FOUND);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> patchLancamento (@PathVariable String id,
                                           @RequestPart Map<String, Object> fields,
                                           @RequestPart MultipartFile img) throws IOException {
        Lancamento l = lancamentoService.patchUsuario(id, fields, img);
        if (l != null) return new ResponseEntity<>(l, HttpStatus.OK);
        return new ResponseEntity<>("Lançamento não encontrado", HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLancamento(@PathVariable String id) {
        if (lancamentoService.deletarLancamento(id)) return new ResponseEntity<>("Lançamento deletado com sucesso!", HttpStatus.OK);
        return new ResponseEntity<>("Lançamento não encontrado", HttpStatus.NOT_FOUND);
    }
}

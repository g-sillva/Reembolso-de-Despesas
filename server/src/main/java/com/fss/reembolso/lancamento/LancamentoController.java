package com.fss.reembolso.lancamento;

import com.fss.reembolso.exceptions.RequestResponse;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/lancamentos")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@AllArgsConstructor
public class LancamentoController {

    private LancamentoService lancamentoService;

    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getLancamentos(@RequestParam(name = "titulo", defaultValue = "") String titulo,
                                            @RequestParam(name ="descricao", defaultValue = "") String descricao,
                                            @RequestParam(name ="status", defaultValue = "") String status,
                                            @RequestParam(name ="ano", defaultValue = "") String ano,
                                            @RequestParam(name ="mes", defaultValue = "") String mes,
                                            @RequestParam(name = "dia", defaultValue = "") String dia,
                                            @RequestParam(name ="categoria", defaultValue = "") String categoria,
                                            Pageable pageable) {

        return new ResponseEntity<>(
                lancamentoService.getTodosLancamentos(titulo, descricao, status, ano, mes, dia, categoria, pageable), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getLancamentoId(@PathVariable String id) {
        Lancamento l = lancamentoService.getLancamentoPorId(id);
        if (l != null) return new ResponseEntity<>(l, HttpStatus.OK);
        return new ResponseEntity<>(new RequestResponse("Lancamento não encontrado."), HttpStatus.NOT_FOUND);
    }

    @GetMapping("/user")
    public ResponseEntity<?> getLancamentosPorUsuario(@RequestParam String id, Pageable pageable) {
        return new ResponseEntity<>(lancamentoService.getLancamentosPorUsuarioId(id, pageable), HttpStatus.OK);
    }

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<?> postLancamento(@RequestPart("lancamento") Lancamento lancamento,
                                            @RequestPart("img") MultipartFile img) throws IOException {
        Lancamento l = lancamentoService.salvarLancamento(lancamento, img);
        if (l != null) return new ResponseEntity<>(l, HttpStatus.CREATED);
        return new ResponseEntity<>(new RequestResponse("Usuário não encontrado"), HttpStatus.NOT_FOUND);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> patchLancamento (@PathVariable String id,
                                           @RequestPart(required = false) Map<String, Object> fields,
                                           @RequestPart(required = false) MultipartFile img) throws IOException {
        Lancamento l = lancamentoService.patchLancamento(id, fields, img);
        if (l != null) return new ResponseEntity<>(l, HttpStatus.OK);
        return new ResponseEntity<>(new RequestResponse("Lançamento não encontrado"), HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLancamento(@PathVariable String id) {
        if (lancamentoService.deletarLancamento(id)) return new ResponseEntity<>(new RequestResponse("Lançamento deletado com sucesso!"), HttpStatus.OK);
        return new ResponseEntity<>(new RequestResponse("Lançamento não encontrado"), HttpStatus.NOT_FOUND);
    }
}

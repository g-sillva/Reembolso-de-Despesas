package com.fss.reembolso.lancamento;

import com.fss.reembolso.usuario.DTOs.UsuarioDTO;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/lancamentos")
@AllArgsConstructor
public class LancamentoController {

    private LancamentoService lancamentoService;

    @GetMapping
    public ResponseEntity<?> getLancamentos() {

        // TODO: Filtros
        return new ResponseEntity<>(lancamentoService.getTodosLancamentos(), HttpStatus.OK);
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
    public ResponseEntity<?> patchUsuario (@PathVariable String id, @RequestBody Map<String, Object> fields) {
        Lancamento lancamento = lancamentoService.patchUsuario(id, fields);
        return new ResponseEntity<>(lancamento, HttpStatus.OK);
    }
}

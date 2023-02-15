package com.fss.reembolso.lancamento;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/lancamentos")
@AllArgsConstructor
public class LancamentoController {

    private LancamentoService lancamentoService;

    @GetMapping
    public ResponseEntity<?> getLancamentos() {
        return new ResponseEntity<>(lancamentoService.getTodosLancamentos(), HttpStatus.OK);
    }

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<?> postLancamento(@RequestPart("lancamento") Lancamento lancamento,
                                            @RequestPart("img") MultipartFile img) throws IOException {
        Lancamento l = lancamentoService.salvarLancamento(lancamento, img);
        if (l != null) return new ResponseEntity<>(l, HttpStatus.OK);
        return new ResponseEntity<>("Usuário não encontrado.", HttpStatus.NOT_FOUND);
    }
}

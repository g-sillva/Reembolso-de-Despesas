package com.fss.reembolso.notificacao;

import com.fss.reembolso.exceptions.RequestResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notificacoes")
@AllArgsConstructor
public class NotificacaoController {

    private NotificacaoService notificacaoService;

    @GetMapping
    public ResponseEntity<?> getNotificacoes(@RequestParam(name = "titulo", defaultValue = "") String titulo,
                                             @RequestParam(name = "ano", defaultValue = "") String ano,
                                             @RequestParam(name = "mes", defaultValue = "") String mes,
                                             @RequestParam(name = "dia", defaultValue = "") String dia,
                                             @RequestParam(name = "msg", defaultValue = "") String msg,
                                             @RequestParam(name = "usuario", defaultValue = "") String usuario) {
        return new ResponseEntity<>(notificacaoService.getNotificacoes(titulo, ano, mes, dia, msg, usuario), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getNotificacaoPorId(@PathVariable String id) {
        Notificacao n = notificacaoService.getNotificacaoPorId(id);
        if (n != null) return new ResponseEntity<>(n, HttpStatus.OK);
        return new ResponseEntity<>(new RequestResponse("Nenhuma notificação encontrada com esse id."), HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<?> addNotificacao(@RequestBody @Valid Notificacao notificacao) {
        return notificacaoService.adicionarNotificacao(notificacao);
    }

    @PostMapping("/view/{id}")
    public ResponseEntity<?> visualizarNotificacao(@PathVariable String id) {
        Notificacao n = notificacaoService.visualizarNotificacao(id);
        if (n != null) return new ResponseEntity<>(n, HttpStatus.OK);
        return new ResponseEntity<>(new RequestResponse("Notificação não encontrada."), HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarNotificacao(@PathVariable String id) {
        if (notificacaoService.deletarNotificacao(id)) return new ResponseEntity<>(new RequestResponse("Notificação removida com sucesso!"), HttpStatus.OK);
        return new ResponseEntity<>(new RequestResponse("Notificação não encontrada."), HttpStatus.NOT_FOUND);
    }

}

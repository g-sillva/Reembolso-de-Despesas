package com.fss.reembolso.usuario;

import com.fss.reembolso.usuario.DTOs.UsuarioDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/clients")
@AllArgsConstructor
public class UsuarioController {

    private UsuarioService usuarioService;

    @GetMapping()
    public ResponseEntity<?> getUsuarios(@RequestParam("nome") Optional<String> nome,
                                         @RequestParam("email") Optional<String> email,
                                         @RequestParam("telefone") Optional<String> telefone,
                                         @RequestParam("ano") Optional<Integer> ano,
                                         @RequestParam("mes") Optional<Integer> mes) {

        List<UsuarioDTO> usuarios = usuarioService.getTodosUsuarios(nome, email, telefone, ano, mes);
        return new ResponseEntity<>(usuarios, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable String id) {
        UsuarioDTO usuario = usuarioService.getUsuarioPorId(id);
        if (usuario != null) return new ResponseEntity<>(usuario, HttpStatus.OK);
        return new ResponseEntity<>("Usuário não encontrado.", HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<?> addUsuario(@RequestBody Usuario u) {
        usuarioService.salvarUsuario(u);
        return new ResponseEntity<>("Usuário cadastrado com sucesso!", HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUsuario(@PathVariable String id) {
        if (usuarioService.deletarUsuario(id)) return new ResponseEntity<>("Usuário remvoido com sucesso!", HttpStatus.OK);
        return new ResponseEntity<>("Usuário não encontrado.", HttpStatus.NOT_FOUND);
    }
}

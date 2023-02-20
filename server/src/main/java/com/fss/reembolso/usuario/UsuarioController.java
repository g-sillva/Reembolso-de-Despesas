package com.fss.reembolso.usuario;

import com.fss.reembolso.exceptions.ApiRequestException;
import com.fss.reembolso.usuario.DTOs.UsuarioLoginDTO;
import com.fss.reembolso.usuario.DTOs.UsuarioRetornoDTO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/clientes")
@AllArgsConstructor
public class UsuarioController {

    private UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<?> loginUsuario(@RequestBody UsuarioLoginDTO usuario) {
        return usuarioService.logarUsuario(usuario);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUsuario(@RequestBody @Valid Usuario u, HttpServletRequest req) {
        return usuarioService.salvarUsuario(u, getSiteURL(req));
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verificarUsuario(@RequestParam String codigo) {
        if (usuarioService.verificarEmail(codigo)) {
            return new ResponseEntity<>("E-mail verificado com sucesso!", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Erro ao verificar e-mail", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping()
    public ResponseEntity<?> getUsuarios(@RequestParam(name = "nome", defaultValue = "") String nome,
                                         @RequestParam(name ="email", defaultValue = "") String email,
                                         @RequestParam(name ="telefone", defaultValue = "") String telefone,
                                         @RequestParam(name ="ano", defaultValue = "") String ano,
                                         @RequestParam(name ="mes", defaultValue = "") String mes) {

        List<UsuarioRetornoDTO> usuarios = usuarioService.getTodosUsuarios(nome, email, telefone, ano, mes);
        return new ResponseEntity<>(usuarios, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable String id) {
        UsuarioRetornoDTO usuario = usuarioService.getUsuarioPorId(id);
        if (usuario != null) return new ResponseEntity<>(usuario, HttpStatus.OK);
        return new ResponseEntity<>("Usuário não encontrado.", HttpStatus.NOT_FOUND);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> patchUsuario (@PathVariable String id,
                                           @RequestBody Map<String, Object> fields) {
        UsuarioRetornoDTO usuario = usuarioService.patchUsuario(id, fields);
        return new ResponseEntity<>(usuario, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUsuario(@PathVariable String id) {
        if (usuarioService.deletarUsuario(id)) return new ResponseEntity<>("Usuário remvoido com sucesso!", HttpStatus.OK);
        return new ResponseEntity<>("Usuário não encontrado.", HttpStatus.NOT_FOUND);
    }

    private String getSiteURL(HttpServletRequest request) {
        String siteURL = request.getRequestURL().toString();
        return siteURL.replace(request.getServletPath(), "");
    }
}

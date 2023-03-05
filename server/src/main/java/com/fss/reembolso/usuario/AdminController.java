package com.fss.reembolso.usuario;

import com.fss.reembolso.usuario.DTOs.UsuarioLoginDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@AllArgsConstructor
public class AdminController {

    private UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<?> loginUsuario(@RequestBody UsuarioLoginDTO usuario) {
        return usuarioService.logarUsuarioAdmin(usuario);
    }

}

package com.fss.reembolso.usuario;

import com.fss.reembolso.usuario.DTOs.UsuarioDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface UsuarioService {

    List<UsuarioDTO> getTodosUsuarios(String nome, String email, String telefone, String ano, String mes);
    ResponseEntity<?> salvarUsuario(Usuario u);
    UsuarioDTO getUsuarioPorId(String id);
    boolean deletarUsuario(String id);
}

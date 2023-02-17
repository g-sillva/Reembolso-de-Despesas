package com.fss.reembolso.usuario;

import com.fss.reembolso.usuario.DTOs.UsuarioLoginDTO;
import com.fss.reembolso.usuario.DTOs.UsuarioRetornoDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface UsuarioService {

    List<UsuarioRetornoDTO> getTodosUsuarios(String nome, String email, String telefone, String ano, String mes);
    ResponseEntity<?> salvarUsuario(Usuario u, String url);
    UsuarioRetornoDTO getUsuarioPorId(String id);
    UsuarioRetornoDTO patchUsuario(String id, Map<String, Object> fields);
    boolean deletarUsuario(String id);
    ResponseEntity<?> logarUsuario(UsuarioLoginDTO usuario);
    ResponseEntity<?> logarUsuarioAdmin(UsuarioLoginDTO usuario);
    boolean verificarEmail(String codigo);
}

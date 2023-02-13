package com.fss.reembolso.usuario;

import com.fss.reembolso.usuario.DTOs.UsuarioDTO;

import java.util.List;
import java.util.Optional;

public interface UsuarioService {

    List<UsuarioDTO> getTodosUsuarios(Optional<String> nome,
                                      Optional<String> email,
                                      Optional<String> telefone,
                                      Optional<Integer> ano,
                                      Optional<Integer> mes);
    void salvarUsuario(Usuario u);
    UsuarioDTO getUsuarioPorId(String id);
    boolean deletarUsuario(String id);
}

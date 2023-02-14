package com.fss.reembolso.usuario;

import com.fss.reembolso.usuario.DTOs.UsuarioDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UsuarioServiceImpl implements UsuarioService{

    private UsuarioRepository usuarioRepository;

    @Override
    public List<UsuarioDTO> getTodosUsuarios(Optional<String> nome,
                                             Optional<String> email,
                                             Optional<String> telefone,
                                             Optional<Integer> ano,
                                             Optional<Integer> mes) {
        List<UsuarioDTO> usuarioDTOS = usuarioRepository.findAll().stream().map(UsuarioDTO::new).toList();

        if (nome.isPresent()) usuarioDTOS = usuarioDTOS.stream().filter(x -> x.getNome().toLowerCase().contains(nome.get().toLowerCase())).toList();
        if (email.isPresent()) usuarioDTOS = usuarioDTOS.stream().filter(x -> x.getEmail().toLowerCase().contains(email.get().toLowerCase())).toList();
        if (telefone.isPresent()) usuarioDTOS = usuarioDTOS.stream().filter(x -> x.getTelefone().contains(telefone.get())).toList();
        if (ano.isPresent()) usuarioDTOS = usuarioDTOS.stream().filter(x -> x.getDataCadastro().getYear() == ano.get()).toList();
        if (mes.isPresent()) usuarioDTOS = usuarioDTOS.stream().filter(x -> x.getDataCadastro().getMonthValue() == mes.get()).toList();

        return usuarioDTOS;
    }

    @Override
    public ResponseEntity<?> salvarUsuario(Usuario u) {
        if (usuarioRepository.findByEmail(u.getEmail()) != null) {
            return new ResponseEntity<>("O e-mail já está cadastrado no sistema.", HttpStatus.BAD_REQUEST);
        }
        usuarioRepository.save(u);
        return new ResponseEntity<>("Usuario cadastrado com sucesso!", HttpStatus.BAD_REQUEST);
    }

    @Override
    public UsuarioDTO getUsuarioPorId(String id) {
        Optional<Usuario> usuario = usuarioRepository.findById(id);
        return usuario.map(UsuarioDTO::new).orElse(null);
    }

    @Override
    public boolean deletarUsuario(String id) {
        Optional<Usuario> u = usuarioRepository.findById(id);
        if (u.isPresent()) {
            usuarioRepository.delete(u.get());
            return true;
        }
        return false;
    }


}

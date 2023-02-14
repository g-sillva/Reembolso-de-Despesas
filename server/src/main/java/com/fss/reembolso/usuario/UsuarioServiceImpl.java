package com.fss.reembolso.usuario;

import com.fss.reembolso.usuario.DTOs.UsuarioDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UsuarioServiceImpl implements UsuarioService{

    private UsuarioRepository usuarioRepository;

    @Override
    public List<UsuarioDTO> getTodosUsuarios(String nome, String email, String telefone, String ano, String mes) {
        List<UsuarioDTO> usuarioDTOS = usuarioRepository.findAll().stream().map(UsuarioDTO::new).toList();

        usuarioDTOS = usuarioDTOS.stream().filter(x ->
            x.getNome().toLowerCase().contains(nome.toLowerCase()) &&
                   x.getEmail().toLowerCase().contains(email.toLowerCase()) &&
                    x.getTelefone().contains(telefone) &&
                    Integer.toString(x.getDataCadastro().getYear()).contains(ano.equals("") ? Integer.toString(x.getDataCadastro().getYear()) : ano) &&
                    Integer.toString(x.getDataCadastro().getMonthValue()).contains(mes.equals("") ? Integer.toString(x.getDataCadastro().getMonthValue()) : mes)
        ).collect(Collectors.toList());

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
    public UsuarioDTO patchUsuario(String id, Map<String, Object> fields) {
        Optional<Usuario> u = usuarioRepository.findById(id);
        if (u.isPresent()) {
            fields.forEach((k, v) -> {
                Field field = ReflectionUtils.findField(Usuario.class, k);
                field.setAccessible(true);
                if (field.getName().equalsIgnoreCase("email")) {
                    u.get().setAtivo(false);
                }
                ReflectionUtils.setField(field, u.get(), v);
            });
            usuarioRepository.save(u.get());
            return new UsuarioDTO(u.get());
        }
        return null;
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

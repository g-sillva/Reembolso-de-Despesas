package com.fss.reembolso.usuario;

import com.fss.reembolso.jwt.TokenDTO;
import com.fss.reembolso.jwt.TokenService;
import com.fss.reembolso.usuario.DTOs.UsuarioLoginDTO;
import com.fss.reembolso.usuario.DTOs.UsuarioRetornoDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
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
    private TokenService tokenService;
    private PasswordEncoder passwordEncoder;

    @Override
    public List<UsuarioRetornoDTO> getTodosUsuarios(String nome, String email, String telefone, String ano, String mes) {
        List<UsuarioRetornoDTO> usuarioRetornoDTOS = usuarioRepository.findAll().stream().map(UsuarioRetornoDTO::new).toList();

        usuarioRetornoDTOS = usuarioRetornoDTOS.stream().filter(x ->
            x.getNome().toLowerCase().contains(nome.toLowerCase()) &&
                   x.getEmail().toLowerCase().contains(email.toLowerCase()) &&
                    x.getTelefone().contains(telefone) &&
                    Integer.toString(x.getDataCadastro().getYear()).contains(ano.equals("") ? Integer.toString(x.getDataCadastro().getYear()) : ano) &&
                    Integer.toString(x.getDataCadastro().getMonthValue()).contains(mes.equals("") ? Integer.toString(x.getDataCadastro().getMonthValue()) : mes)
        ).collect(Collectors.toList());

        return usuarioRetornoDTOS;
    }

    @Override
    public UsuarioRetornoDTO patchUsuario(String id, Map<String, Object> fields) {
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
            return new UsuarioRetornoDTO(u.get());
        }
        return null;
    }

    @Override
    public UsuarioRetornoDTO getUsuarioPorId(String id) {
        Optional<Usuario> usuario = usuarioRepository.findById(id);
        return usuario.map(UsuarioRetornoDTO::new).orElse(null);
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

    @Override
    public ResponseEntity<?> salvarUsuario(Usuario u) {
        if (usuarioRepository.findByEmail(u.getEmail()) != null) {
            return new ResponseEntity<>("O e-mail já está cadastrado no sistema.", HttpStatus.BAD_REQUEST);
        }
        u.setSenha(passwordEncoder.encode(u.getSenha()));
        usuarioRepository.save(u);
        return new ResponseEntity<>("Usuario cadastrado com sucesso!", HttpStatus.BAD_REQUEST);
    }

    @Override
    public ResponseEntity<?> logarUsuario(UsuarioLoginDTO usuario) {
        Usuario u = usuarioRepository.findByEmail(usuario.getEmail());
        if (u != null) {
            if (passwordEncoder.matches(usuario.getSenha(), u.getPassword())) {

                if (!u.isAtivo()) {
                    return new ResponseEntity<>("E-mail não verificado.", HttpStatus.BAD_REQUEST);
                }

                return new ResponseEntity<>(new TokenDTO(tokenService.gerarToken(usuario)), HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Senha incorreta.", HttpStatus.BAD_REQUEST);
            }
        }

        return new ResponseEntity<>("E-mail incorreta.", HttpStatus.NOT_FOUND);
    }

    // TODO: Enviar e-mail de verificação

}

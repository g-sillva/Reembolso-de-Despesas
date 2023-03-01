package com.fss.reembolso.usuario;

import com.fss.reembolso.exceptions.RequestResponse;
import com.fss.reembolso.jwt.TokenDTO;
import com.fss.reembolso.jwt.TokenService;
import com.fss.reembolso.usuario.DTOs.UsuarioLoginDTO;
import com.fss.reembolso.usuario.DTOs.UsuarioRegistroDTO;
import com.fss.reembolso.usuario.DTOs.UsuarioRetornoDTO;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UsuarioServiceImpl implements UsuarioService{

    private UsuarioRepository usuarioRepository;
    private TokenService tokenService;
    private PasswordEncoder passwordEncoder;
    private JavaMailSender javaMailSender;

    @Override
    public List<UsuarioRetornoDTO> getTodosUsuarios(String nome, String email, String telefone, String ano, String mes, String dia) {
        List<UsuarioRetornoDTO> usuarioRetornoDTOS = usuarioRepository.findAll().stream().map(UsuarioRetornoDTO::new).toList();

        usuarioRetornoDTOS = usuarioRetornoDTOS.stream().filter(x ->
            x.getNome().toLowerCase().contains(nome.toLowerCase()) &&
                   x.getEmail().toLowerCase().contains(email.toLowerCase()) &&
                    x.getTelefone().contains(telefone) &&
                    Integer.toString(x.getDataCadastro().getYear()).contains(ano.equals("") ? Integer.toString(x.getDataCadastro().getYear()) : ano) &&
                    Integer.toString(x.getDataCadastro().getMonthValue()).contains(mes.equals("") ? Integer.toString(x.getDataCadastro().getMonthValue()) : mes) &&
                    Integer.toString(x.getDataCadastro().getDayOfMonth()).contains(dia.equals("") ? Integer.toString(x.getDataCadastro().getDayOfMonth()) : dia)
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
                    String codigoDeVerificacao = UUID.randomUUID().toString().replaceAll("_", "");
                    u.get().setCodigoVerificacao(codigoDeVerificacao);
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
    public ResponseEntity<?> salvarUsuario(UsuarioRegistroDTO u, String url) {
        if (usuarioRepository.findByEmail(u.getEmail()) != null) {
            return new ResponseEntity<>(new RequestResponse("O e-mail já está cadastrado no sistema."), HttpStatus.BAD_REQUEST);
        }
        u.setSenha(passwordEncoder.encode(u.getSenha()));

        Usuario usuario = new Usuario(u);

        String codigoDeVerificacao = UUID.randomUUID().toString().replaceAll("_", "");
        usuario.setCodigoVerificacao(codigoDeVerificacao);
        usuarioRepository.save(usuario);

        enviarEmailVerificacao(usuario, url);
        return new ResponseEntity<>(new RequestResponse("Usuario cadastrado com sucesso!"), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> logarUsuario(UsuarioLoginDTO usuario) {
        Usuario u = usuarioRepository.findByEmail(usuario.getEmail());
        if (u != null) {
            if (passwordEncoder.matches(usuario.getSenha(),  u.getPassword())) {

                if (!u.isEnabled()) {
                    return new ResponseEntity<>(new RequestResponse("E-mail não verificado."), HttpStatus.BAD_REQUEST);
                }

                return new ResponseEntity<>(new TokenDTO(tokenService.gerarToken(usuario)), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new RequestResponse("Senha incorreta."), HttpStatus.BAD_REQUEST);
            }
        }
        return new ResponseEntity<>(new RequestResponse("E-mail incorreto."), HttpStatus.NOT_FOUND);
    }

    @Override
    public ResponseEntity<?> logarUsuarioAdmin(UsuarioLoginDTO usuario) {
        Usuario u = usuarioRepository.findByEmail(usuario.getEmail());
        if (u != null) {
            if (passwordEncoder.matches(usuario.getSenha(), u.getPassword())) {

                if (!u.getRoles().contains(Role.ADMIN)) {
                    return new ResponseEntity<>(new RequestResponse("Sem permissão de administrador."), HttpStatus.UNAUTHORIZED);
                }

                return new ResponseEntity<>(new TokenDTO(tokenService.gerarToken(usuario)), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new RequestResponse("Senha incorreta."), HttpStatus.BAD_REQUEST);
            }
        }
        return new ResponseEntity<>(new RequestResponse("E-mail incorreto."), HttpStatus.NOT_FOUND);
    }

    @Override
    public boolean verificarEmail(String codigo) {
        Usuario u = usuarioRepository.findByCodigoVerificacao(codigo);
        if (u == null || u.isEnabled()) return false;
        u.setCodigoVerificacao(null);
        u.setAtivo(true);
        usuarioRepository.save(u);
        return true;
    }

    public void enviarEmailVerificacao(Usuario usuario, String url) {
        try {
            String toAddress = usuario.getEmail();
            String emailUser = "silvagabriel.limars@gmail.com";
            String senderName = "Reembolso de Despesas";
            String subject = "Finalização do cadastro";
            String content = "[[name]],<br>"
                    + "Por favor clique no link abaixo para finalizar seu cadastro:<br>"
                    + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFICAR</a></h3>"
                    + "Obrigado,<br>"
                    + "Reembolso de Despesas.";

            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);

            helper.setFrom(emailUser, senderName);
            helper.setTo(toAddress);
            helper.setSubject(subject);

            content = content.replace("[[name]]", usuario.getNome());
            String verifyURL = url + "/api/clientes/verify?codigo=" + usuario.getCodigoVerificacao();

            content = content.replace("[[URL]]", verifyURL);

            helper.setText(content, true);

            javaMailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Erro ao enviar e-mail. " + e);
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("Erro com a codificação do e-mail. " + e);
        }
    }
}

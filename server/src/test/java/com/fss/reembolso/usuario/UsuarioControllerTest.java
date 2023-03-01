package com.fss.reembolso.usuario;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fss.reembolso.jwt.TokenService;
import com.fss.reembolso.usuario.DTOs.UsuarioLoginDTO;
import com.fss.reembolso.usuario.DTOs.UsuarioRegistroDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.HashMap;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class UsuarioControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UsuarioController controller;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Test
    public void contextLoads() throws Exception {
        assertThat(controller).isNotNull();
    }

    @Test
    public void deveRetornarTodosOsUsuariosSeTokenValido() throws Exception {
        String token = tokenService.gerarToken(new UsuarioLoginDTO("email_test2@gmail.com", "1234"));

        this.mockMvc.perform(get("/api/clientes")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isNotEmpty());
    }

    @Test
    public void deveRetornarOsUsuariosFiltrados() throws Exception {
        String token = tokenService.gerarToken(new UsuarioLoginDTO("email_test2@gmail.com", "1234"));

        this.mockMvc.perform(get("/api/clientes?nome=teste&email=email_teste")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").exists());
    }

    @Test
    public void deveRetornarNenhumUsuarioFiltrado() throws Exception{
        String token = tokenService.gerarToken(new UsuarioLoginDTO("email_test2@gmail.com", "1234"));

        this.mockMvc.perform(get("/api/clientes?nome=testefalso")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isEmpty());
    }

    @Test
    public void deveRetornarUsuarioComIdCorreto() throws Exception {
        String token = tokenService.gerarToken(new UsuarioLoginDTO("email_test2@gmail.com", "1234"));

        this.mockMvc.perform(get("/api/clientes/63fe7d0d0bdbc509fa74f1d1")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isNotEmpty());
    }

    @Test
    public void deveRetornarUsuarioComIdIncorreto() throws Exception {
        String token = tokenService.gerarToken(new UsuarioLoginDTO("email_test2@gmail.com", "1234"));

        this.mockMvc.perform(get("/api/clientes/oosdo2903902302")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("message").value("Usuário não encontrado."));
    }

    @Test
    public void deveLogarERetornarToken() throws Exception {
        UsuarioLoginDTO login = new UsuarioLoginDTO();
        login.setEmail("nedafi6003@aosod.com");
        login.setSenha("1234");

        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
        String requestJson = ow.writeValueAsString(login);

        mockMvc.perform(post("/api/clientes/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("token").exists());
    }

    @Test
    public void deveRetornarErroComEmailIncorreto() throws Exception {
        UsuarioLoginDTO login = new UsuarioLoginDTO();
        login.setEmail("nedafi6003999999@aosod.com");
        login.setSenha("1234");

        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
        String requestJson = ow.writeValueAsString(login);

        mockMvc.perform(post("/api/clientes/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJson))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("message").value("E-mail incorreto."));
    }

    @Test
    public void deveRetornarErroComEmailCorretoESenhaIncorreta() throws Exception {
        UsuarioLoginDTO login = new UsuarioLoginDTO();
        login.setEmail("nedafi6003@aosod.com");
        login.setSenha("123");

        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
        String requestJson = ow.writeValueAsString(login);

        mockMvc.perform(post("/api/clientes/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJson))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("message").value("Senha incorreta."));
    }

    @Test
    public void deveRegistrarComEmailNovoNoSistemaEDadosObrigatoriosPresentes() throws Exception {
        UsuarioRegistroDTO usuario = new UsuarioRegistroDTO();
        usuario.setNome("teste");
        usuario.setEmail("email_test3@gmail.com");
        usuario.setTelefone("5190482031");
        usuario.setSenha("1234");

        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
        String requestJson = ow.writeValueAsString(usuario);

        mockMvc.perform(post("/api/clientes/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("message").value("Usuario cadastrado com sucesso!"));
        Usuario usuarioEntidade = usuarioRepository.findByEmail(usuario.getEmail());
        assertThat(usuarioEntidade.getNome()).isEqualTo("teste");

        Usuario u = usuarioRepository.findByEmail(usuario.getEmail());
        usuarioRepository.delete(u);
    }

    @Test
    public void deveRetornarErroAoRegistrarComEmailJaExistente() throws Exception {
        UsuarioRegistroDTO usuario = new UsuarioRegistroDTO();
        usuario.setNome("teste");
        usuario.setEmail("email_test2@gmail.com");
        usuario.setTelefone("5190482031");
        usuario.setSenha("1234");

        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
        String requestJson = ow.writeValueAsString(usuario);

        mockMvc.perform(post("/api/clientes/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJson))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("message").value("O e-mail já está cadastrado no sistema."));
    }

    @Test
    public void deveRetornarErroAoRegistrarSemAlgumCampo() throws Exception {
        UsuarioRegistroDTO usuario = new UsuarioRegistroDTO();
        usuario.setNome("teste");
        usuario.setTelefone("5190482031");
        usuario.setSenha("1234");

        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
        String requestJson = ow.writeValueAsString(usuario);

        mockMvc.perform(post("/api/clientes/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJson))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("message").value("email: O e-mail não pode estar vazio"));
    }

    @Test
    public void deveVerificarEmailERetornarMensagemPositiva() throws Exception {
        mockMvc.perform(get("/api/clientes/verify?codigo=f7400f5b-677f-407e-9c9e-1cfa0d8e4322"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("message").value("E-mail verificado com sucesso!"));
    }

    @Test
    public void deveRetornarErroAoTentarVerificarUsuarioComCodigoInvalido() throws Exception {
        mockMvc.perform(get("/api/clientes/verify?codigo=aabbc"))
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("message").value("Erro ao verificar e-mail"));
    }

    @Test
    public void deveAtualizarNomeDoUsuario() throws Exception {
        Map<String, String> dados = new HashMap<>();
        dados.put("nome", "teste");

        String token = tokenService.gerarToken(new UsuarioLoginDTO("email_test2@gmail.com", "1234"));

        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
        String requestJson = ow.writeValueAsString(dados);

        mockMvc.perform(patch("/api/clientes/63fe7d0d0bdbc509fa74f1d1")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("nome").value("teste"));
    }

}

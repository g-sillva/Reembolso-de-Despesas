package com.fss.reembolso.notificacao;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fss.reembolso.jwt.TokenService;
import com.fss.reembolso.lancamento.LancamentoController;
import com.fss.reembolso.notificacao.Notificacao;
import com.fss.reembolso.usuario.DTOs.UsuarioLoginDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class NotificacaoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private LancamentoController controller;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private NotificacaoRepository notificacaoRepository;

    @Test
    public void contextLoads() throws Exception {
        assertThat(controller).isNotNull();
    }

    @Test
    public void deveRetornarTodosAsNotificacoesSeTokenValido() throws Exception {
        String token = tokenService.gerarToken(new UsuarioLoginDTO("erickmalaguezrowedder@gmail.com", "1234"));

        this.mockMvc.perform(get("/api/notificacoes")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isNotEmpty());
    }

    @Test
    public void deveRetornarTodosAsNotificacoesFiltradas() throws Exception {
        String token = tokenService.gerarToken(new UsuarioLoginDTO("erickmalaguezrowedder@gmail.com", "1234"));

        this.mockMvc.perform(get("/api/notificacoes?titulo=lançamento")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isNotEmpty());
    }

    @Test
    public void deveRetornarNotificacaoPorIdValido() throws Exception {
        String token = tokenService.gerarToken(new UsuarioLoginDTO("erickmalaguezrowedder@gmail.com", "1234"));

        this.mockMvc.perform(get("/api/notificacoes/63ffadbaa4937f2d15c53df5")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("msg").value("O lançamento: 'Primeiro lançamento de teste' teve o seu status alterado para AGUARDANDO_REEMBOLSO"));
    }

    @Test
    public void deveRetornarNotificacaoPorIdInvalido() throws Exception {
        String token = tokenService.gerarToken(new UsuarioLoginDTO("erickmalaguezrowedder@gmail.com", "1234"));

        this.mockMvc.perform(get("/api/notificacoes/fdofosdfokdsokf")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("message").value("Nenhuma notificação encontrada com esse id."));
    }
    @Test
    public void deveRegistrarNotificacaoComDadosValidos() throws Exception {
        String token = tokenService.gerarToken(new UsuarioLoginDTO("erickmalaguezrowedder@gmail.com", "1234"));

        Notificacao notificacao = new Notificacao();
        notificacao.setTitulo("Notificacao de teste");
        notificacao.setMsg("Msg da notificação de teste");
        notificacao.setUsuarioId("63ee2a9cc17b4446be0217b4");

        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
        String requestJson = ow.writeValueAsString(notificacao);

        mockMvc.perform(post("/api/notificacoes")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestJson)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("message").value("Notificação salva com sucesso!"));
    }

    @Test
    public void deveRetornarErroAoCriarNotificacaoComUsuarioInvalido() throws Exception {
        String token = tokenService.gerarToken(new UsuarioLoginDTO("erickmalaguezrowedder@gmail.com", "1234"));

        Notificacao notificacao = new Notificacao();
        notificacao.setTitulo("Notificacao de teste");
        notificacao.setMsg("Msg da notificação de teste");
        notificacao.setUsuarioId("aaaabbc");

        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
        String requestJson = ow.writeValueAsString(notificacao);

        mockMvc.perform(post("/api/notificacoes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJson)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("message").value("Usuário não encontrado."));
    }

    @Test
    public void deveRetornarErroAoCriarNotificacaoComFaltaDeDados() throws Exception {
        String token = tokenService.gerarToken(new UsuarioLoginDTO("erickmalaguezrowedder@gmail.com", "1234"));

        Notificacao notificacao = new Notificacao();
        notificacao.setTitulo("Notificacao de teste");
        notificacao.setMsg("Msg da notificação de teste");

        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
        String requestJson = ow.writeValueAsString(notificacao);

        mockMvc.perform(post("/api/notificacoes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJson)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$[0].mensagem").value("O usuário não pode estar vazio."));
    }

    @Test
    public void deveVisualizarNotificacaoComIdValido() throws Exception {
        String token = tokenService.gerarToken(new UsuarioLoginDTO("erickmalaguezrowedder@gmail.com", "1234"));
        mockMvc.perform(post("/api/notificacoes/view/63ffdef494bf39399a0ffd87")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("visto").value("true"));
    }

    @Test
    public void deveRetornarErroAoVisualizarNotificacaoComIdInvalido() throws Exception {
        String token = tokenService.gerarToken(new UsuarioLoginDTO("erickmalaguezrowedder@gmail.com", "1234"));
        mockMvc.perform(post("/api/notificacoes/view/aaabbb")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("message").value("Notificação não encontrada."));
    }

    @Test
    public void deveDeletarNotificacaoComIdValido() throws Exception {
        String token = tokenService.gerarToken(new UsuarioLoginDTO("erickmalaguezrowedder@gmail.com", "1234"));
        mockMvc.perform(delete("/api/notificacoes/6401e2dd8d00d62acd2bf349")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("message").value("Notificação removida com sucesso!"));
    }

    @Test
    public void deveRetornarErroAoDeletarNotificacaoComIdInvalido() throws Exception {
        String token = tokenService.gerarToken(new UsuarioLoginDTO("erickmalaguezrowedder@gmail.com", "1234"));
        mockMvc.perform(delete("/api/notificacoes/aaabbb")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("message").value("Notificação não encontrada."));
    }
}

package com.fss.reembolso.lancamento;

import com.fss.reembolso.jwt.TokenService;
import com.fss.reembolso.usuario.DTOs.UsuarioLoginDTO;
import com.fss.reembolso.usuario.UsuarioRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class LancamentoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private LancamentoController controller;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Test
    public void contextLoads() throws Exception {
        assertThat(controller).isNotNull();
    }

    @Test
    public void deveRetornarTodosOsLancamentosSeTokenValido() throws Exception {
        String token = tokenService.gerarToken(new UsuarioLoginDTO("erickmalaguezrowedder@gmail.com", "1234"));

        this.mockMvc.perform(get("/api/lancamentos")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isNotEmpty());
    }

    @Test
    public void deveRetornarOsLancamentosFiltrados() throws Exception {
        String token = tokenService.gerarToken(new UsuarioLoginDTO("erickmalaguezrowedder@gmail.com", "1234"));

        this.mockMvc.perform(get("/api/lancamentos?status=aguardando_reembolso&ano=2023&dia=16")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("content").isNotEmpty());
    }

    @Test
    public void deveRetornarOLancamentoPorIdValido() throws Exception {
        String token = tokenService.gerarToken(new UsuarioLoginDTO("erickmalaguezrowedder@gmail.com", "1234"));

        this.mockMvc.perform(get("/api/lancamentos/63ee7368080f686b3219f4fb")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("titulo").value("Primeiro lançamento de teste"));
    }

    @Test
    public void deveRetornarOLancamentoPorIdInvalido() throws Exception {
        String token = tokenService.gerarToken(new UsuarioLoginDTO("erickmalaguezrowedder@gmail.com", "1234"));

        this.mockMvc.perform(get("/api/lancamentos/09239asasa")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("message").value("Lancamento não encontrado."));
    }


    @Test
    public void deveRetornarTodosOsLancamentosFiltradosPorUsuarioExistente() throws Exception {
        String token = tokenService.gerarToken(new UsuarioLoginDTO("erickmalaguezrowedder@gmail.com", "1234"));

        this.mockMvc.perform(get("/api/lancamentos/user?id=63ee6194bf338854006f338d")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("content").isNotEmpty());
    }

    @Test
    public void deveRetornarTodosOsLancamentosFiltradosPorUsuarioInexistente() throws Exception {
        String token = tokenService.gerarToken(new UsuarioLoginDTO("erickmalaguezrowedder@gmail.com", "1234"));

        this.mockMvc.perform(get("/api/lancamentos/user?id=as")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("content").isEmpty());
    }
}

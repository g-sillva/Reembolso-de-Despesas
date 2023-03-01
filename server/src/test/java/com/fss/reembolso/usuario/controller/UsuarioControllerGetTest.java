package com.fss.reembolso.usuario.controller;

import com.fss.reembolso.jwt.TokenService;
import com.fss.reembolso.usuario.DTOs.UsuarioLoginDTO;
import com.fss.reembolso.usuario.UsuarioController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class UsuarioControllerGetTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UsuarioController controller;

    @Autowired
    private TokenService tokenService;

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
}

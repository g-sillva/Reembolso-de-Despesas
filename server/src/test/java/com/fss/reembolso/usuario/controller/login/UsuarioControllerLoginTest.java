package com.fss.reembolso.usuario.controller.login;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fss.reembolso.usuario.DTOs.UsuarioLoginDTO;
import com.fss.reembolso.usuario.UsuarioController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class UsuarioControllerLoginTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UsuarioController controller;

    @Test
    public void contextLoads() throws Exception {
        assertThat(controller).isNotNull();
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
}

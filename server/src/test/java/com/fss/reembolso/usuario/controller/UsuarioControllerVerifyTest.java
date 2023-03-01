package com.fss.reembolso.usuario.controller;

import com.fss.reembolso.usuario.UsuarioController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class UsuarioControllerVerifyTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UsuarioController controller;

    @Test
    public void contextLoads() throws Exception {
        assertThat(controller).isNotNull();
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
}

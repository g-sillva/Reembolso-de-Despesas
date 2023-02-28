package com.fss.reembolso.usuario.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fss.reembolso.usuario.DTOs.UsuarioLoginDTO;
import com.fss.reembolso.usuario.Usuario;
import com.fss.reembolso.usuario.UsuarioController;
import com.fss.reembolso.usuario.UsuarioRepository;
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
public class UsuarioControllerRegistroTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UsuarioController controller;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Test
    public void contextLoads() throws Exception {
        assertThat(controller).isNotNull();
    }

    @Test
    public void deveLogarERetornarToken() throws Exception {
        Usuario usuario = new Usuario();
        usuario.setNome("erick");
        usuario.setEmail("erickmalaguezrowedder@gmail.com");
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
        assertThat(usuarioEntidade.getNome()).isEqualTo("erick");
    }

}

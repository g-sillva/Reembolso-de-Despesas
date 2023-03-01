package com.fss.reembolso.lancamento;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fss.reembolso.jwt.TokenService;
import com.fss.reembolso.lancamento.Enums.Categoria;
import com.fss.reembolso.usuario.DTOs.UsuarioLoginDTO;
import com.fss.reembolso.usuario.UsuarioRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMultipartHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
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

    @Autowired
    private WebApplicationContext webApplicationContext;

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

    @Test
    public void deveAdicionarUmNovoLancamento() throws Exception {
        String token = tokenService.gerarToken(new UsuarioLoginDTO("capak69333@iucake.com", "1234"));

        MockMultipartFile img = new MockMultipartFile("img", "img_test.png", MediaType.MULTIPART_FORM_DATA_VALUE, "C:\\Users\\silva\\Desktop\\img_test.png".getBytes());

        Lancamento lancamento = new Lancamento();
        lancamento.setTitulo("Lancamento de teste 1");
        lancamento.setCategoria(Categoria.SOFTWARE);
        lancamento.setValor(8990L);
        lancamento.setUsuarioId("63ee2a9cc17b4446be0217b4");

        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
        String requestJson = ow.writeValueAsString(lancamento);

        MockMultipartFile lancamentoData = new MockMultipartFile("lancamento", "", "application/json", requestJson.getBytes());

        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();

        mockMvc.perform(MockMvcRequestBuilders.multipart("/api/lancamentos")
                        .file(img)
                        .file(lancamentoData)
                        .characterEncoding("UTF-8")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("titulo").value("Lancamento de teste 1"));

    }

    @Test
    public void deveEditarStatusUmLancamentoComIdValido() throws Exception {
        String token = tokenService.gerarToken(new UsuarioLoginDTO("capak69333@iucake.com", "1234"));
        MockMultipartFile fields = new MockMultipartFile("fields", "", "application/json", "{ \"status\": \"ENVIADO\" }".getBytes());
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();

        MockMultipartHttpServletRequestBuilder builder =
                MockMvcRequestBuilders.multipart("/api/lancamentos/63ee7368080f686b3219f4fb");
        builder.with(request -> {
            request.setMethod("PATCH");
            return request;
        });

        mockMvc.perform(builder
                        .file(fields)
                        .characterEncoding("UTF-8")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("status").value("ENVIADO"));
    }

    @Test
    public void deveEditarStatusUmLancamentoComIdInvalido() throws Exception {
        String token = tokenService.gerarToken(new UsuarioLoginDTO("capak69333@iucake.com", "1234"));
        MockMultipartFile fields = new MockMultipartFile("fields", "", "application/json", "{ \"status\": \"ENVIADO\" }".getBytes());
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();

        MockMultipartHttpServletRequestBuilder builder =
                MockMvcRequestBuilders.multipart("/api/lancamentos/aaabbc12");
        builder.with(request -> {
            request.setMethod("PATCH");
            return request;
        });

        mockMvc.perform(builder
                        .file(fields)
                        .characterEncoding("UTF-8")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("message").value("Lançamento não encontrado"));
    }

    @Test
    public void deveEditarDeletarUmLancamentoComIdValido() throws Exception {
        String token = tokenService.gerarToken(new UsuarioLoginDTO("capak69333@iucake.com", "1234"));
        mockMvc.perform(delete("/api/lancamentos/63ff97275126326911fee7aa")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("message").value("Lançamento deletado com sucesso!"));
    }

    @Test
    public void deveEditarDeletarUmLancamentoComIdInvalido() throws Exception {
        String token = tokenService.gerarToken(new UsuarioLoginDTO("capak69333@iucake.com", "1234"));
        mockMvc.perform(delete("/api/lancamentos/aabbcc")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("message").value("Lançamento não encontrado"));
    }
}

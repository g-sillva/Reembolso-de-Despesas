package com.fss.reembolso.usuario;

import com.fss.reembolso.lancamento.Lancamento;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;
import java.util.List;

@Document(value = "usuarios")
@Data
@AllArgsConstructor
public class Usuario {

    @Id
    private String id;

    @Valid
    @NotBlank(message = "Nome não pode estar vazio")
    private String nome;

    @Valid
    @NotBlank(message = "Email não pode estar vazio")
    @Indexed(unique = true)
    private String email;

    @CreatedDate
    private LocalDate dataCadastro;

    @Valid
    @NotBlank(message = "Telefone não pode estar vazio")
    @Pattern(regexp = "^[0-9]*$", message = "Telefone inválido")
    private String telefone;
    private List<Role> roles;

    @DBRef
    private List<Lancamento> lancamentos;
    private boolean ativo;

    @Valid
    @NotNull(message = "Senha não pode estar vazia")
    private String senha;
}

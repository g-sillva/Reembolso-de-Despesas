package com.fss.reembolso.usuario;

import com.fss.reembolso.lancamento.Lancamento;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Document(value = "usuarios")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Usuario {

    @Id
    private String id;

    @NotBlank(message = "O nome não pode estar vazio")
    private String nome;

    @NotBlank(message = "O e-mail não pode estar vazio")
    @Indexed(unique = true)
    private String email;

    @CreatedDate
    private LocalDate dataCadastro;

    @NotBlank(message = "O telefone não pode estar vazio")
    @Pattern(regexp = "^[0-9]*$", message = "Telefone inválido")
    private String telefone;
    private List<Role> roles;

    @DBRef
    private List<Lancamento> lancamentos;
    private boolean ativo;

    @NotBlank(message = "A senha não pode estar vazia")
    private String senha;

}

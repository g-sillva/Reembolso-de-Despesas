package com.fss.reembolso.notificacao;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document("notificacoes")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Notificacao {

    @Id
    private String id;

    @NotBlank(message = "O título não pode estar vazio.")
    private String titulo;

    @CreatedDate
    private LocalDate data;

    private boolean visto;

    @NotBlank(message = "A mensagem não pode estar vazia.")
    private String msg;

    @NotBlank(message = "O usuário não pode estar vazio.")
    private String usuarioId;

}

package com.fss.reembolso.lancamento;

import com.fss.reembolso.lancamento.Enums.Categoria;
import com.fss.reembolso.lancamento.Enums.Status;
import com.fss.reembolso.usuario.Usuario;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.Binary;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDate;

@Document("lancamentos")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Lancamento {

    @Id
    private String id;

    @NotBlank(message = "O título não pode estar vazio")
    private String titulo;

    private String descricao;
    private Status status = Status.EM_RASCUNHO;

    @CreatedDate
    private LocalDate data;

    private Categoria categoria;

    @NotNull(message = "O valor não pode estar vazio")
    private Long valor;

    @NotBlank(message = "O usuário não pode estar vazio")
    private String usuarioId;

    private Binary img;
}

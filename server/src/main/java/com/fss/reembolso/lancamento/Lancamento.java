package com.fss.reembolso.lancamento;

import com.fss.reembolso.usuario.Usuario;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.bson.types.Binary;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document("lancamentos")
@Data
@AllArgsConstructor
public class Lancamento {

    @Id
    private String id;

    @NotBlank(message = "O título não pode estar vazio")
    private String titulo;
    private String descricao;
    private Status status = Status.EM_RASCUNHO;

    @CreatedDate
    private LocalDate data;

    @NotBlank(message = "A categoria não pode estar vazio")
    private Categoria categoria;

    @DBRef
    private Usuario usuario;

    @NotBlank(message = "A imagem não pode estar vazia")
    private Binary img;
}

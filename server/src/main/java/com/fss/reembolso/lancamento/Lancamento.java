package com.fss.reembolso.lancamento;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("lancamentos")
@Data
@AllArgsConstructor
public class Lancamento {

    @Id
    private String id;

    private String titulo;
}

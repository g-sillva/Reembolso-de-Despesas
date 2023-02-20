package com.fss.reembolso.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ApiRequestException {

    private final String message;
}

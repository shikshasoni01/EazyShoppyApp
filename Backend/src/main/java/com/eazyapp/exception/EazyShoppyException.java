package com.eazyapp.exception;

public class EazyShoppyException extends  RuntimeException{
    private final int errCode;
    public EazyShoppyException(String message, int errCode) {
        super(message);
        this.errCode = errCode;
    }
}

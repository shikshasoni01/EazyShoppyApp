package com.eazyapp.formatter;

import com.eazyapp.exception.EazyShoppyException;
import org.json.simple.JSONObject;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

public class ResponseFormatter extends ResponseEntityExceptionHandler {
    private ResponseFormatter(){}

    public static JSONObject formatter(String status, int code, String msg, Object data) throws EazyShoppyException {

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("message", msg);
        jsonObject.put("data", data);
        jsonObject.put("status", status);
        jsonObject.put("code", code);
        return jsonObject;
    }

    public static JSONObject formatter(String status, int code, String msg) throws EazyShoppyException {

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("message", msg);
        jsonObject.put("data", new JSONObject());
        jsonObject.put("status", status);
        jsonObject.put("code", code);
        return jsonObject;
    }





}


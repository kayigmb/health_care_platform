package org.health.utils;

import io.smallrye.common.constraint.NotNull;
import jakarta.ws.rs.core.Response;

import java.util.LinkedHashMap;
import java.util.Map;

public class ResponseBuilder {
    private ResponseBuilder() {
    }

    public static <T> Response success(Response.Status status, String message, T data) {
        return Response.status(status)
                .entity(ResponseBuilder.responseBody(false, message, data))
                .build();
    }

    public static <T> Response success(String message, T data) {
        return Response.status(Response.Status.OK)
                .entity(ResponseBuilder.responseBody(false, message, data))
                .build();
    }

    public static Response error(Response.Status status, String message) {
        return Response.status(status).entity(ResponseBuilder.responseBody(true, message)).build();
    }

    public static Response error(String message) {
        return Response.status(Response.Status.BAD_REQUEST)
                .entity(ResponseBuilder.responseBody(true, message))
                .build();
    }

    public static @NotNull Map<String, Object> responseBody(Boolean error, String message) {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("status", Boolean.TRUE.equals(error) ? "error" : "success");
        response.put("message", message);
        return response;
    }

    public static @NotNull Map<String, Object> responseBody(
            Boolean error, String message, Object data) {
        Map<String, Object> response = responseBody(error, message);
        response.put("data", data);
        return response;
    }
}

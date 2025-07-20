package org.health.utils;

import jakarta.ws.rs.core.Response;

import java.util.function.Supplier;

public class SafeExecutor {
    private SafeExecutor() {
    }

    public static Response execute(Supplier<Response> action) {
        try {
            return action.get();
        } catch (Exception e) {
            return ResponseBuilder.error(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal Server Error" + e.getMessage());
        }
    }
}

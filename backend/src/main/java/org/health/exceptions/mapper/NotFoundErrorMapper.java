package org.health.exceptions.mapper;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import org.health.exceptions.NotFoundError;
import org.health.utils.ResponseBuilder;

@Provider
public class NotFoundErrorMapper implements ExceptionMapper<NotFoundError> {
    @Override
    public Response toResponse(NotFoundError exception) {
        return ResponseBuilder.error(Response.Status.NOT_FOUND, exception.getMessage());
    }
}

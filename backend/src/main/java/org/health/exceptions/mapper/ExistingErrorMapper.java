package org.health.exceptions.mapper;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import org.health.exceptions.ExistingError;
import org.health.utils.ResponseBuilder;

@Provider
public class ExistingErrorMapper implements ExceptionMapper<ExistingError> {
    @Override
    public Response toResponse(ExistingError exception) {
        return ResponseBuilder.error(Response.Status.CONFLICT, exception.getMessage());
    }
}

package org.health.resources;

import jakarta.inject.Inject;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;
import org.health.dtos.request.LoginRequestDTO;
import org.health.dtos.request.RegisterUserRequestDTO;
import org.health.services.AuthenticationServices;
import org.health.utils.ResponseBuilder;

@Path("/auth")
public class AuthenticationResources {

    private final AuthenticationServices authenticationServices;

    @Inject
    public AuthenticationResources(AuthenticationServices authenticationServices) {
        this.authenticationServices = authenticationServices;
    }

    @Path("/register")
    @POST
    public Response register(RegisterUserRequestDTO request) {
        try {
            return authenticationServices.registerUser(request);
        } catch (Exception e) {
            return ResponseBuilder.error(Response.Status.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @Path("/login")
    @POST
    public Response login(LoginRequestDTO request) {
        try {
            return authenticationServices.loginService(request);
        } catch (Exception e) {
            return ResponseBuilder.error(Response.Status.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

}

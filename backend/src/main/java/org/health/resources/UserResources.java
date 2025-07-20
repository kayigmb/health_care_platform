package org.health.resources;

import io.quarkus.security.Authenticated;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.health.services.UsersServices;

import java.util.UUID;

@Path("/users")
@Produces(MediaType.APPLICATION_JSON)
@Authenticated
public class UserResources {

    private final UsersServices usersServices;
    private final JsonWebToken jwt;

    @Inject
    public UserResources(UsersServices usersServices, JsonWebToken jwt) {
        this.usersServices = usersServices;
        this.jwt = jwt;
    }

    @GET
    public Response getAllUsers() {
        return usersServices.getAllUsers();
    }

    @GET
    @Path("/{id}")
    public Response getUserById(@PathParam("id") UUID id) {
        return usersServices.getUserById(id);
    }

    @GET
    @Path("/me")
    @RolesAllowed({"user", "admin", "doctor"})
    public Response getCurrentUser() {
        return usersServices.getCurrentUser(UUID.fromString(jwt.getName()));
    }

}

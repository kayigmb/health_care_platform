package org.health.resources;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.health.repositories.UsersRepository;
import org.health.services.UsersServices;

import java.util.UUID;

@Path("/users")
@Produces(MediaType.APPLICATION_JSON)
public class UserResources {

    private final UsersServices usersServices;

    @Inject
    public UserResources(UsersRepository usersRepository, UsersServices usersServices) {
        this.usersServices = usersServices;
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
    public Response getCurrentUser() {
        // will wait for the implementation of the authentication service
        return null;
    }

}

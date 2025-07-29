package org.health.resources;

import io.quarkus.security.Authenticated;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.health.exceptions.NotFoundError;
import org.health.services.UsersServices;
import org.health.utils.ResponseBuilder;

import java.util.UUID;

@Path("/users")
@Produces(MediaType.APPLICATION_JSON)
@Authenticated
public class UserResources {

    private final UsersServices usersServices;
    private final JsonWebToken jwt;

    @Inject
    public UserResources(UsersServices usersServices,
                         JsonWebToken jwt) {
        this.usersServices = usersServices;
        this.jwt = jwt;
    }

    @GET
    public Response getAllUsers(
            @QueryParam("role") String role
    ) {
        return usersServices.getAllUsers(role);
    }

    @GET
    @Path("/{id}")
    public Response getUserById(@PathParam("id") UUID id) {
        try {
            return usersServices.getUserById(id);
        } catch (Exception e) {
            return ResponseBuilder.error(Response.Status.INTERNAL_SERVER_ERROR,
                    e.getMessage());
        }
    }

    @GET
    @Path("/me")
    @RolesAllowed({"user", "admin", "doctor"})
    public Response getCurrentUser() {
        try {
            return usersServices.getCurrentUser(UUID.fromString(jwt.getName()));
        } catch (Exception e) {
            return ResponseBuilder.error(Response.Status.INTERNAL_SERVER_ERROR,
                    e.getMessage());
        }
    }


    @GET
    @Path("{id}/appointments")
    public Response getUserAppointments(@PathParam("id") UUID id) {
        try {
            return ResponseBuilder.success("Appointments retrieved successfully",
                    usersServices.getUserAppointments(id));
        } catch (NotFoundError e) {
            return ResponseBuilder.error(Response.Status.NOT_FOUND, e.getMessage());
        } catch (Exception e) {
            return ResponseBuilder.error(Response.Status.INTERNAL_SERVER_ERROR,
                    e.getMessage());
        }
    }

    @GET
    @Path("/me/appointments")
    @RolesAllowed({"user", "admin", "doctor"})
    public Response getCurrentUserAppointments() {
        try {
            return ResponseBuilder.success("Appointments retrieved successfully",
                    usersServices.getUserAppointments(UUID.fromString(jwt.getName())));
        } catch (NotFoundError e) {
            return ResponseBuilder.error(Response.Status.NOT_FOUND, e.getMessage());
        } catch (Exception e) {
            return ResponseBuilder.error(Response.Status.INTERNAL_SERVER_ERROR,
                    e.getMessage());
        }
    }

    @GET
    @Path("/me/records")
    @RolesAllowed({"user", "admin", "doctor"})
    public Response getCurrentUserRecords() {
        try {
            return ResponseBuilder.success("Records retrieved successfully",
                    usersServices.getUserRecords(UUID.fromString(jwt.getName())));
        } catch (NotFoundError e) {
            return ResponseBuilder.error(Response.Status.NOT_FOUND, e.getMessage());
        } catch (Exception e) {
            return ResponseBuilder.error(Response.Status.INTERNAL_SERVER_ERROR,
                    e.getMessage());
        }
    }

    @GET
    @Path("/{id}/records")
    @RolesAllowed({"user", "admin", "doctor"})
    public Response getUserRecords(@PathParam("id") UUID id) {
        try {
            return ResponseBuilder.success("Records retrieved successfully",
                    usersServices.getUserRecords(id));
        } catch (NotFoundError e) {
            return ResponseBuilder.error(Response.Status.NOT_FOUND, e.getMessage());
        } catch (Exception e) {
            return ResponseBuilder.error(Response.Status.INTERNAL_SERVER_ERROR,
                    e.getMessage());
        }
    }
}

package org.health.services;

import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.health.utils.ResponseBuilder;

import java.util.UUID;

import static org.health.utils.SafeExecutor.execute;

@Path("/roles")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@RolesAllowed({"admin"})
public class RoleResources {
    private final RolesServices rolesServices;

    @Inject
    public RoleResources(RolesServices rolesServices) {
        this.rolesServices = rolesServices;
    }

    @GET
    public Response getAllRoles() {
        return ResponseBuilder.success("Roles retrieved successfully", rolesServices.getAllRoles());
    }

    @GET
    @Path("/{id}")
    @RolesAllowed({"admin"})
    public Response getRoleById(@PathParam("id") UUID id) {
        return execute(() -> rolesServices.getRoleById(id));
    }
}

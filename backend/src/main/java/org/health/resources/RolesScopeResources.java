package org.health.resources;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.health.dtos.request.RolesScopeRequest;
import org.health.services.RolesScopeServices;
import org.health.utils.ResponseBuilder;

import java.util.UUID;

@Path("/roles-scope")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RolesScopeResources {

    private final RolesScopeServices rolesScopeServices;

    @Inject
    public RolesScopeResources(RolesScopeServices rolesScopeServices) {
        this.rolesScopeServices = rolesScopeServices;
    }

    @GET
    public Response getRolesScope() {
        return rolesScopeServices.getAllRolesScope();
    }

    @GET
    @Path("/{id}")
    public Response getRolesScopeById(@PathParam("id") UUID id) {
        return rolesScopeServices.getRolesScopeById(id);
    }

    @POST
    public Response assignRolesScope(RolesScopeRequest rolesScopeRequest) {
        try {
            return rolesScopeServices.assignRolesScope(rolesScopeRequest);
        } catch (RuntimeException e) {
            return ResponseBuilder.error(Response.Status.NOT_FOUND, e.getMessage());
        }
    }

    @DELETE
    @Path("/{id}")
    public Response deleteRolesScope(@PathParam("id") UUID id) {
        return rolesScopeServices.deleteRolesScope(id);
    }
}

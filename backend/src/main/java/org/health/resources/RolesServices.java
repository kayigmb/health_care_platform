package org.health.resources;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import org.health.dtos.mappers.RolesMapper;
import org.health.entities.RolesEntity;
import org.health.repositories.RolesRepository;
import org.health.utils.ResponseBuilder;

import java.util.UUID;

@ApplicationScoped
public class RolesServices {
    private final RolesRepository rolesRepository;

    @Inject
    public RolesServices(RolesRepository rolesRepository) {
        this.rolesRepository = rolesRepository;
    }

    public Response getAllRoles() {
        return ResponseBuilder.success("Roles retrieved successfully",
                rolesRepository.findAll().stream().map(RolesMapper::toDto).toList());
    }

    public Response getRoleById(UUID id) {
        RolesEntity role = rolesRepository.findById(id);
        if (role == null) {
            return ResponseBuilder.error(Response.Status.NOT_FOUND, "Role not found with the provided ID.");
        }
        return ResponseBuilder.success("Role retrieved successfully", RolesMapper.toDto(role));
    }
}

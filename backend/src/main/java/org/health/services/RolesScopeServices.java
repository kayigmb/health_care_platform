package org.health.services;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.core.Response;
import org.health.dtos.mappers.RolesScopeMapper;
import org.health.dtos.request.RolesScopeRequest;
import org.health.entities.RolesScopeEntity;
import org.health.exceptions.ExistingError;
import org.health.exceptions.NotFoundError;
import org.health.repositories.RolesScopesRepository;
import org.health.utils.ResponseBuilder;

import java.util.Optional;
import java.util.UUID;

@ApplicationScoped
public class RolesScopeServices {
    @Inject
    RolesScopesRepository rolesScopeRepository;

    public Response getAllRolesScope() {
        return ResponseBuilder.success("Roles scope retrieved successfully",
                rolesScopeRepository.findAll().stream().map(RolesScopeMapper::toDto).toList());
    }

    public Response getRolesScopeById(UUID id) {
        RolesScopeEntity rolesScope = rolesScopeRepository.findById(id);
        if (rolesScope == null) {
            throw new NotFoundError("Role scope not found with the provided ID.");
        }
        return ResponseBuilder.success("Role scope retrieved successfully", RolesScopeMapper.toDto(rolesScope));
    }

    @Transactional
    public Response assignRolesScope(RolesScopeRequest rolesScopeRequest) {
        Optional<RolesScopeEntity> existingRole = rolesScopeRepository.findByUserByRequest(rolesScopeRequest);
        if (existingRole.isPresent()) {
            throw new ExistingError("Role already assigned to the user.");
        }
        // should check if the various imput fields are valid, e.g., userId, roleId, hospitalId, etc.
        RolesScopeEntity rolesScopeEntity = RolesScopeMapper.toEntity(rolesScopeRequest);
        rolesScopeRepository.persist(rolesScopeEntity);
        return ResponseBuilder.success("RolesScope assigned successfully",
                RolesScopeMapper.toDto(rolesScopeEntity));
    }

    @Transactional
    public Response deleteRolesScope(UUID id) {
        RolesScopeEntity rolesScope = rolesScopeRepository.findById(id);
        if (rolesScope == null) {
            throw new NotFoundError("Role scope not found with the provided ID.");
        }
        rolesScopeRepository.delete(rolesScope);
        return ResponseBuilder.success("Role scope deleted successfully", null);
    }
}

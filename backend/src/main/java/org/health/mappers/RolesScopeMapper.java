package org.health.mappers;

import org.health.dtos.RolesScopeDto;
import org.health.entities.RolesScopeEntity;

public class RolesScopeMapper {
    public static RolesScopeDto toDto(RolesScopeEntity entity) {
        return new RolesScopeDto(
                entity.getId(),
                entity.getUser().getId(),
                entity.getRole().getId(),
                entity.getHospital() != null ? entity.getHospital().getId() : null,
                entity.getDeleted(),
                entity.getCreatedAt(),
                entity.getUpdatedAt()
        );
    }
}


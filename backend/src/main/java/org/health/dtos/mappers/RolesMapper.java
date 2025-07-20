package org.health.dtos.mappers;

import org.health.dtos.RolesDto;
import org.health.entities.RolesEntity;

public class RolesMapper {
    public static RolesDto toDto(RolesEntity entity) {
        return new RolesDto(
                entity.getId(),
                entity.getName(),
                entity.getDeleted(),
                entity.getCreatedAt(),
                entity.getUpdatedAt()
        );
    }
}


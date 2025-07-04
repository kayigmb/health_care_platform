package org.health.dtos;

import java.time.ZonedDateTime;
import java.util.UUID;

public record RolesScopeDto(
        UUID id,
        UUID userId,
        UUID roleId,
        UUID hospitalId,
        Boolean isDeleted,
        ZonedDateTime createdAt,
        ZonedDateTime updatedAt
) {
}
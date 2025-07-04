package org.health.dtos;

import java.time.ZonedDateTime;
import java.util.UUID;

public record RolesDto(
        UUID id,
        String name,
        Boolean isDeleted,
        ZonedDateTime createdAt,
        ZonedDateTime updatedAt
) {
}


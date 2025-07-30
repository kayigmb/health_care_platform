package org.health.dtos;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

public record HospitalMoreDTO(
        UUID id,
        String name,
        String address,
        String phoneNumber,
        Boolean isDeleted,
        ZonedDateTime createdAt,
        ZonedDateTime updatedAt,
        List<RolesScopeDto> rolesScopes
) {
}

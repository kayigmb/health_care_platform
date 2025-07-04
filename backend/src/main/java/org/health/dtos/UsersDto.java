package org.health.dtos;

import java.time.ZonedDateTime;
import java.util.UUID;

public record UsersDto(
        UUID id,
        String firstName,
        String lastName,
        String email,
        String phone,
        String userSystemId,
        Boolean isDeleted,
        ZonedDateTime createdAt,
        ZonedDateTime updatedAt
) {
}
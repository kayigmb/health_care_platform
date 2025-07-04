package org.health.dtos;

import java.time.ZonedDateTime;
import java.util.UUID;

public record HospitalDto(
        UUID id,
        String name,
        String address,
        String phoneNumber,
        Boolean isDeleted,
        ZonedDateTime createdAt,
        ZonedDateTime updatedAt
) {
}

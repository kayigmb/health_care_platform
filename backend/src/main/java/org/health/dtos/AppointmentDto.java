package org.health.dtos;

import java.time.ZonedDateTime;
import java.util.UUID;

public record AppointmentDto(
        UUID id,
        UUID patientId,
        UUID doctorId,
        UUID hospitalId,
        String status,
        String service,
        Boolean isDeleted,
        ZonedDateTime createdAt,
        ZonedDateTime updatedAt
) {
}
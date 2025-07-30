package org.health.dtos;

import java.time.ZonedDateTime;
import java.util.UUID;

public record AppointmentDto(
        UUID id,
        UUID patientId,
        UUID doctorId,
        UUID hospitalId,
        ZonedDateTime appointmentDate,
        String status,
        String service,
        Boolean isDeleted,
        ZonedDateTime createdAt,
        ZonedDateTime updatedAt,
        UsersDto patient,
        UsersDto doctor,
        HospitalDto hospital
) {
}
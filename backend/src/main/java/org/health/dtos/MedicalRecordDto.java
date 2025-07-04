package org.health.dtos;

import java.time.ZonedDateTime;
import java.util.UUID;

public record MedicalRecordDto(
        UUID id,
        UUID patientId,
        UUID doctorId,
        UUID hospitalId,
        String diagnosis,
        String treatmentPlan,
        String notes,
        Boolean isDeleted,
        ZonedDateTime createdAt,
        ZonedDateTime updatedAt
) {
}
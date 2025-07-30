package org.health.dtos;

import java.time.ZonedDateTime;
import java.util.UUID;

public record MedicalRecordsResponseDTO(
        UUID id,
        UUID patientId,
        UUID doctorId,
        UUID hospitalId,
        String diagnosis,
        String treatment,
        String notes,
        String medicalDocumentsName,
        String medicalDocumentsType,
        UsersDto patient,
        UsersDto doctor,
        HospitalDto hospital,
        ZonedDateTime createdAt
) {
}

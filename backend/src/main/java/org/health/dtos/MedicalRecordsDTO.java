package org.health.dtos;

import java.util.UUID;

public record MedicalRecordsDTO(
        UUID id,
        UUID patientId,
        UUID doctorId,
        UUID hospitalId,
        String diagnosis,
        String treatment,
        String notes,
        String medicalDocumentsName,
        String medicalDocumentsType
) {
}


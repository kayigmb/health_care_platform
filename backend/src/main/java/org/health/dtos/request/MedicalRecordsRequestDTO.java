package org.health.dtos.request;

import java.util.Optional;
import java.util.UUID;

public record MedicalRecordsRequestDTO(
        UUID patientId,
        UUID doctorId,
        UUID hospitalId,
        String diagnosis,
        String treatment,
        String notes,
        Optional<String> medicalDocumentsName,
        Optional<byte[]> medicalDocumentsContent,
        Optional<String> medicalDocumentsType
) {

}

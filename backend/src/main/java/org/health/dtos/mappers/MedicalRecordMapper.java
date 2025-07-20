package org.health.dtos.mappers;

import org.health.dtos.MedicalRecordDto;
import org.health.entities.MedicalRecordsEntity;

public class MedicalRecordMapper {
    public static MedicalRecordDto toDto(MedicalRecordsEntity entity) {
        return new MedicalRecordDto(
                entity.getId(),
                entity.getRecords_patient().getId(),
                entity.getRecords_doctor() != null ? entity.getRecords_doctor().getId() : null,
                entity.getHospital() != null ? entity.getHospital().getId() : null,
                entity.getDiagnosis(),
                entity.getTreatmentPlan(),
                entity.getNotes(),
                entity.getDeleted(),
                entity.getCreatedAt(),
                entity.getUpdatedAt()
        );
    }
}

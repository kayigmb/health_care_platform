package org.health.dtos.mappers;

import org.health.dtos.MedicalRecordsDTO;
import org.health.dtos.MedicalRecordsResponseDTO;
import org.health.entities.MedicalRecordsEntity;

public class MedicalRecordsMapper {
    private MedicalRecordsMapper() {
    }

    public static MedicalRecordsDTO toDto(MedicalRecordsEntity entity) {
        return new MedicalRecordsDTO(
                entity.getId(),
                entity.getRecords_patient().getId(),
                entity.getRecords_doctor().getId(),
                entity.getHospital().getId(),
                entity.getDiagnosis(),
                entity.getTreatmentPlan(),
                entity.getNotes(),
                entity.getMedicalDocumentsName(),
                entity.getMedicalDocumentsType()
        );
    }

    public static MedicalRecordsResponseDTO toFullDto(MedicalRecordsEntity entity) {
        return new MedicalRecordsResponseDTO(
                entity.getId(),
                entity.getRecords_patient().getId(),
                entity.getRecords_doctor().getId(),
                entity.getHospital().getId(),
                entity.getDiagnosis(),
                entity.getTreatmentPlan(),
                entity.getNotes(),
                entity.getMedicalDocumentsName(),
                entity.getMedicalDocumentsType(),
                UsersMapper.toDto(entity.getRecords_patient()),
                UsersMapper.toDto(entity.getRecords_doctor()),
                HospitalMapper.toDto(entity.getHospital()),
                entity.getCreatedAt()
        );
    }
}

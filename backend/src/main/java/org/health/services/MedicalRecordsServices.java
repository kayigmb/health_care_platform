package org.health.services;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.core.Response;
import org.health.dtos.MedicalRecordsDTO;
import org.health.dtos.MedicalRecordsResponseDTO;
import org.health.dtos.mappers.MedicalRecordsMapper;
import org.health.dtos.request.MedicalRecordsRequestDTO;
import org.health.entities.HospitalsEntity;
import org.health.entities.MedicalRecordsEntity;
import org.health.entities.UsersEntity;
import org.health.exceptions.NotFoundError;
import org.health.repositories.HospitalsRepository;
import org.health.repositories.MedicalRecordsRepository;
import org.health.repositories.UsersRepository;
import org.health.utils.ServeFiles;

import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class MedicalRecordsServices {
    private final MedicalRecordsRepository medicalRecordsRepository;
    private final UsersRepository usersRepository;
    private final HospitalsRepository hospitalsRepository;

    @Inject
    public MedicalRecordsServices(MedicalRecordsRepository medicalRecordsRepository, UsersRepository usersRepository, HospitalsRepository hospitalsRepository) {
        this.medicalRecordsRepository = medicalRecordsRepository;
        this.usersRepository = usersRepository;
        this.hospitalsRepository = hospitalsRepository;
    }

    public List<MedicalRecordsResponseDTO> getMedicalRecords() {
        return medicalRecordsRepository.findAll().stream().map(MedicalRecordsMapper::toFullDto).toList();
    }

    public MedicalRecordsResponseDTO getMedicalRecordById(UUID id) throws NotFoundError {
        MedicalRecordsEntity existingRecord = medicalRecordsRepository.findById(id);
        if (existingRecord == null) {
            throw new NotFoundError("Medical record not found with the provided ID.");
        }
        return MedicalRecordsMapper.toFullDto(existingRecord);
    }

    @Transactional
    public MedicalRecordsDTO createMedicalRecord(MedicalRecordsRequestDTO medicalRecordsDTO) {
        UsersEntity existingPatient = usersRepository.findByField("id", medicalRecordsDTO.patientId());
        if (existingPatient == null) {
            throw new NotFoundError("Patient not found with the provided ID.");
        }

        UsersEntity existingDoctor = usersRepository.findByField("id", medicalRecordsDTO.doctorId());
        if (existingDoctor == null) {
            throw new NotFoundError("Doctor not found with the provided ID.");
        }

        HospitalsEntity existingHospital = hospitalsRepository.findById(medicalRecordsDTO.hospitalId());
        if (existingHospital == null) {
            throw new NotFoundError("Hospital not found with the provided ID.");
        }
        MedicalRecordsEntity medical = new MedicalRecordsEntity();
        medical.setRecords_patient(existingPatient);
        medical.setRecords_doctor(existingDoctor);
        medical.setHospital(existingHospital);
        medical.setDiagnosis(medicalRecordsDTO.diagnosis());
        medical.setTreatmentPlan(medicalRecordsDTO.treatment());
        medical.setNotes(medicalRecordsDTO.notes());
        medical.setMedicalDocumentsName(medicalRecordsDTO.medicalDocumentsName().orElse(null));
        medical.setMedicalDocumentsContent(medicalRecordsDTO.medicalDocumentsContent().orElse(null));
        medical.setMedicalDocumentsType(medicalRecordsDTO.medicalDocumentsType().orElse(null));
        medicalRecordsRepository.persist(medical);
        return MedicalRecordsMapper.toDto(medical);
    }

    public Response downloadMedicalDocument(UUID id) throws NotFoundError {
        MedicalRecordsEntity medicalRecord = medicalRecordsRepository.findById(id);
        if (medicalRecord == null) {
            throw new NotFoundError("Medical record or document not found with the provided ID.");
        }
        return ServeFiles.serveFile(medicalRecord, "attachment");
    }

    public Response previewMedicalDocument(UUID id) throws NotFoundError {
        MedicalRecordsEntity medicalRecord = medicalRecordsRepository.findById(id);
        if (medicalRecord == null) {
            throw new NotFoundError("Medical record or document not found with the provided ID.");
        }
        return ServeFiles.serveFile(medicalRecord, "inline");
    }

    @Transactional
    public MedicalRecordsDTO updateMedicalRecord(UUID id, MedicalRecordsRequestDTO medicalRecordsDTO) throws NotFoundError {
        MedicalRecordsEntity existingRecord = medicalRecordsRepository.findById(id);
        if (existingRecord == null) {
            throw new NotFoundError("Medical record not found with the provided ID.");
        }

        UsersEntity existingPatient = usersRepository.findByField("id", medicalRecordsDTO.patientId());
        if (existingPatient == null) {
            throw new NotFoundError("Patient not found with the provided ID.");
        }
        existingRecord.setRecords_patient(existingPatient);

        UsersEntity existingDoctor = usersRepository.findByField("id", medicalRecordsDTO.doctorId());
        if (existingDoctor == null) {
            throw new NotFoundError("Doctor not found with the provided ID.");
        }
        existingRecord.setRecords_doctor(existingDoctor);

        HospitalsEntity existingHospital = hospitalsRepository.findById(medicalRecordsDTO.hospitalId());
        if (existingHospital == null) {
            throw new NotFoundError("Hospital not found with the provided ID.");
        }
        existingRecord.setHospital(existingHospital);

        existingRecord.setDiagnosis(medicalRecordsDTO.diagnosis());
        existingRecord.setTreatmentPlan(medicalRecordsDTO.treatment());
        existingRecord.setNotes(medicalRecordsDTO.notes());
        existingRecord.setMedicalDocumentsName(medicalRecordsDTO.medicalDocumentsName().orElse(null));
        existingRecord.setMedicalDocumentsContent(medicalRecordsDTO.medicalDocumentsContent().orElse(null));
        existingRecord.setMedicalDocumentsType(medicalRecordsDTO.medicalDocumentsType().orElse(null));

        return MedicalRecordsMapper.toDto(existingRecord);
    }

    @Transactional
    public MedicalRecordsDTO deleteMedicalRecord(UUID id) throws NotFoundError {
        MedicalRecordsEntity existingRecord = medicalRecordsRepository.findById(id);
        if (existingRecord == null) {
            throw new NotFoundError("Medical record not found with the provided ID.");
        }
        medicalRecordsRepository.delete(existingRecord);
        return MedicalRecordsMapper.toDto(existingRecord);
    }
}

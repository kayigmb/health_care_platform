package org.health.dtos.mappers;

import org.health.dtos.AppointmentDto;
import org.health.dtos.request.AppointmentRequestDTO;
import org.health.entities.AppointmentsEntity;
import org.health.entities.HospitalsEntity;
import org.health.entities.UsersEntity;

public class AppointmentsMapper {
    private AppointmentsMapper() {
    }

    public static AppointmentsEntity toEntity(AppointmentRequestDTO dto) {
        AppointmentsEntity entity = new AppointmentsEntity();
        // Add patient
        UsersEntity patient = new UsersEntity();
        patient.setId(dto.patientId());
        entity.setApp_patient(patient);
        // Add doctor
        UsersEntity doctor = new UsersEntity();
        doctor.setId(dto.doctorId());
        entity.setApp_doctor(doctor);
        // Add hospital
        HospitalsEntity hospital = new HospitalsEntity();
        hospital.setId(dto.hospitalId());
        entity.setHospital(hospital);
        // Set other fields
        entity.setAppointmentDate(dto.appointmentDate());
        entity.setService(dto.service());
        entity.setReason(dto.reason());
        return entity;
    }

    public static AppointmentDto toDto(AppointmentsEntity entity) {
        return new AppointmentDto(
                entity.getId(),
                entity.getApp_patient().getId(),
                entity.getApp_doctor() != null ? entity.getApp_doctor().getId() : null,
                entity.getHospital() != null ? entity.getHospital().getId() : null,
                entity.getAppointmentDate(),
                entity.getStatus(),
                entity.getService(),
                entity.getDeleted(),
                entity.getCreatedAt(),
                entity.getUpdatedAt(),
                UsersMapper.toDto(entity.getApp_patient()),
                UsersMapper.toDto(entity.getApp_doctor()),
                HospitalMapper.toDto(entity.getHospital())
        );
    }
}


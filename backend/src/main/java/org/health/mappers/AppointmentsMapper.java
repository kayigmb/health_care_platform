package org.health.mappers;

import org.health.dtos.AppointmentDto;
import org.health.entities.AppointmentsEntity;

public class AppointmentsMapper {
    public static AppointmentDto toDto(AppointmentsEntity entity) {
        return new AppointmentDto(
                entity.getId(),
                entity.getApp_patient().getId(),
                entity.getApp_doctor() != null ? entity.getApp_doctor().getId() : null,
                entity.getHospital() != null ? entity.getHospital().getId() : null,
                entity.getStatus(),
                entity.getService(),
                entity.getDeleted(),
                entity.getCreatedAt(),
                entity.getUpdatedAt()
        );
    }
}


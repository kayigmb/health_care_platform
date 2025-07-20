package org.health.dtos.mappers;

import org.health.dtos.HospitalDto;
import org.health.entities.HospitalsEntity;

public class HospitalMapper {
    public static HospitalDto toDto(HospitalsEntity entity) {
        return new HospitalDto(
                entity.getId(),
                entity.getName(),
                entity.getAddress(),
                entity.getPhoneNumber(),
                entity.getDeleted(),
                entity.getCreatedAt(),
                entity.getUpdatedAt()
        );
    }
}

package org.health.dtos.mappers;

import org.health.dtos.HospitalDto;
import org.health.dtos.HospitalMoreDTO;
import org.health.entities.HospitalsEntity;

public class HospitalMapper {
    private HospitalMapper() {
    }

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

    public static HospitalMoreDTO toMoreDTO(HospitalsEntity entity) {
        return new HospitalMoreDTO(
                entity.getId(),
                entity.getName(),
                entity.getAddress(),
                entity.getPhoneNumber(),
                entity.getDeleted(),
                entity.getCreatedAt(),
                entity.getUpdatedAt(),
                entity.getHospitalRolesScopes().stream().map(RolesScopeMapper::toDto).toList()
        );
    }
}

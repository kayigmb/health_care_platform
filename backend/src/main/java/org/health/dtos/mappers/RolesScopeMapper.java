package org.health.dtos.mappers;

import org.health.dtos.RolesScopeDto;
import org.health.dtos.request.RolesScopeRequest;
import org.health.entities.HospitalsEntity;
import org.health.entities.RolesEntity;
import org.health.entities.RolesScopeEntity;
import org.health.entities.UsersEntity;

public class RolesScopeMapper {
    private RolesScopeMapper() {
    }

    public static RolesScopeEntity toEntity(RolesScopeRequest rolesScopeRequest) {
        RolesScopeEntity rolesScopeEntity = new RolesScopeEntity();
        UsersEntity user = new UsersEntity();
        user.setId(rolesScopeRequest.userId());
        rolesScopeEntity.setUser(user);
        RolesEntity role = new RolesEntity();
        role.setId(rolesScopeRequest.roleId());
        rolesScopeEntity.setRole(role);


        rolesScopeRequest.hospitalId().ifPresent(hospitalId -> {
            HospitalsEntity hospital = new HospitalsEntity();
            hospital.setId(hospitalId);
            rolesScopeEntity.setHospital(hospital);
        });

        return rolesScopeEntity;
    }


    public static RolesScopeDto toDto(RolesScopeEntity entity) {
        return new RolesScopeDto(
                entity.getId(),
                entity.getUser().getId(),
                entity.getRole().getId(),
                entity.getHospital() != null ? entity.getHospital().getId() : null,
                entity.getDeleted(),
                entity.getCreatedAt(),
                entity.getUpdatedAt()
        );
    }
}


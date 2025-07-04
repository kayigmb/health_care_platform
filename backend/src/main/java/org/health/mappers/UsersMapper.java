package org.health.mappers;

import org.health.dtos.UsersDto;
import org.health.entities.UsersEntity;

public class UsersMapper {
    public static UsersDto toDto(UsersEntity user) {
        return new UsersDto(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPhone(),
                user.getUserSystemId(),
                user.getDeleted(),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }
}


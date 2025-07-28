package org.health.dtos.mappers;

import org.health.dtos.UserFullDTO;
import org.health.dtos.UsersDto;
import org.health.dtos.request.RegisterUserRequestDTO;
import org.health.entities.UsersEntity;
import org.health.utils.PasswordHashUtils;

public class UsersMapper {
    private UsersMapper() {
    }

    public static UsersEntity toEntityRegister(RegisterUserRequestDTO userInfo) {
        UsersEntity newUser = new UsersEntity();
        newUser.setFirstName(userInfo.firstName());
        newUser.setLastName(userInfo.lastName());
        newUser.setEmail(userInfo.email());
        newUser.setPhone(userInfo.phone().orElse(null));
        newUser.setPasswordHash(PasswordHashUtils.hashPassword(userInfo.password()));
        return newUser;
    }

    // should add the one to get the full data of the user
    // from the records scopes and others
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

    public static UserFullDTO toFullDto(UsersEntity user) {
        return new UserFullDTO(
                toDto(user),
                user.getRoleScopes().stream().map(role -> role.getRole().getName())
                        .toArray(String[]::new)
        );
    }
}


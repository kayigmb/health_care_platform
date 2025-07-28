package org.health.dtos;

public record UserFullDTO(
        UsersDto user,
        String[] roles
) {
}

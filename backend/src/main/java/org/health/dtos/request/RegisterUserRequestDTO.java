package org.health.dtos.request;

import java.util.Optional;

public record RegisterUserRequestDTO(
        String firstName,
        String lastName,
        String email,
        String password,
        Optional<String> phone) {
}

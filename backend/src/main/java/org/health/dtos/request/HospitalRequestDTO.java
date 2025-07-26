package org.health.dtos.request;

public record HospitalRequestDTO(
        String name,
        String address,
        String phoneNumber
) {
}

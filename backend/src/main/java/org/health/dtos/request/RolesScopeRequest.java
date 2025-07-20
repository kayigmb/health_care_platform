package org.health.dtos.request;

import java.util.Optional;
import java.util.UUID;

public record RolesScopeRequest(
        UUID userId,
        UUID roleId,
        Optional<UUID> hospitalId
) {
}

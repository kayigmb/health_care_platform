package org.health.utils;

import io.smallrye.jwt.build.Jwt;
import org.eclipse.microprofile.config.ConfigProvider;
import org.health.entities.RolesEntity;
import org.health.entities.RolesScopeEntity;
import org.health.entities.UsersEntity;

import java.time.Duration;
import java.time.Instant;
import java.util.Set;
import java.util.stream.Collectors;

public class JwtUtils {
    /**
     * Private constructor to prevent instantiation.
     */
    private static final String ISSUER_VALUE = "mp.jwt.verify.issuer";

    /**
     * Generates a JWT token for the given user.
     *
     * @param user the user for whom the token is to be generated
     * @return a JWT token as a String
     */
    public static String generateToken(UsersEntity user) {
        String issuer = ConfigProvider.getConfig().getValue(ISSUER_VALUE, String.class);
        // Collect the roles from the user's role scopes
        Set<String> groups = user.getRoleScopes().stream()
                .map(RolesScopeEntity::getRole)
                .map(RolesEntity::getName)
                .collect(Collectors.toSet());
        return Jwt.issuer(issuer)
                .upn(user.getId().toString())
                .groups(groups)
                .expiresAt(Instant.now().plus(Duration.ofHours(2)))
                .sign();
    }
}

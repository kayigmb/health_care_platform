package org.health.utils;

import io.smallrye.jwt.build.Jwt;
import org.eclipse.microprofile.config.ConfigProvider;
import org.health.entities.UsersEntity;

import java.time.Duration;
import java.time.Instant;

public class JwtCreatorUtils {
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
        return Jwt.issuer(issuer)
                .upn(user.getId().toString())
//                .groups(user.getRoleScopes().stream().map(RolesScopeEntity::getRole).collect(Collectors.toSet()))
                .expiresAt(Instant.now().plus(Duration.ofHours(2)))
                .sign();
    }
}

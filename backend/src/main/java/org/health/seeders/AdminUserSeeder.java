package org.health.seeders;

import io.quarkus.logging.Log;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.health.entities.RolesEntity;
import org.health.entities.RolesScopeEntity;
import org.health.entities.UsersEntity;
import org.health.enums.RolesEnum;
import org.health.exceptions.NotFoundError;
import org.health.repositories.RolesRepository;
import org.health.repositories.RolesScopesRepository;
import org.health.repositories.UsersRepository;
import org.health.services.AuthenticationServices;
import org.health.utils.PasswordHashUtils;

import java.util.Optional;


@Dependent
public class AdminUserSeeder {
    @Inject
    RolesRepository rolesRepository;

    @Inject
    @ConfigProperty(name = "admin.username")
    String adminUsername;
    @Inject
    @ConfigProperty(name = "admin.password")
    String adminPassword;
    @Inject
    UsersRepository usersRepository;
    @Inject
    AuthenticationServices authenticationServices;
    @Inject
    RolesScopesRepository rolesScopesRepository;

    @Transactional
    public void addAdminUser() {
        Log.info("******************** Adding admin user *********************");
        UsersEntity existingUser = usersRepository.findByField("email", adminUsername);
        if (existingUser != null) {
            Log.info("Admin user already exists: " + adminUsername);
            return;
        }
        UsersEntity newAdminUser = new UsersEntity();
        newAdminUser.setFirstName("Admin");
        newAdminUser.setLastName("User");
        newAdminUser.setEmail(adminUsername);
        newAdminUser.setPasswordHash(PasswordHashUtils.hashPassword(adminPassword));
        usersRepository.persist(newAdminUser);

        // Find the user role from the repository
        Optional<RolesEntity> userRole = rolesRepository.findByName(
                RolesEnum.ADMIN.toString().toLowerCase());
        if (userRole.isEmpty()) {
            throw new NotFoundError("User role not found.");
        }
        RolesScopeEntity newAdminRoleScope = new RolesScopeEntity();
        newAdminRoleScope.setUser(newAdminUser);
        newAdminRoleScope.setRole(userRole.get());
        rolesScopesRepository.persist(newAdminRoleScope);

        Log.info("Admin user created successfully");

    }
}

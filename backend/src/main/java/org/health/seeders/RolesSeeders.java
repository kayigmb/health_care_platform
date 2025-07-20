package org.health.seeders;

import io.quarkus.logging.Log;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.health.entities.RolesEntity;
import org.health.enums.RolesEnum;
import org.health.repositories.RolesRepository;

import java.util.Optional;

@Dependent
public class RolesSeeders {
    /**
     * This class is responsible for seeding roles into the database.
     */
    @Inject
    RolesRepository rolesRepository;


    @Transactional
    public void addRoles() {
        Log.info("******************** Adding roles *********************");
        for (RolesEnum role : RolesEnum.values()) {
            String roleName = role.name().toLowerCase();
            Optional<RolesEntity> existingRole = rolesRepository.findByName(roleName);
            if (existingRole.isPresent()) {
                Log.info("Role already exists: " + role.name());
            } else {
                RolesEntity roleEntity = new RolesEntity();
                roleEntity.setName(roleName);
                rolesRepository.persist(roleEntity);
                Log.info("Added role: " + role.name());
            }
        }
    }
}

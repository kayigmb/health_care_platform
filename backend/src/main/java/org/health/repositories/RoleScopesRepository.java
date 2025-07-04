package org.health.repositories;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.health.entities.RolesScopeEntity;

@ApplicationScoped
public class RoleScopesRepository implements PanacheRepository<RolesScopeEntity> {
}

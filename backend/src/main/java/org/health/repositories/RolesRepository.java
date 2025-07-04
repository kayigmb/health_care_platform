package org.health.repositories;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.health.entities.RolesEntity;

@ApplicationScoped
public class RolesRepository implements PanacheRepository<RolesEntity> {
}

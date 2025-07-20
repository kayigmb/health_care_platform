package org.health.repositories;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import org.health.entities.RolesEntity;

import java.util.Optional;
import java.util.UUID;

@ApplicationScoped
public class RolesRepository implements PanacheRepository<RolesEntity> {
    public RolesEntity findById(UUID id) {
        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
        CriteriaQuery<RolesEntity> query = cb.createQuery(RolesEntity.class);
        Root<RolesEntity> root = query.from(RolesEntity.class);
        query.select(root).where(cb.equal(root.get("id"), id));
        return getEntityManager().createQuery(query).getResultStream().findFirst().orElse(null);
    }

    public Optional<RolesEntity> findByName(String name) {
        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
        CriteriaQuery<RolesEntity> query = cb.createQuery(RolesEntity.class);
        Root<RolesEntity> root = query.from(RolesEntity.class);
        query.select(root).where(cb.equal(root.get("name"), name));
        return getEntityManager().createQuery(query).getResultStream().findFirst();
    }
}

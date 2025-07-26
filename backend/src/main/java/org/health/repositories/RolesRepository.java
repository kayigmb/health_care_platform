package org.health.repositories;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.health.entities.RolesEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@ApplicationScoped
public class RolesRepository implements PanacheRepository<RolesEntity> {
    public RolesEntity findById(UUID id) {
        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
        CriteriaQuery<RolesEntity> query = cb.createQuery(RolesEntity.class);
        Root<RolesEntity> root = query.from(RolesEntity.class);
        List<Predicate> predicates = new ArrayList<>();
        predicates.add(cb.equal(root.get("isDeleted"), false));
        predicates.add(cb.equal(root.get("id"), id));
        query.select(root).where(predicates.toArray(new Predicate[0]));
        return getEntityManager().createQuery(query).getResultStream().findFirst().orElse(null);
    }

    public Optional<RolesEntity> findByName(String name) {
        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
        CriteriaQuery<RolesEntity> query = cb.createQuery(RolesEntity.class);
        Root<RolesEntity> root = query.from(RolesEntity.class);
        List<Predicate> predicates = new ArrayList<>();
        predicates.add(cb.equal(root.get("name"), name));
        predicates.add(cb.equal(root.get("isDeleted"), false));
        query.select(root).where(predicates.toArray(new Predicate[0]));
        return getEntityManager().createQuery(query).getResultStream().findFirst();
    }
}

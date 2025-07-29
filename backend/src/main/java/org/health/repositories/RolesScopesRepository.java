package org.health.repositories;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.health.dtos.request.RolesScopeRequest;
import org.health.entities.RolesScopeEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@ApplicationScoped
public class RolesScopesRepository implements PanacheRepository<RolesScopeEntity> {
    public RolesScopeEntity findById(UUID id) {
        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
        CriteriaQuery<RolesScopeEntity> query = cb.createQuery(RolesScopeEntity.class);
        Root<RolesScopeEntity> root = query.from(RolesScopeEntity.class);

        Predicate idPredicate = cb.equal(root.get("id"), id);
        Predicate notDeletedPredicate = cb.equal(root.get("isDeleted"), false);

        query.select(root).where(cb.and(idPredicate, notDeletedPredicate));
        return getEntityManager().createQuery(query).getResultStream().findFirst().orElse(null);
    }

    public Optional<RolesScopeEntity> findByUserByRequest(RolesScopeRequest request) {
        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
        CriteriaQuery<RolesScopeEntity> query = cb.createQuery(RolesScopeEntity.class);
        Root<RolesScopeEntity> root = query.from(RolesScopeEntity.class);
        List<Predicate> predicates = new ArrayList<>();

        if (request.userId() != null) {
            predicates.add(cb.equal(root.get("user").get("id"), request.userId()));
        }

        if (request.roleId() != null) {
            predicates.add(cb.equal(root.get("role").get("id"), request.roleId()));
        }

        if (request.hospitalId().isPresent()) {
            predicates.add(cb.equal(root.get("hospital").get("id"), request.hospitalId().get()));
        }

        predicates.add(cb.equal(root.get("isDeleted"), false));
        query.where(predicates.toArray(new Predicate[0]));
        return getEntityManager().createQuery(query).getResultStream().findFirst();
    }
}

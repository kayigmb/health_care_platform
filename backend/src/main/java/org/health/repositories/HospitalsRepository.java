package org.health.repositories;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.health.entities.HospitalsEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class HospitalsRepository implements PanacheRepository<HospitalsEntity> {
    public List<HospitalsEntity> findAllHospitals() {
        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
        CriteriaQuery<HospitalsEntity> query = cb.createQuery(HospitalsEntity.class);
        Root<HospitalsEntity> root = query.from(HospitalsEntity.class);
        query.where(cb.equal(root.get("isDeleted"), false));
        query.select(root);
        return getEntityManager().createQuery(query).getResultList();
    }

    public <T> HospitalsEntity findByField(String fieldName, T value) {
        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
        CriteriaQuery<HospitalsEntity> query = cb.createQuery(HospitalsEntity.class);
        Root<HospitalsEntity> root = query.from(HospitalsEntity.class);

        Predicate fieldPredicate = cb.equal(root.get(fieldName), value);
        Predicate notDeletedPredicate = cb.equal(root.get("isDeleted"), false);

        query.select(root).where(cb.and(fieldPredicate, notDeletedPredicate));
        return getEntityManager().createQuery(query).getResultStream().findFirst().orElse(null);
    }

    public HospitalsEntity findById(UUID id) {
        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
        CriteriaQuery<HospitalsEntity> query = cb.createQuery(HospitalsEntity.class);
        Root<HospitalsEntity> root = query.from(HospitalsEntity.class);
        List<Predicate> predicates = new ArrayList<>();
        predicates.add(cb.equal(root.get("id"), id));
        predicates.add(cb.equal(root.get("isDeleted"), false));
        query.select(root).where(predicates.toArray(new Predicate[0]));
        return getEntityManager().createQuery(query).getResultStream().findFirst().orElse(null);
    }
}

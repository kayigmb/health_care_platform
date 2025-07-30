package org.health.repositories;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import org.health.entities.MedicalRecordsEntity;

import java.util.UUID;

@ApplicationScoped
public class MedicalRecordsRepository implements PanacheRepository<MedicalRecordsEntity> {
    public MedicalRecordsEntity findById(UUID id) {
        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
        CriteriaQuery<MedicalRecordsEntity> query = cb.createQuery(MedicalRecordsEntity.class
        );
        Root<MedicalRecordsEntity> root = query.from(MedicalRecordsEntity.class);
        query.select(root).where(cb.equal(root.get("id"), id));
        return getEntityManager().createQuery(query).getResultStream().findFirst().orElse(null);
    }
}

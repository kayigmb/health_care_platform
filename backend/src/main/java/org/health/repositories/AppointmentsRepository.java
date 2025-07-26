package org.health.repositories;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import org.health.entities.AppointmentsEntity;

import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class AppointmentsRepository implements PanacheRepository<AppointmentsEntity> {
    private AppointmentsRepository() {
    }

    public List<AppointmentsEntity> findAllAppointments() {
        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
        CriteriaQuery<AppointmentsEntity> query = cb.createQuery(AppointmentsEntity.class);
        Root<AppointmentsEntity> root = query.from(AppointmentsEntity.class);
        query.select(root).where(cb.equal(root.get("isDeleted"), false));
        return getEntityManager().createQuery(query).getResultList();
    }

    public AppointmentsEntity findById(UUID id) {
        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
        CriteriaQuery<AppointmentsEntity> query = cb.createQuery(AppointmentsEntity.class);
        Root<AppointmentsEntity> root = query.from(AppointmentsEntity.class);
        query.select(root).where(cb.and(
                cb.equal(root.get("id"), id),
                cb.equal(root.get("isDeleted"), false)
        ));
        return getEntityManager().createQuery(query)
                .getResultStream().findFirst().orElse(null);
    }

}

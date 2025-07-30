package org.health.repositories;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.health.entities.AppointmentsEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class AppointmentsRepository implements PanacheRepository<AppointmentsEntity> {
    public List<AppointmentsEntity> findAllAppointments(
            UUID patientId,
            UUID doctorId,
            UUID hospitalId
    ) {
        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
        CriteriaQuery<AppointmentsEntity> query = cb.createQuery(AppointmentsEntity.class);
        Root<AppointmentsEntity> root = query.from(AppointmentsEntity.class);

        List<Predicate> predicates = new ArrayList<>();
        predicates.add(cb.equal(root.get("isDeleted"), false));

        if (patientId != null) {
            predicates.add(cb.equal(root.get("app_patient").get("id"), patientId));
        }
        if (doctorId != null) {
            predicates.add(cb.equal(root.get("app_doctor").get("id"), doctorId));
        }
        if (hospitalId != null) {
            predicates.add(cb.equal(root.get("hospitalId").get("id"), hospitalId));
        }

        query.select(root).where(cb.and(predicates.toArray(new Predicate[0])));

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

package org.health.repositories;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.health.entities.HospitalsEntity;

@ApplicationScoped
public class HospitalRepository implements PanacheRepository<HospitalsEntity> {
}

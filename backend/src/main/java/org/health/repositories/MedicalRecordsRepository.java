package org.health.repositories;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MedicalRecordsRepository implements PanacheRepository<MedicalRecordsRepository> {
}

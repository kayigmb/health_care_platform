package org.health.repositories;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import org.health.entities.UsersEntity;

@ApplicationScoped
public class UsersRepository implements PanacheRepository<UsersEntity> {
    public <T> UsersEntity findByField(String fieldName, T value) {
        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
        CriteriaQuery<UsersEntity> query = cb.createQuery(UsersEntity.class);
        Root<UsersEntity> root = query.from(UsersEntity.class);
        query.select(root).where(cb.equal(root.get(fieldName), value));
        return getEntityManager().createQuery(query).getResultStream().findFirst().orElse(null);
    }
}

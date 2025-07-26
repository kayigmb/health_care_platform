package org.health.repositories;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.health.entities.UsersEntity;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class UsersRepository implements PanacheRepository<UsersEntity> {
    public <T> UsersEntity findByField(String fieldName, T value) {
        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
        CriteriaQuery<UsersEntity> query = cb.createQuery(UsersEntity.class);
        Root<UsersEntity> root = query.from(UsersEntity.class);
        List<Predicate> predicates = new ArrayList<>();
        predicates.add(cb.equal(root.get(fieldName), value));
        predicates.add(cb.equal(root.get("isDeleted"), false));
        query.select(root).where(predicates.toArray(new Predicate[0]));
        return getEntityManager().createQuery(query).getResultStream().findFirst().orElse(null);
    }
}

package org.health.repositories;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.criteria.*;
import org.health.entities.RolesEntity;
import org.health.entities.RolesScopeEntity;
import org.health.entities.UsersEntity;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class UsersRepository implements PanacheRepository<UsersEntity> {
    public List<UsersEntity> findAllActiveUsers(String role) {
        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
        CriteriaQuery<UsersEntity> query = cb.createQuery(UsersEntity.class);
        Root<UsersEntity> userRoot = query.from(UsersEntity.class);
        query.distinct(true);

        List<Predicate> predicates = new ArrayList<>();
        predicates.add(cb.equal(userRoot.get("isDeleted"), false));

        if (role != null && !role.isEmpty()) {
            Join<UsersEntity, RolesScopeEntity> roleScopeJoin = userRoot.join("roleScopes", JoinType.INNER);
            Join<RolesScopeEntity, RolesEntity> roleJoin = roleScopeJoin.join("role", JoinType.INNER);
            predicates.add(cb.equal(cb.lower(roleJoin.get("name")), role.toLowerCase()));
        }

        query.select(userRoot).where(cb.and(predicates.toArray(new Predicate[0])));
        return getEntityManager().createQuery(query).getResultList();
    }

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

package org.health.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "roles_scope")
public class RolesScopeEntity extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UsersEntity user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id", nullable = false)
    private RolesEntity role;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = true)
    private HospitalsEntity hospital;
}

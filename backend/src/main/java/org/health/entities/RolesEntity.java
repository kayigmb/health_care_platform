package org.health.entities;

import jakarta.persistence.*;
import org.health.Enums.RolesEnum;

import java.util.List;

@Table(name = "roles", schema = "health_schema")
@Entity
public class RolesEntity extends BaseEntity {
    @Column(nullable = false, unique = true)
    private String name = RolesEnum.USER.toString();  // Default in Java side

    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<RolesScopeEntity> roleScopes;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<RolesScopeEntity> getRoleScopes() {
        return roleScopes;
    }

    public void setRoleScopes(List<RolesScopeEntity> roleScopes) {
        this.roleScopes = roleScopes;
    }
}

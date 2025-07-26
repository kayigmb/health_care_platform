package org.health.seeders;

import io.quarkus.runtime.StartupEvent;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Inject;

public class IndexSeeders {

    private final RolesSeeders rolesSeeders;
    private final AdminUserSeeder addAdminUserSeeder;

    @Inject
    public IndexSeeders(RolesSeeders rolesSeeders, AdminUserSeeder addAdminUserSeeder) {
        this.rolesSeeders = rolesSeeders;
        this.addAdminUserSeeder = addAdminUserSeeder;
    }

    void onStart(@Observes StartupEvent event) {
        rolesSeeders.addRoles();
        addAdminUserSeeder.addAdminUser();
    }
}

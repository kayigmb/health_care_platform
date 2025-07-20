package org.health.seeders;

import io.quarkus.runtime.StartupEvent;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Inject;

public class IndexSeeders {

    private final RolesSeeders rolesSeeders;

    @Inject
    public IndexSeeders(RolesSeeders rolesSeeders) {
        this.rolesSeeders = rolesSeeders;
    }

    void onStart(@Observes StartupEvent event) {
        rolesSeeders.addRoles();
    }
}

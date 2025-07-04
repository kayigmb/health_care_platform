package org.health.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "hospitals")
public class HospitalsEntity extends BaseEntity {
    private String name;

    private String address;

    @Column(name = "phone_number")
    private String phoneNumber;

    @OneToMany(mappedBy = "hospital", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<MedicalRecordsEntity> medicalRecords;

    @OneToMany(mappedBy = "hospital", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<AppointmentsEntity> appointments;

    @OneToMany(mappedBy = "hospital", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<RolesScopeEntity> hospitalRolesScopes;
}

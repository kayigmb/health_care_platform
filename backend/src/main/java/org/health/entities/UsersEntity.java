package org.health.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "users")
public class UsersEntity extends BaseEntity {
    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    private String email;

    @Column(name = "password")
    private String passwordHash;

    private String phone;

    @Column(name = "user_sys_id", unique = true)
    private String userSystemId;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<RolesScopeEntity> roleScopes;

    @OneToMany(mappedBy = "records_patient", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<MedicalRecordsEntity> medicalRecordsAsPatient;

    @OneToMany(mappedBy = "records_doctor", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<MedicalRecordsEntity> medicalRecordsAsDoctor;

    @OneToMany(mappedBy = "app_patient", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<AppointmentsEntity> appointmentsAsPatient;

    @OneToMany(mappedBy = "app_doctor", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<AppointmentsEntity> appointmentsAsDoctor;
}

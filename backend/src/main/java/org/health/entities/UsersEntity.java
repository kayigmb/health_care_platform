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

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getUserSystemId() {
        return userSystemId;
    }

    public void setUserSystemId(String userSystemId) {
        this.userSystemId = userSystemId;
    }

    public List<RolesScopeEntity> getRoleScopes() {
        return roleScopes;
    }

    public void setRoleScopes(List<RolesScopeEntity> roleScopes) {
        this.roleScopes = roleScopes;
    }

    public List<MedicalRecordsEntity> getMedicalRecordsAsPatient() {
        return medicalRecordsAsPatient;
    }

    public void setMedicalRecordsAsPatient(List<MedicalRecordsEntity> medicalRecordsAsPatient) {
        this.medicalRecordsAsPatient = medicalRecordsAsPatient;
    }

    public List<MedicalRecordsEntity> getMedicalRecordsAsDoctor() {
        return medicalRecordsAsDoctor;
    }

    public void setMedicalRecordsAsDoctor(List<MedicalRecordsEntity> medicalRecordsAsDoctor) {
        this.medicalRecordsAsDoctor = medicalRecordsAsDoctor;
    }

    public List<AppointmentsEntity> getAppointmentsAsPatient() {
        return appointmentsAsPatient;
    }

    public void setAppointmentsAsPatient(List<AppointmentsEntity> appointmentsAsPatient) {
        this.appointmentsAsPatient = appointmentsAsPatient;
    }

    public List<AppointmentsEntity> getAppointmentsAsDoctor() {
        return appointmentsAsDoctor;
    }

    public void setAppointmentsAsDoctor(List<AppointmentsEntity> appointmentsAsDoctor) {
        this.appointmentsAsDoctor = appointmentsAsDoctor;
    }
}

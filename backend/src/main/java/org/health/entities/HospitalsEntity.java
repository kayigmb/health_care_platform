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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public List<MedicalRecordsEntity> getMedicalRecords() {
        return medicalRecords;
    }

    public void setMedicalRecords(List<MedicalRecordsEntity> medicalRecords) {
        this.medicalRecords = medicalRecords;
    }

    public List<AppointmentsEntity> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<AppointmentsEntity> appointments) {
        this.appointments = appointments;
    }

    public List<RolesScopeEntity> getHospitalRolesScopes() {
        return hospitalRolesScopes;
    }

    public void setHospitalRolesScopes(List<RolesScopeEntity> hospitalRolesScopes) {
        this.hospitalRolesScopes = hospitalRolesScopes;
    }
}

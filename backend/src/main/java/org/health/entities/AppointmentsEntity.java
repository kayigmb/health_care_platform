package org.health.entities;

import jakarta.persistence.*;
import org.health.enums.AppointmentStatusEnum;

import java.time.ZonedDateTime;

@Entity
@Table(name = "appointments", schema = "health_schema")
public class AppointmentsEntity extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private UsersEntity app_patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id")
    private UsersEntity app_doctor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id")
    private HospitalsEntity hospital;

    private String status = AppointmentStatusEnum.PENDING.toString();

    private String service;

    private ZonedDateTime appointmentDate;

    private String reason;

    public ZonedDateTime getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(ZonedDateTime appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public UsersEntity getApp_patient() {
        return app_patient;
    }

    public void setApp_patient(UsersEntity app_patient) {
        this.app_patient = app_patient;
    }

    public UsersEntity getApp_doctor() {
        return app_doctor;
    }

    public void setApp_doctor(UsersEntity app_doctor) {
        this.app_doctor = app_doctor;
    }

    public HospitalsEntity getHospital() {
        return hospital;
    }

    public void setHospital(HospitalsEntity hospital) {
        this.hospital = hospital;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }
}

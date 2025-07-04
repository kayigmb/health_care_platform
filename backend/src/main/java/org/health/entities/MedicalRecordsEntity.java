package org.health.entities;


import jakarta.persistence.*;

@Entity
@Table(name = "medical_records", schema = "health_schema")
public class MedicalRecordsEntity extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private UsersEntity records_patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id")
    private UsersEntity records_doctor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id")
    private HospitalsEntity hospital;

    private String diagnosis;

    @Column(name = "treatment_plan")
    private String treatmentPlan;

    private String notes;

    @Column(name = "medical_documents")
    @Basic(fetch = FetchType.LAZY)
    private byte[] medicalDocuments;

    public UsersEntity getRecords_patient() {
        return records_patient;
    }

    public void setRecords_patient(UsersEntity records_patient) {
        this.records_patient = records_patient;
    }

    public UsersEntity getRecords_doctor() {
        return records_doctor;
    }

    public void setRecords_doctor(UsersEntity records_doctor) {
        this.records_doctor = records_doctor;
    }

    public HospitalsEntity getHospital() {
        return hospital;
    }

    public void setHospital(HospitalsEntity hospital) {
        this.hospital = hospital;
    }

    public String getDiagnosis() {
        return diagnosis;
    }

    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }

    public String getTreatmentPlan() {
        return treatmentPlan;
    }

    public void setTreatmentPlan(String treatmentPlan) {
        this.treatmentPlan = treatmentPlan;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public byte[] getMedicalDocuments() {
        return medicalDocuments;
    }

    public void setMedicalDocuments(byte[] medicalDocuments) {
        this.medicalDocuments = medicalDocuments;
    }
}

package org.health.entities;


import jakarta.persistence.*;

@Entity
@Table(name = "medical_records")
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
}

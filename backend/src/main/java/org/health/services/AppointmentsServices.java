package org.health.services;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.health.dtos.AppointmentDto;
import org.health.dtos.mappers.AppointmentsMapper;
import org.health.dtos.request.AppointmentRequestDTO;
import org.health.entities.AppointmentsEntity;
import org.health.entities.HospitalsEntity;
import org.health.entities.UsersEntity;
import org.health.exceptions.ExistingError;
import org.health.exceptions.NotFoundError;
import org.health.repositories.AppointmentsRepository;
import org.health.repositories.HospitalsRepository;
import org.health.repositories.UsersRepository;

import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class AppointmentsServices {

    private final AppointmentsRepository appointmentsRepository;
    private final UsersRepository usersRepository;
    private final HospitalsRepository hospitalsRepository;

    @Inject
    public AppointmentsServices(AppointmentsRepository appointmentsRepository, UsersRepository usersRepository, HospitalsRepository hospitalsRepository) {
        this.appointmentsRepository = appointmentsRepository;
        this.usersRepository = usersRepository;
        this.hospitalsRepository = hospitalsRepository;
    }

    public List<AppointmentDto> getAllAppointments() {
        return appointmentsRepository.findAllAppointments()
                .stream()
                .map(AppointmentsMapper::toDto)
                .toList();
    }

    public AppointmentDto getAppointmentById(UUID id) throws NotFoundError {
        AppointmentsEntity existingAppointment = appointmentsRepository.findById(id);
        if (existingAppointment == null) {
            throw new NotFoundError("Appointment not found with ID: " + id);
        }
        return AppointmentsMapper.toDto(existingAppointment);
    }

    @Transactional
    public AppointmentDto createAppointment(AppointmentRequestDTO appointmentDto) throws NotFoundError {
        UsersEntity existingUser = usersRepository.findByField("id", appointmentDto.patientId());
        if (existingUser == null) {
            throw new NotFoundError("User not found with ID: " + appointmentDto.patientId());
        }

        UsersEntity existingDoctor = usersRepository.findByField("id", appointmentDto.doctorId());
        if (existingDoctor == null) {
            throw new NotFoundError("User not found with ID: " + appointmentDto.patientId());
        }

        HospitalsEntity existingHospital = hospitalsRepository.findById(appointmentDto.hospitalId());
        if (existingHospital == null) {
            throw new NotFoundError("Hospital not found with ID: " + appointmentDto.hospitalId());
        }

        AppointmentsEntity newAppointment = AppointmentsMapper.toEntity(appointmentDto);
        appointmentsRepository.persist(newAppointment);
        return AppointmentsMapper.toDto(newAppointment);
    }

    @Transactional
    public AppointmentDto updateAppointment(UUID id, AppointmentRequestDTO appointmentDto) throws NotFoundError {
        AppointmentsEntity existingAppointment = appointmentsRepository.findById(id);
        if (existingAppointment == null) {
            throw new NotFoundError("Appointment not found with ID: " + id);
        }
        UsersEntity existingUser = usersRepository.findByField("id", appointmentDto.patientId());
        if (existingUser == null) {
            throw new NotFoundError("User not found with ID: " + appointmentDto.patientId());
        }
        UsersEntity existingDoctor = usersRepository.findByField("id", appointmentDto.doctorId());
        if (existingDoctor == null) {
            throw new NotFoundError("User not found with ID: " + appointmentDto.doctorId());
        }
        HospitalsEntity existingHospital = hospitalsRepository.findById(appointmentDto.hospitalId());
        if (existingHospital == null) {
            throw new NotFoundError("Hospital not found with ID: " + appointmentDto.hospitalId());
        }

        existingAppointment.setApp_patient(existingUser);
        existingAppointment.setApp_doctor(existingDoctor);
        existingAppointment.setHospital(existingHospital);
        existingAppointment.setService(appointmentDto.service());
        existingAppointment.setAppointmentDate(appointmentDto.appointmentDate());
        existingAppointment.setReason(appointmentDto.reason());

        return AppointmentsMapper.toDto(existingAppointment);
    }

    @Transactional
    public AppointmentDto deleteAppointment(UUID id) throws NotFoundError {
        AppointmentsEntity existingAppointment = appointmentsRepository.findById(id);
        if (existingAppointment == null) {
            throw new ExistingError("Appointment not found with ID: " + id);
        }
        existingAppointment.setDeleted(true);
        return AppointmentsMapper.toDto(existingAppointment);
    }
}

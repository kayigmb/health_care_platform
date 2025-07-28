package org.health.services;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import org.health.dtos.AppointmentDto;
import org.health.dtos.MedicalRecordDto;
import org.health.dtos.mappers.AppointmentsMapper;
import org.health.dtos.mappers.MedicalRecordMapper;
import org.health.dtos.mappers.UsersMapper;
import org.health.entities.UsersEntity;
import org.health.exceptions.NotFoundError;
import org.health.repositories.UsersRepository;
import org.health.utils.ResponseBuilder;

import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class UsersServices {
    private final UsersRepository usersRepository;

    @Inject
    public UsersServices(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    public Response getAllUsers() {
        return ResponseBuilder.success("Users list fetched successfully",
                usersRepository.findAll()
                        .stream()
                        .map(UsersMapper::toDto)
                        .toList());
    }

    public Response getUserById(UUID id) {
        UsersEntity user = usersRepository.findByField("id", id);
        if (user == null) {
            throw new NotFoundError("User with id " + id + " not found");
        }
        return ResponseBuilder.success("User retrieved successfully",
                UsersMapper.toDto(user));
    }

    public Response getCurrentUser(UUID userId) {
        UsersEntity currentUser = usersRepository.findByField("id", userId);
        if (currentUser == null) {
            throw new NotFoundError("Current user not found with id: " + userId);
        }
        return ResponseBuilder.success("Current user retrieved successfully",
                UsersMapper.toFullDto(currentUser));
    }

    public List<AppointmentDto> getUserAppointments(UUID userId) throws NotFoundError {
        UsersEntity user = usersRepository.findByField("id", userId);
        if (user == null) {
            throw new NotFoundError("User with id " + userId + " not found");
        }
        return user
                .getAppointmentsAsPatient()
                .stream().map(AppointmentsMapper::toDto)
                .toList();
    }

    public List<MedicalRecordDto> getUserRecords(UUID userId) throws NotFoundError {
        UsersEntity user = usersRepository.findByField("id", userId);
        if (user == null) {
            throw new NotFoundError("User with id " + userId + " not found");
        }
        return user
                .getMedicalRecordsAsPatient()
                .stream().map(MedicalRecordMapper::toDto)
                .toList();
    }


}

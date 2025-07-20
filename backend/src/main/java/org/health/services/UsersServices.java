package org.health.services;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import org.health.dtos.mappers.UsersMapper;
import org.health.entities.UsersEntity;
import org.health.exceptions.NotFoundError;
import org.health.repositories.UsersRepository;
import org.health.utils.ResponseBuilder;

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
                usersRepository.findAll().stream().map(UsersMapper::toDto).toList());
    }

    public Response getUserById(UUID id) {
        UsersEntity user = usersRepository.findByField("id", id);
        if (user == null) {
            throw new NotFoundError("User with id " + id + " not found");
        }
        return ResponseBuilder.success("User retrieved successfully", UsersMapper.toDto(user));
    }

    public Response getCurrentUser() {
        return null;
    }


}

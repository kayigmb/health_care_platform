package org.health.services;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.core.Response;
import org.health.dtos.mappers.UsersMapper;
import org.health.dtos.request.LoginRequestDTO;
import org.health.dtos.request.RegisterUserRequestDTO;
import org.health.entities.RolesEntity;
import org.health.entities.RolesScopeEntity;
import org.health.entities.UsersEntity;
import org.health.enums.RolesEnum;
import org.health.exceptions.ExistingError;
import org.health.exceptions.NotFoundError;
import org.health.repositories.RolesRepository;
import org.health.repositories.RolesScopesRepository;
import org.health.repositories.UsersRepository;
import org.health.utils.JwtUtils;
import org.health.utils.PasswordHashUtils;
import org.health.utils.ResponseBuilder;

import java.util.Optional;

@ApplicationScoped
public class AuthenticationServices {

    private final UsersRepository usersRepository;
    private final RolesRepository rolesRepository;
    private final RolesScopesRepository rolesScopesRepository;

    @Inject
    public AuthenticationServices(UsersRepository usersRepository, RolesRepository rolesRepository, RolesScopesRepository rolesScopesRepository) {
        this.usersRepository = usersRepository;
        this.rolesRepository = rolesRepository;
        this.rolesScopesRepository = rolesScopesRepository;
    }

    @Transactional
    public Response registerUser(RegisterUserRequestDTO userInfo) {
        UsersEntity existingUserEmail = usersRepository.findByField("email", userInfo.email());
        if (existingUserEmail != null) {
            throw new ExistingError("User with this email already exists.");
        }
        if (userInfo.phone().isPresent()) {
            UsersEntity existingUserPhone = usersRepository.findByField("phone", userInfo.phone().get());
            if (existingUserPhone != null) {
                throw new ExistingError("User with this phone number already exists.");
            }
        }

        // Create a new UsersEntity and set its properties
        UsersEntity newUser = UsersMapper.toEntityRegister(userInfo);
        usersRepository.persist(newUser);

        // Find the user role from the repository
        Optional<RolesEntity> userRole = rolesRepository.findByName(RolesEnum.USER.toString().toLowerCase());
        if (userRole.isEmpty()) {
            throw new NotFoundError("User role not found.");
        }
        // Create a new RolesScopeEntity for the user
        RolesScopeEntity rolesScopeUser = new RolesScopeEntity();
        rolesScopeUser.setUser(newUser);
        rolesScopeUser.setRole(userRole.get());
        rolesScopesRepository.persist(rolesScopeUser);

        return ResponseBuilder.success("User registered successfully", UsersMapper.toDto(newUser));
    }

    public Response loginService(LoginRequestDTO loginRequest) {
        UsersEntity existingUser = usersRepository.findByField("email", loginRequest.email());
        if (existingUser == null) {
            throw new NotFoundError("Username or password is incorrect.");
        }
        if (!PasswordHashUtils.checkPassword(loginRequest.password(), existingUser.getPasswordHash())) {
            return ResponseBuilder.error(Response.Status.UNAUTHORIZED, "Username or password is incorrect.");
        }
        return ResponseBuilder.success("Login successful", JwtUtils.generateToken(existingUser));
    }

}

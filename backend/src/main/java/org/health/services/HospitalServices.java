package org.health.services;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.health.dtos.HospitalDto;
import org.health.dtos.HospitalMoreDTO;
import org.health.dtos.mappers.HospitalMapper;
import org.health.dtos.request.HospitalRequestDTO;
import org.health.entities.HospitalsEntity;
import org.health.exceptions.ExistingError;
import org.health.exceptions.NotFoundError;
import org.health.repositories.HospitalsRepository;

import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class HospitalServices {
    private final HospitalsRepository hospitalsRepository;

    @Inject
    public HospitalServices(HospitalsRepository hospitalsRepository) {
        this.hospitalsRepository = hospitalsRepository;
    }

    public List<HospitalMoreDTO> getAllHospitals() {
        return hospitalsRepository
                .findAllHospitals().stream()
                .map(HospitalMapper::toMoreDTO)
                .toList();
    }

    public HospitalMoreDTO getHospitalById(UUID id) throws NotFoundError {
        HospitalsEntity existingHospital = hospitalsRepository.findById(id);
        if (existingHospital == null) {
            throw new NotFoundError("Hospital with id " + id + " not found");
        }
        return HospitalMapper.toMoreDTO(existingHospital);
    }

    @Transactional
    public HospitalDto createHospital(HospitalRequestDTO hospitalDto) throws ExistingError {
        HospitalsEntity existingHospital = hospitalsRepository.findByField(
                "name", hospitalDto.name());
        if (existingHospital != null) {
            throw new ExistingError("Hospital with name "
                    + hospitalDto.name() + " already exists");
        }

        HospitalsEntity newHospital = new HospitalsEntity();
        newHospital.setName(hospitalDto.name());
        newHospital.setAddress(hospitalDto.address());
        newHospital.setPhoneNumber(hospitalDto.phoneNumber());
        hospitalsRepository.persist(newHospital);
        return HospitalMapper.toDto(newHospital);
    }

    @Transactional
    public HospitalDto updateHospital(UUID id, HospitalRequestDTO hospitalDto) throws NotFoundError {
        HospitalsEntity existingHospital = hospitalsRepository.findById(id);
        if (existingHospital == null) {
            throw new NotFoundError("Hospital with id " + id + " not found");
        }

        existingHospital.setName(hospitalDto.name());
        existingHospital.setAddress(hospitalDto.address());
        existingHospital.setPhoneNumber(hospitalDto.phoneNumber());

        return HospitalMapper.toDto(existingHospital);
    }

    @Transactional
    public HospitalDto deleteHospital(UUID id) {
        HospitalsEntity existingHospital = hospitalsRepository.findById(id);
        if (existingHospital == null) {
            throw new NotFoundError("Hospital with id " + id + " not found");
        }

        existingHospital.setDeleted(true);
        hospitalsRepository.persist(existingHospital);
        return HospitalMapper.toDto(existingHospital);
    }
}

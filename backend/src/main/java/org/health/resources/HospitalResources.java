package org.health.resources;

import io.quarkus.security.Authenticated;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;
import org.health.dtos.request.HospitalRequestDTO;
import org.health.exceptions.ExistingError;
import org.health.exceptions.NotFoundError;
import org.health.services.HospitalServices;
import org.health.utils.ResponseBuilder;

import java.util.UUID;

@Path("/hospitals")
@Authenticated
public class HospitalResources {

    private final HospitalServices hospitalServices;

    @Inject
    public HospitalResources(HospitalServices hospitalServices) {
        this.hospitalServices = hospitalServices;
    }

    @GET
    public Response getAllHospitals() {
        try {
            return ResponseBuilder.success("Hospitals retrieved successfully",
                    hospitalServices.getAllHospitals());
        } catch (Exception e) {
            return ResponseBuilder.error(Response.Status.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GET
    @Path("{id}")
    public Response getSingleHospital(@PathParam("id") UUID id) {
        try {
            return ResponseBuilder.success("Hospital retrieved successfully",
                    hospitalServices.getHospitalById(id));
        } catch (NotFoundError e) {
            return ResponseBuilder.error(Response.Status.NOT_FOUND, e.getMessage());
        } catch (Exception e) {
            return ResponseBuilder.error(Response.Status.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @POST
    public Response createHospital(HospitalRequestDTO hospitalRequestDTO) {
        try {
            return ResponseBuilder.success("Hospital created successfully",
                    hospitalServices.createHospital(hospitalRequestDTO));
        } catch (ExistingError e) {
            return ResponseBuilder.error(Response.Status.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return ResponseBuilder.error(Response.Status.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @PATCH
    @Path("{id}")
    public Response updateHospital(@PathParam("id") UUID id, HospitalRequestDTO hospitalRequestDTO) {
        try {
            return ResponseBuilder.success("Hospital updated successfully",
                    hospitalServices.updateHospital(id, hospitalRequestDTO));
        } catch (NotFoundError e) {
            return ResponseBuilder.error(Response.Status.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return ResponseBuilder.error(Response.Status.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @DELETE
    @Path("{id}")
    public Response deleteHospital(@PathParam("id") UUID id) {
        try {
            return ResponseBuilder.success("Hospital deleted successfully",
                    hospitalServices.deleteHospital(id));
        } catch (NotFoundError e) {
            return ResponseBuilder.error(Response.Status.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return ResponseBuilder.error(Response.Status.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }
}

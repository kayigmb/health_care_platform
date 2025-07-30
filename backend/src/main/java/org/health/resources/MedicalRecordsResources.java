package org.health.resources;

import io.quarkus.security.Authenticated;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;
import org.health.dtos.request.MedicalRecordsRequestDTO;
import org.health.exceptions.NotFoundError;
import org.health.services.MedicalRecordsServices;
import org.health.utils.ResponseBuilder;

import java.util.UUID;

@Path("/medical-records")
public class MedicalRecordsResources {
    private final MedicalRecordsServices medicalRecordsServices;

    @Inject
    public MedicalRecordsResources(MedicalRecordsServices medicalRecordsServices) {
        this.medicalRecordsServices = medicalRecordsServices;
    }

    @GET
    @Authenticated
    public Response getAllMedicalRecords(@QueryParam("patient") UUID patient) {
        return ResponseBuilder.success("Medical records retrieved successfully",
                medicalRecordsServices.getMedicalRecords());
    }

    @GET
    @Path("/{id}")
    @Authenticated
    public Response getMedicalRecordById(@PathParam("id") UUID id) {
        try {
            return ResponseBuilder.success("Medical record retrieved successfully",
                    medicalRecordsServices.getMedicalRecordById(id));
        } catch (NotFoundError e) {
            return ResponseBuilder.error(Response.Status.NOT_FOUND, e.getMessage());
        } catch (Exception e) {
            return ResponseBuilder.error(Response.Status.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @POST
    @Authenticated
    public Response createMedicalRecord(MedicalRecordsRequestDTO recordsRequestDTO) {
        try {
            return ResponseBuilder.success(Response.Status.CREATED,
                    "Medical record created successfully",
                    medicalRecordsServices.createMedicalRecord(recordsRequestDTO));
        } catch (NotFoundError e) {
            return ResponseBuilder.error(Response.Status.NOT_FOUND, e.getMessage());
        } catch (Exception e) {
            return ResponseBuilder.error(Response.Status.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @PATCH
    @Path("/{id}")
    @Authenticated
    public Response updateMedicalRecord(@PathParam("id") UUID id, MedicalRecordsRequestDTO recordsRequestDTO) {
        try {
            return ResponseBuilder.success("Medical record updated successfully",
                    medicalRecordsServices.updateMedicalRecord(id, recordsRequestDTO));
        } catch (NotFoundError e) {
            return ResponseBuilder.error(Response.Status.NOT_FOUND, e.getMessage());
        } catch (Exception e) {
            return ResponseBuilder.error(Response.Status.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @DELETE
    @Path("/{id}")
    @Authenticated
    public Response deleteMedicalRecord(@PathParam("id") UUID id) {
        try {
            return ResponseBuilder.success("Medical record deleted successfully",
                    medicalRecordsServices.deleteMedicalRecord(id));
        } catch (NotFoundError e) {
            return ResponseBuilder.error(Response.Status.NOT_FOUND, e.getMessage());
        } catch (Exception e) {
            return ResponseBuilder.error(Response.Status.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GET
    @Path("/{id}/download")
    public Response downloadMedicalDocument(@PathParam("id") UUID id) {
        try {
            return medicalRecordsServices.downloadMedicalDocument(id);
        } catch (NotFoundError e) {
            return ResponseBuilder.error(Response.Status.NOT_FOUND, e.getMessage());
        } catch (Exception e) {
            return ResponseBuilder.error(Response.Status.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GET
    @Path("/{id}/preview")
    public Response previewMedicalDocument(@PathParam("id") UUID id) {
        try {
            return medicalRecordsServices.previewMedicalDocument(id);
        } catch (NotFoundError e) {
            return ResponseBuilder.error(Response.Status.NOT_FOUND, e.getMessage());
        } catch (Exception e) {
            return ResponseBuilder.error(Response.Status.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }
}

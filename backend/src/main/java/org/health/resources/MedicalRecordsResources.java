package org.health.resources;

import io.quarkus.security.Authenticated;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

import java.util.UUID;

@Path("/medical-records")
@Authenticated
public class MedicalRecordsResources {
    @GET
    public Response getAllMedicalRecords() {
        return null;
    }

    @GET
    @Path("/{id}")
    public Response getMedicalRecordById(@PathParam("id") UUID id) {
        return null;
    }

    @POST
    public Response createMedicalRecord() {
        return null;
    }

    @PATCH
    @Path("/{id}")
    public Response updateMedicalRecord(@PathParam("id") UUID id) {
        return null;
    }

    @DELETE
    @Path("/{id}")
    public Response deleteMedicalRecord(@PathParam("id") UUID id) {
        return null;
    }
}

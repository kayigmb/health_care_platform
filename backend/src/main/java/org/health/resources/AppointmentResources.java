package org.health.resources;

import io.quarkus.security.Authenticated;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;
import org.health.dtos.request.AppointmentRequestDTO;
import org.health.exceptions.NotFoundError;
import org.health.services.AppointmentsServices;
import org.health.utils.ResponseBuilder;

import java.util.UUID;

@Path("/appointments")
@Authenticated
public class AppointmentResources {
    private final AppointmentsServices appointmentsServices;

    @Inject
    public AppointmentResources(AppointmentsServices appointmentsServices) {
        this.appointmentsServices = appointmentsServices;
    }

    @GET
    @RolesAllowed({"admin", "doctor"})
    public Response getAllAppointments() {
        try {
            return ResponseBuilder.success("Appointments retrieved successfully",
                    appointmentsServices.getAllAppointments());
        } catch (Exception e) {
            return ResponseBuilder.error(Response.Status.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GET
    @Path("/{id}")
    public Response getAppointmentById(@PathParam("id") UUID id) {
        try {
            return ResponseBuilder.success("Appointment retrieved successfully",
                    appointmentsServices.getAppointmentById(id));
        } catch (NotFoundError e) {
            return ResponseBuilder.error(Response.Status.NOT_FOUND, e.getMessage());
        } catch (Exception e) {
            return ResponseBuilder.error(Response.Status.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @POST
    public Response createAppointment(AppointmentRequestDTO appointmentRequestDTO) {
        try {
            return ResponseBuilder.success("Appointment created successfully",
                    appointmentsServices.createAppointment(appointmentRequestDTO));
        } catch (NotFoundError e) {
            return ResponseBuilder.error(Response.Status.NOT_FOUND, e.getMessage());
        } catch (Exception e) {
            return ResponseBuilder.error(Response.Status.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @PATCH
    @Path("/{id}")
    @RolesAllowed({"admin", "doctor"})
    public Response updateAppointment(@PathParam("id") UUID id, AppointmentRequestDTO appointmentRequestDTO) {
        try {
            return ResponseBuilder.success("Appointment created successfully",
                    appointmentsServices.updateAppointment(id, appointmentRequestDTO));
        } catch (NotFoundError e) {
            return ResponseBuilder.error(Response.Status.NOT_FOUND, e.getMessage());
        } catch (Exception e) {
            return ResponseBuilder.error(Response.Status.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @DELETE
    @Path("/{id}")
    @RolesAllowed({"admin", "doctor"})
    public Response deleteAppointment(@PathParam("id") UUID id) {
        try {
            return ResponseBuilder.success("Appointment deleted successfully",
                    appointmentsServices.deleteAppointment(id));
        } catch (NotFoundError e) {
            return ResponseBuilder.error(Response.Status.NOT_FOUND, e.getMessage());
        } catch (Exception e) {
            return ResponseBuilder.error(Response.Status.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @PATCH
    @Path("/{id}/status")
    @RolesAllowed({"admin", "doctor"})
    public Response updateAppointmentStatus(@PathParam("id") UUID id, @QueryParam("status") String status) {
        try {
            return ResponseBuilder.success("Appointment status updated successfully",
                    appointmentsServices.updateAppointmentsStatus(id, status));
        } catch (NotFoundError e) {
            return ResponseBuilder.error(Response.Status.NOT_FOUND, e.getMessage());
        } catch (Exception e) {
            return ResponseBuilder.error(Response.Status.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }
}

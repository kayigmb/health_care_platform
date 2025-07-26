package org.health.dtos.request;

import java.time.ZonedDateTime;
import java.util.UUID;

public record AppointmentRequestDTO(
        UUID patientId,
        UUID doctorId,
        UUID hospitalId,
        ZonedDateTime appointmentDate,
        String service,
        String reason
) {
}

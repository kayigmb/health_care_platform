package org.health.enums;

/**
 * Enum representing the status of an appointment.
 * This enum defines four statuses: PENDING, CONFIRMED, CANCELLED, and COMPLETED.
 */
public enum AppointmentStatusEnum {
    PENDING,
    CONFIRMED,
    CANCELLED,
    COMPLETED;

    public static boolean contains(String status) {
        for (AppointmentStatusEnum appointmentStatus : AppointmentStatusEnum.values()) {
            if (appointmentStatus.name().equalsIgnoreCase(status)) {
                return true;
            }
        }
        return false;
    }

    @Override
    public String toString() {
        return name().toLowerCase();
    }
}
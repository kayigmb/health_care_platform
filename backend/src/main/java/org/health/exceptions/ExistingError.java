package org.health.exceptions;

public class ExistingError extends RuntimeException {
    public ExistingError(String message) {
        super(message);
    }
}

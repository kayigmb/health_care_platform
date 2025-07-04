package org.health.utils;

import org.mindrot.jbcrypt.BCrypt;

public class PasswordHashUtils {
    private PasswordHashUtils() {
    }

    /**
     * Hashes a password using BCrypt.
     *
     * @param password the password to hash
     * @return the hashed password
     */
    public static String hashPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }

    /**
     * Checks if a password matches a hashed password.
     *
     * @param password the plain text password to check
     * @param hashed   the hashed password to check against
     * @return true if the password matches the hashed password, false otherwise
     */
    public static boolean checkPassword(String password, String hashed) {
        return BCrypt.checkpw(password, hashed);
    }
}

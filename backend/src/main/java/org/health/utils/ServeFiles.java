package org.health.utils;

import jakarta.ws.rs.core.Response;
import org.health.entities.MedicalRecordsEntity;

public class ServeFiles {
    private ServeFiles() {
    }

    /**
     * Serves a file from the file storage.
     *
     * @param document    the document entity containing file information
     * @param disposition "inline" for preview, "attachment" for download
     * @return Response containing the file data
     */
    public static Response serveFile(MedicalRecordsEntity document, String disposition) {
        byte[] filecontent = document.getMedicalDocumentsContent();
        return Response.ok(document.getMedicalDocumentsContent())
                .header(
                        "Content-Disposition",
                        disposition + "; filename=\"" + document.getMedicalDocumentsName() + "\"")
                .header("Content-Type", document.getMedicalDocumentsType())
                .header("Content-Length", filecontent.length)
                .build();
    }
}

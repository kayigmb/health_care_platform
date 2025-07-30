import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { Eye, FileDown, Plus, X } from "lucide-react";
import { useFetch } from "../../../hooks/useFetch";
import { APIRoutesNames } from "../../../utils/RoutesNames";
import { Table } from "../../Table/Table";
import type { ColumnProps, MedicalRecordType, MedicalTable } from "../../../types/Types";
import { MedicalRecordFormDialog } from "./MedicalRecordFormDialog.tsx";

const formatDateTime = (dateString: string | Date): string => {
  const date = new Date(dateString);
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
};

export function MedicalRecordsPage() {
  const [records, setRecords] = useState<MedicalRecordType[]>([]);
  const [filtered, setFiltered] = useState<MedicalRecordType[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecordType | null>(null);
  const [openNewDialog, setOpenNewDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const { fetchData, loading } = useFetch<MedicalRecordType[], void>();

  const fetchRecords = async () => {
    const res = await fetchData({ url: APIRoutesNames.MEDICAL_RECORDS });
    if (res) {
      const normalized = res.map((r) => ({
        ...r,
        createdAt: new Date(r.createdAt)
      }));
      setRecords(normalized);
      setFiltered(normalized);
    } else {
      setRecords([]);
      setFiltered([]);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.toLowerCase());
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (!debouncedSearchTerm) {
      setFiltered(records);
    } else {
      setFiltered(
        records.filter((r) =>
          [
            r.diagnosis,
            r.patient.firstName,
            r.patient.lastName,
            r.doctor.firstName,
            r.doctor.lastName,
            r.hospital.name
          ]
            .filter(Boolean)
            .some((value) => value.toLowerCase().includes(debouncedSearchTerm))
        )
      );
    }
  }, [debouncedSearchTerm, records]);

  const columns: ColumnProps<MedicalTable>[] = [
    { title: "Diagnosis", value: "diagnosis" },
    {
      title: "Patient",
      value: "patient",
      renderCell: (r) => `${r.patient.firstName} ${r.patient.lastName}`
    },
    {
      title: "Doctor",
      value: "doctor",
      renderCell: (r) => `${r.doctor.firstName} ${r.doctor.lastName}`
    },
    {
      title: "Hospital",
      value: "hospital",
      renderCell: (r) => r.hospital.name
    },
    {
      title: "Created At",
      value: "createdAt",
      renderCell: (r) => formatDateTime(r.createdAt)
    },
    {
      title: "Actions",
      value: "actions",
      renderCell: (r) => (
        <IconButton onClick={() => setSelectedRecord(r)}>
          <Eye size={18} />
        </IconButton>
      )
    }
  ];

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        Medical Records
      </Typography>

      <Box display="flex" gap={2} mb={2}>
        <TextField
          fullWidth
          placeholder="Search by diagnosis, patient, doctor, hospital"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" startIcon={<Plus />} onClick={() => setOpenNewDialog(true)}>
          New Record
        </Button>
      </Box>

      {loading ? (
        <Box mt={4} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <Table<MedicalRecordType> data={filtered} columns={columns} pagination />
      )}

      <Dialog
        open={!!selectedRecord}
        onClose={() => setSelectedRecord(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Record Details
          <IconButton
            onClick={() => setSelectedRecord(null)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <X size={20} />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedRecord && (
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography>
                <strong>Diagnosis:</strong> {selectedRecord.diagnosis}
              </Typography>
              <Typography>
                <strong>Patient:</strong> {selectedRecord.patient.firstName}{" "}
                {selectedRecord.patient.lastName}
              </Typography>
              <Typography>
                <strong>Doctor:</strong> {selectedRecord.doctor.firstName}{" "}
                {selectedRecord.doctor.lastName}
              </Typography>
              <Typography>
                <strong>Hospital:</strong> {selectedRecord.hospital.name}
              </Typography>
              <Typography>
                <strong>Created At:</strong> {formatDateTime(selectedRecord.createdAt)}
              </Typography>

              {selectedRecord.medicalDocumentsName && (
                <Box>
                  <Typography>
                    <strong>Document:</strong> {selectedRecord.medicalDocumentsName}
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<FileDown size={16} />}
                    onClick={async () => {
                      try {
                        const response = await fetch(
                          `${APIRoutesNames.MEDICAL_RECORDS}/${selectedRecord.id}/download`
                        );
                        if (!response.ok) {
                          alert("Download failed");
                          return;
                        }
                        const blob = await response.blob();
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = selectedRecord.medicalDocumentsName as string;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                      } catch (err) {
                        alert("Error downloading file");
                        console.error(err);
                      }
                    }}
                  >
                    Download
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
      </Dialog>

      {openNewDialog && (
        <MedicalRecordFormDialog onClose={() => setOpenNewDialog(false)} onSuccess={fetchRecords} />
      )}
    </Box>
  );
}

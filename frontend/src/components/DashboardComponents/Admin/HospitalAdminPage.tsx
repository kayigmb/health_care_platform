import { useEffect, useState } from "react";
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
import { MapPin, Phone, Plus, X } from "lucide-react";
import { Table } from "../../Table/Table";
import { useFetch } from "../../../hooks/useFetch";
import { APIRoutesNames } from "../../../utils/RoutesNames";
import type { ColumnProps } from "../../../types/Types.ts";
import { AddHospitalDialog } from "./AddHospitalPage.tsx";

interface HospitalType {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export function HospitalsAdminPage() {
  const [hospitals, setHospitals] = useState<HospitalType[]>([]);
  const [filtered, setFiltered] = useState<HospitalType[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<HospitalType | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const { fetchData, loading } = useFetch<HospitalType[], void>();

  async function fetchHospitals() {
    const res = await fetchData({ url: APIRoutesNames.HOSPITALS });
    if (res) {
      const hospitalsWithDates = res.map((h) => ({
        ...h,
        createdAt: new Date(h.createdAt),
        updatedAt: new Date(h.updatedAt)
      }));
      setHospitals(hospitalsWithDates);
      setFiltered(hospitalsWithDates);
    } else {
      setHospitals([]);
      setFiltered([]);
    }
  }

  useEffect(() => {
    fetchHospitals();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (!debouncedSearchTerm) {
      setFiltered(hospitals);
    } else {
      const lower = debouncedSearchTerm.toLowerCase();
      setFiltered(
        hospitals.filter(
          (h) =>
            h.name.toLowerCase().includes(lower) ||
            h.address.toLowerCase().includes(lower) ||
            h.phoneNumber.toLowerCase().includes(lower)
        )
      );
    }
  }, [debouncedSearchTerm, hospitals]);

  const columns: ColumnProps<HospitalType>[] = [
    {
      title: "Name",
      value: "name",
      renderCell: (hospital) => (
        <Box display="flex" alignItems="center" gap={1}>
          <MapPin size={16} />
          {hospital.name}
        </Box>
      )
    },
    {
      title: "Address",
      value: "address"
    },
    {
      title: "Phone",
      value: "phoneNumber",
      renderCell: (hospital) =>
        hospital.phoneNumber ? (
          <Box display="flex" alignItems="center" gap={1}>
            <Phone size={16} />
            {hospital.phoneNumber}
          </Box>
        ) : (
          "N/A"
        )
    },
    {
      title: "Created At",
      value: "createdAt",
      renderCell: (hospital) => hospital.createdAt.toLocaleDateString()
    }
  ];

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Hospitals List</Typography>
        <Button
          variant="contained"
          startIcon={<Plus size={18} />}
          onClick={() => setAddDialogOpen(true)}
        >
          Add Hospital
        </Button>
      </Box>

      <TextField
        fullWidth
        label="Search by name, address or phone"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />

      {loading ? (
        <Box mt={4} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <Table<HospitalType>
          data={filtered}
          columns={columns}
          pagination
          onRowClick={(hospital) => setSelectedHospital(hospital)}
        />
      )}

      <Dialog
        open={!!selectedHospital}
        onClose={() => setSelectedHospital(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Hospital Details
          <IconButton
            onClick={() => setSelectedHospital(null)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <X size={20} />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedHospital && (
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography>
                <strong>Name:</strong> {selectedHospital.name}
              </Typography>
              <Typography>
                <strong>Address:</strong> {selectedHospital.address}
              </Typography>
              <Typography>
                <strong>Phone:</strong> {selectedHospital.phoneNumber || "N/A"}
              </Typography>
              <Typography>
                <strong>Created At:</strong> {selectedHospital.createdAt.toLocaleString()}
              </Typography>
              <Typography>
                <strong>Updated At:</strong> {selectedHospital.updatedAt.toLocaleString()}
              </Typography>
              <Typography>
                <strong>Deleted:</strong> {selectedHospital.isDeleted ? "Yes" : "No"}
              </Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>

      <AddHospitalDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onSuccess={() => fetchHospitals()}
      />
    </Box>
  );
}

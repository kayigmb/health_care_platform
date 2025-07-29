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
import { Mail, Phone, User as LucideUser, X } from "lucide-react";
import { Table } from "../../Table/Table";
import { useFetch } from "../../../hooks/useFetch";
import { APIRoutesNames } from "../../../utils/RoutesNames";
import type { ColumnProps, UserShortType } from "../../../types/Types";
import { AddDoctorDialog } from "./AddDoctorDialog";

export function DoctorsAdminPage() {
  const [users, setUsers] = useState<UserShortType[]>([]);
  const [filtered, setFiltered] = useState<UserShortType[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserShortType | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const { fetchData, loading } = useFetch<UserShortType[], void>();
  const [addOpen, setAddOpen] = useState(false);

  const fetchUsers = async () => {
    const res = await fetchData({ url: `${APIRoutesNames.USERS}?role=doctor` });
    if (res) {
      setUsers(res);
      setFiltered(res);
    } else {
      setUsers([]);
      setFiltered([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (!debouncedSearchTerm) {
      setFiltered(users);
    } else {
      const lower = debouncedSearchTerm.toLowerCase();
      setFiltered(
        users.filter(
          (u) =>
            `${u.firstName} ${u.lastName}`.toLowerCase().includes(lower) ||
            u.email?.toLowerCase().includes(lower) ||
            u.phone?.toLowerCase().includes(lower)
        )
      );
    }
  }, [debouncedSearchTerm, users]);

  const columns: ColumnProps<UserShortType>[] = [
    {
      title: "Name",
      value: "firstName",
      renderCell: (user) => (
        <Box display="flex" alignItems="center" gap={1}>
          <LucideUser size={16} />
          {user.firstName} {user.lastName}
        </Box>
      )
    },
    {
      title: "Email",
      value: "email",
      renderCell: (user) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Mail size={16} />
          {user.email}
        </Box>
      )
    },
    {
      title: "Phone",
      value: "phone",
      renderCell: (user) =>
        user.phone ? (
          <Box display="flex" alignItems="center" gap={1}>
            <Phone size={16} />
            {user.phone}
          </Box>
        ) : (
          "N/A"
        )
    },
    {
      title: "Created At",
      value: "createdAt",
      renderCell: (user) => new Date(user.createdAt).toLocaleDateString()
    }
  ];

  if (loading) {
    return (
      <Box mt={4} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h5" mb={2}>
        Doctors List
      </Typography>

      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        alignItems="center"
        justifyContent="space-between"
        mb={2}
        gap={2}
      >
        <TextField
          fullWidth
          label="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={() => setAddOpen(true)}
          sx={{ whiteSpace: "nowrap", minWidth: "150px" }}
        >
          Add Doctor
        </Button>
      </Box>

      <Table<UserShortType>
        data={filtered}
        columns={columns}
        pagination
        onRowClick={(user) => setSelectedUser(user)}
      />

      <AddDoctorDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSuccess={() => {
          setAddOpen(false);
          fetchUsers();
        }}
        excludedUserIds={users.map((u) => u.id)}
      />

      <Dialog open={!!selectedUser} onClose={() => setSelectedUser(null)} fullWidth maxWidth="sm">
        <DialogTitle>
          Doctor Details
          <IconButton
            onClick={() => setSelectedUser(null)}
            sx={{ position: "absolute", right: 8, top: 8 }}
            aria-label="close"
          >
            <X size={20} />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedUser && (
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography>
                <strong>Name:</strong> {selectedUser.firstName} {selectedUser.lastName}
              </Typography>
              <Typography>
                <strong>Email:</strong> {selectedUser.email}
              </Typography>
              <Typography>
                <strong>Phone:</strong> {selectedUser.phone || "N/A"}
              </Typography>
              <Typography>
                <strong>Created At:</strong> {new Date(selectedUser.createdAt).toLocaleString()}
              </Typography>
              <Typography>
                <strong>Roles:</strong>
              </Typography>
              <Typography>
                <strong>User System ID:</strong> {selectedUser.userSystemId || "N/A"}
              </Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}

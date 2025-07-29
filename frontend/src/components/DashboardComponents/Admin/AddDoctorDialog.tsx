import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent
} from "@mui/material";
import { useEffect, useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { APIRoutesNames } from "../../../utils/RoutesNames";
import type { HospitalType, RoleType, UserShortType } from "../../../types/Types";

interface AddDoctorDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  excludedUserIds?: string[];
}

export function AddDoctorDialog({
  open,
  onClose,
  onSuccess,
  excludedUserIds = []
}: Readonly<AddDoctorDialogProps>) {
  const [users, setUsers] = useState<UserShortType[]>([]);
  const [hospitals, setHospitals] = useState<HospitalType[]>([]);
  const [hospitalRoleId, setHospitalRoleId] = useState<string>("");

  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedHospital, setSelectedHospital] = useState<string>("");

  const { fetchData: fetchUsers } = useFetch<UserShortType[], void>();
  const { fetchData: fetchRoles } = useFetch<RoleType[], void>();
  const { fetchData: fetchHospitals } = useFetch<HospitalType[], void>();
  const { fetchData: submitData, loading } = useFetch<void, object>();

  useEffect(() => {
    if (open) {
      // Fetch users
      fetchUsers({ url: APIRoutesNames.USERS }).then((res) => {
        if (res) {
          setUsers(res);
        } else {
          setUsers([]);
        }
      });

      // Fetch roles and find hospital role
      fetchRoles({ url: APIRoutesNames.ROLES }).then((res) => {
        if (res && res.length > 0) {
          const hospitalRole = res.find((role) => role.name.toLowerCase().includes("doctor"));

          if (hospitalRole) {
            setHospitalRoleId(hospitalRole.id);
          } else {
            setHospitalRoleId("");
          }
        } else {
          setHospitalRoleId("");
        }
      });

      // Fetch hospitals
      fetchHospitals({ url: APIRoutesNames.HOSPITALS }).then((res) => {
        if (res) {
          setHospitals(res);
        } else {
          setHospitals([]);
        }
      });

      // Reset selections
      setSelectedUser("");
      setSelectedHospital("");
    }
  }, [open]);

  const filteredUsers = users.filter((user) => !excludedUserIds.includes(user.id));

  const handleSubmit = async () => {
    if (!hospitalRoleId) {
      return;
    }

    if (!selectedUser || !selectedHospital) {
      return;
    }

    const payload = {
      userId: selectedUser,
      roleId: hospitalRoleId,
      hospitalId: selectedHospital
    };

    try {
      const res = await submitData({
        url: APIRoutesNames.ROLE_SCOPES,
        method: "POST",
        body: payload
      });

      if (res !== undefined) {
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const isDisabled = !selectedUser || !selectedHospital || loading;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Assign Doctor to Hospital</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <InputLabel id="user-select-label">User</InputLabel>
          <Select
            labelId="user-select-label"
            id="user-select"
            value={selectedUser}
            onChange={(e: SelectChangeEvent) => setSelectedUser(e.target.value)}
            displayEmpty
            renderValue={(selected) => {
              const user = filteredUsers.find((u) => u.id === selected);
              return user ? `${user.firstName} ${user.lastName}` : "";
            }}
          >
            <MenuItem value="" disabled>
              Select a user
            </MenuItem>
            {filteredUsers.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.firstName} {user.lastName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="hospital-select-label">Hospital</InputLabel>
          <Select
            labelId="hospital-select-label"
            id="hospital-select"
            value={selectedHospital}
            onChange={(e: SelectChangeEvent) => setSelectedHospital(e.target.value)}
            displayEmpty
            renderValue={(selected) => {
              const hospital = hospitals.find((h) => h.id === selected);
              return hospital ? hospital.name : "";
            }}
          >
            <MenuItem value="" disabled>
              Select a hospital
            </MenuItem>
            {hospitals.map((hospital) => (
              <MenuItem key={hospital.id} value={hospital.id}>
                {hospital.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={isDisabled}>
          {loading ? <CircularProgress size={20} /> : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

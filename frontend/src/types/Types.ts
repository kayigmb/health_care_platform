import React from "react";

export type RegisterForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
};

export type LoginForm = {
  email: string;
  password: string;
};

export interface RoleType {
  id: string;
  name: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface RoleScopeType {
  id: string;
  userId: string;
  roleId: string;
  hospitalId?: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface HospitalType {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  rolesScopes?: RoleScopeType[];
}

export interface UserShortType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  userSystemId?: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserType {
  user: UserShortType;
  roles: string[];
}

export interface MedicalRecordType {
  id: string;
  patientId: string;
  doctorId: string;
  hospitalId: string;
  diagnosis: string;
  treatment: string;
  notes: string;
  medicalDocumentsName?: string;
  medicalDocumentsType?: string;
  medicalDocumentsContent?: string;
  patient: UserShortType;
  doctor: UserShortType;
  hospital: HospitalType;
  createdAt: Date;
}

export interface BaseItem {
  id: string;
}

export interface ColumnProps<T extends BaseItem> {
  title?: string;
  value: keyof T;
  renderCell?: (item: T, column: ColumnProps<T>) => React.ReactNode;
  renderHeaderCell?: () => React.ReactNode;
}

export const TableVariants = {
  DEFAULT: "default",
  SECONDARY: "secondary_table"
} as const;

export interface TableProps<T extends BaseItem> {
  data: T[];
  columns: ColumnProps<T>[];
  pagination?: boolean;
  variant?: (typeof TableVariants)[keyof typeof TableVariants];
}

export type AppointmentStatus = "pending" | "confirmed" | "cancelled" | "completed";

export interface AppointmentType {
  id: string;
  patientId: string;
  doctorId: string;
  hospitalId: string;
  status: AppointmentStatus;
  appointmentDate: Date;
  service: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  patient: UserShortType;
  doctor: UserShortType;
  hospital: HospitalType;
}

export interface MedicalTable extends MedicalRecordType {
  actions?: React.ReactNode;
}

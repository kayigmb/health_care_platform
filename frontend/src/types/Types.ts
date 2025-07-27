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

export interface UserType {
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

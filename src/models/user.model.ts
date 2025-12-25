export interface User {
  id: string;
  userName: string;
  email: string;
  isActive: boolean;
  firstNameTh?: string;
  lastNameTh?: string;
  firstNameEn?: string;
  lastNameEn?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

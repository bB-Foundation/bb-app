import {Nullable} from './tools';

type User = {
  bbId: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  fullPublicKey: Nullable<string>;
  address: Nullable<string>;
};

export type UserProfile = {
  bbId: string;
  email: string;
};

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
}

export enum UserRole {
  ADMIN = 'ADMIN',
  BB = 'BB',
}

export default User;

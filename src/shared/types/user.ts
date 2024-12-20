import {Nullable} from './tools';

type User = {
  bbId: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  fullPublicKey: Nullable<string>;
  accountAddress: Nullable<string>;
};

export type UserProfile = {
  userId: number;
  bbId: string;
  email: string;
  accountAddress: Nullable<string>;
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

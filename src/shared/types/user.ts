import {Nullable} from './tools';

type User = {
  id: number;
  bbId: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  fullPublicKey: Nullable<string>;
  accountAddress: Nullable<string>;
};

export type UserProfile = {
  userId: number;
  bbId: Nullable<string>;
  email: string;
  accountAddress: Nullable<string>;
  teamName: string;
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

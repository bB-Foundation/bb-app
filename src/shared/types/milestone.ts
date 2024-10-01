import {Nullable} from './tools';

type Milestone = {
  uuid: string;
  longitude: Nullable<string>;
  latitude: Nullable<string>;
  rarityLevel: Nullable<string>;
  status: MilestoneStatus;
};

export enum MilestoneStatus {
  PENDING = 'PENDING', // Milestone hasn't been touched yet
  LAUNCHED = 'LAUNCHED', // Milestone is being actively worked on
  COMPLETED = 'COMPLETED', // Milestone has been successfully achieved
  CANCELLED = 'CANCELLED', // Milestone was removed or abandoned
}

export default Milestone;

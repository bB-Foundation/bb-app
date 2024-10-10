import {Nullable} from '../tools';

type QuestTask = {
  id: number;
  uuid: string;
  longitude: Nullable<string>;
  latitude: Nullable<string>;
  rarityLevel: Nullable<string>;
  status: TaskStatus;
};

export enum TaskStatus {
  PENDING = 'PENDING',
  LAUNCHED = 'LAUNCHED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export default QuestTask;

import Milestone from '../milestone';
import {Nullable} from '../tools';
import User from '../user';

type Quest = {
  id: number;
  title: string;
  description: string;
  difficulty: QuestDifficultyLevel;
  latitude: string;
  longitude: string;
  contractAddress: Nullable<string>;
  category: QuestCategory;
  status: QuestStatus;
  milestones: Milestone[];
  users: User[];
};

export enum QuestStatus {
  PENDING = 'PENDING',
  LAUNCHED = 'LAUNCHED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum QuestDifficultyLevel {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

export enum QuestCategory {
  SPORTS_FITNESS = 'SPORTS_FITNESS',
  NUTRITION_HEALTH = 'NUTRITION_HEALTH',
  ARTS = 'ARTS',
  EDUCATION = 'EDUCATION',
  ENVIRONMENT = 'ENVIRONMENT',
}

export default Quest;

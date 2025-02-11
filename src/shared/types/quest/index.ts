import QuestTask from './quest-task';
import {Nullable} from '../tools';
import User from '../user';
import {ChatRoom} from 'types/chat-room';

type Quest = {
  id: number;
  title: string;
  description: string;
  latitude: string;
  longitude: string;
  contractAddress: Nullable<string>;
  category: QuestCategory;
  status: QuestStatus;
  imgUrl: string;
  tasks: QuestTask[];
  users: User[];
  rooms: ChatRoom[];
};

export enum QuestStatus {
  PENDING = 'pending',
  LAUNCHED = 'launched',
  COMPLETED = 'completed',
  CANCELLED = 'canceled',
}

export enum QuestDifficultyLevel {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

export enum QuestCategory {
  SPORTS_FITNESS = 'SportsFitness',
  NUTRITION_HEALTH = 'NutritionHealth',
  ARTS = 'Arts',
  EDUCATION = 'Education',
  ENVIRONMENT = 'Environment',
}

export default Quest;

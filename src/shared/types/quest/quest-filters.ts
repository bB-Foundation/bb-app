import {QuestCategory} from '.';

type QuestFilters = {
  /** Distance in unit from user */
  distance: number;
  distanceUnit: DistanceUnit;
  latitude: string;
  longitude: string;
  country?: string;
  city?: string;
  category?: QuestCategory;
  startDate?: string;
  endDate?: string;
  timeOfDay?: TimeOfDay;
  minRewards?: number;
};

export enum TimeOfDay {
  MORNING = 'MORNING',
  AFTERNOON = 'AFTERNOON',
  EVENING = 'EVENING',
}

export enum DistanceUnit {
  KM = 'km',
  MILES = 'miles',
}

export default QuestFilters;

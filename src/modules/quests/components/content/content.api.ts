import api from 'configs/axios';

import Quest from 'types/quest';
import QuestFilters from 'types/quest/quest-filters';
import {getDistanceBetweenPointsInKm} from 'src/shared/utils/location';
import QuestWithDistance from 'types/quest/quest-with-distance';

export const getQuests = async (
  filters: QuestFilters,
): Promise<{quests: Quest[]}> =>
  (await api.get<{quests: Quest[]}>('/quest', {params: filters})).data;

export const calculateDistanceFromQuestInKm = (
  userLatitude: string,
  userLongitude: string,
  quest: Quest,
): number =>
  getDistanceBetweenPointsInKm(
    +userLatitude,
    +userLongitude,
    +quest.latitude,
    +quest.longitude,
  );

export const calculateQuestsDistance = (
  {latitude, longitude}: {latitude: string; longitude: string},
  quests: Quest[],
): QuestWithDistance[] =>
  quests.map(q => {
    const distanceInKm = calculateDistanceFromQuestInKm(latitude, longitude, q);
    return {...q, distanceInKm};
  });

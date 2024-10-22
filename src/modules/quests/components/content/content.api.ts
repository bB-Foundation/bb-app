import api from 'configs/axios';

import Quest from 'types/quest';
import QuestFilters from 'types/quest/quest-filters';
import {getDistanceBetweenPointsInKm} from 'src/shared/utils/location';
import QuestWithDistance from 'types/quest/quest-with-distance';
import countries from 'src/assets/data/countries';
import cities from 'src/assets/data/cities';

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

export const formatQuestFilterValues = (filters: QuestFilters) => {
  let updatedFilters = {...filters};

  if (filters.country) {
    const selectedCountry = countries.find(c => c.id === filters.country);
    if (!selectedCountry) throw Error;

    const {latitude, longitude} = selectedCountry;
    updatedFilters = {...updatedFilters, latitude, longitude};
  }

  if (filters.city) {
    const selectedCity = cities.find(c => c.id === filters.city);
    if (!selectedCity) throw Error;

    const {latitude, longitude} = selectedCity;
    updatedFilters = {...updatedFilters, latitude, longitude};
  }

  delete updatedFilters.city;
  delete updatedFilters.country;

  return updatedFilters;
};

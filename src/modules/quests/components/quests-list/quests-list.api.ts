import {getDistanceBetweenPointsInKm} from 'src/shared/utils/location';

export const getDistanceFromQuest = (
  userPosition: {latitude: number; longitude: number},
  questPosition: {latitude: string; longitude: string},
): string => {
  const distanceFromQuestInKm = getDistanceBetweenPointsInKm(
    userPosition.latitude,
    userPosition.longitude,
    +questPosition.latitude,
    +questPosition.longitude,
  );

  let distanceLabel = '';

  if (distanceFromQuestInKm < 1) {
    distanceLabel = `${Math.round(distanceFromQuestInKm * 1000)}m`;
  } else {
    if (distanceFromQuestInKm.toFixed(1).toString().split('.')[1] === '0') {
      distanceLabel = `${distanceFromQuestInKm.toFixed(0)} km`;
    } else {
      distanceLabel = `${distanceFromQuestInKm.toFixed(1)} km`;
    }
  }

  return distanceLabel;
};

import MapView from 'react-native-maps';

import QuestWithDistance from 'types/quest/quest-with-distance';

export const fitToQuests = (
  map: MapView,
  quests: QuestWithDistance[],
  userPosition: {latitude: number; longitude: number},
) => {
  if (!quests.length) return;

  const questsCoordinates = quests.map(q => ({
    latitude: +q.latitude,
    longitude: +q.longitude,
  }));

  map.fitToCoordinates([...questsCoordinates, userPosition], {
    edgePadding: {top: 100, right: 100, bottom: 100, left: 100},
    animated: true,
  });
};

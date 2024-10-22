import {GeoPosition} from 'react-native-geolocation-service';

import QuestWithDistance from 'types/quest/quest-with-distance';

export type QuestsListProps = {
  quests: QuestWithDistance[];
  geoPosition: GeoPosition;
};

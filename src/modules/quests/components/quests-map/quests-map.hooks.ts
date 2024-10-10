import {useNavigation} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import MapView, {UserLocationChangeEvent} from 'react-native-maps';

import QuestWithDistance from 'types/quest/quest-with-distance';
import {NavigationProp} from 'src/modules/navigation/navigation.types';

export const useMapLogic = (quests: QuestWithDistance[]) => {
  const mapRef = useRef<MapView>(null);

  const navigation = useNavigation<NavigationProp>();

  const [isCameraMovedToUserPoint, setIsCameraMovedToUserPoint] =
    useState(false);

  const [startingUserCoordinates, setStartingUserCoordinates] = useState<{
    latitude: number;
    longitude: number;
  }>();

  const onUserLocationChange = (e: UserLocationChangeEvent) => {
    if (isCameraMovedToUserPoint) return;

    const {coordinate} = e.nativeEvent;

    mapRef.current?.setCamera({
      center: coordinate,
      zoom: 10,
    });

    setStartingUserCoordinates(coordinate);
    setIsCameraMovedToUserPoint(true);
  };

  const goToQuest = (questId: number) => {
    navigation.navigate('quest', {questId});
  };

  /** fit map to all quests markers */
  useEffect(() => {
    if (!quests.length) return;

    if (quests.length === 1) {
      if (!startingUserCoordinates) return;

      mapRef.current?.fitToCoordinates(
        [
          {
            latitude: startingUserCoordinates.latitude,
            longitude: startingUserCoordinates.longitude,
          },
          {
            latitude: +quests[0].latitude,
            longitude: +quests[0].longitude,
          },
        ],
        {
          edgePadding: {top: 100, right: 100, bottom: 100, left: 100},
          animated: true,
        },
      );
    } else {
      mapRef.current?.fitToSuppliedMarkers(
        quests.map(quest => quest.id.toString()),
        {
          edgePadding: {top: 100, right: 100, bottom: 100, left: 100},
          animated: true,
        },
      );
    }
  }, [quests, startingUserCoordinates]);

  return {mapRef, onUserLocationChange, goToQuest};
};

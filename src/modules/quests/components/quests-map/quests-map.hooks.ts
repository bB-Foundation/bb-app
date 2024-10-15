import {useEffect, useRef, useState} from 'react';
import {Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MapView, {UserLocationChangeEvent} from 'react-native-maps';
import {useQueryClient} from '@tanstack/react-query';

import QuestWithDistance from 'types/quest/quest-with-distance';
import {NavigationProp} from 'src/modules/navigation/navigation.types';
import queryKeys from 'configs/query-keys';
import {fitToQuests} from './quests-map.api';

export const useMapLogic = (quests: QuestWithDistance[]) => {
  const mapRef = useRef<MapView>(null);

  const navigation = useNavigation<NavigationProp>();

  const queryClient = useQueryClient();

  const [isCameraMovedToUserPoint, setIsCameraSetToUserPoint] = useState(false);

  const [startingUserCoordinates, setStartingUserCoordinates] = useState<{
    latitude: number;
    longitude: number;
  }>();

  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const [isMapReady, setIsMapReady] = useState(false);

  const onUserLocationChange = (e: UserLocationChangeEvent) => {
    if (isCameraMovedToUserPoint) return;

    const {coordinate} = e.nativeEvent;

    mapRef.current?.setCamera({
      center: coordinate,
      zoom: 10,
    });

    setStartingUserCoordinates(coordinate);
    setIsCameraSetToUserPoint(true);
  };

  const goToQuest = (quest: QuestWithDistance) => {
    const queryKey = queryKeys.getQuestById(quest.id);
    queryClient.setQueryData(queryKey, quest);

    navigation.navigate('quest', {questId: quest.id});
  };

  const onMapLoaded = () => {
    if (Platform.OS === 'ios') return;
    setIsMapLoaded(true);
  };

  const onMapReady = () => {
    if (Platform.OS === 'android') return;
    setIsMapReady(true);
  };

  /** Fit ios map to all quests */
  useEffect(() => {
    if (Platform.OS === 'android') return;
    if (!startingUserCoordinates || !isMapReady) return;

    const map = mapRef.current;
    if (!map) return;

    fitToQuests(map, quests, startingUserCoordinates);
  }, [quests, startingUserCoordinates, isMapReady]);

  /** Fit android map to all quests */
  useEffect(() => {
    if (Platform.OS === 'ios') return;
    if (!startingUserCoordinates || !isMapLoaded) return;

    const map = mapRef.current;
    if (!map) return;

    fitToQuests(map, quests, startingUserCoordinates);
  }, [quests, startingUserCoordinates, isMapLoaded]);

  return {mapRef, onUserLocationChange, goToQuest, onMapLoaded, onMapReady};
};

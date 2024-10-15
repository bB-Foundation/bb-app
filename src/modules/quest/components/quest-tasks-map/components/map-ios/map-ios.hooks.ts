import {useRef} from 'react';
import MapView from 'react-native-maps';

import QuestTasks from 'types/quest/quest-task';
import {fitToQuestTasks} from '../../quest-tasks-map.api';

export const useMapLogic = (questTasks: QuestTasks[]) => {
  const mapRef = useRef<MapView>(null);

  const onMapReady = () => {
    const map = mapRef.current;
    if (!map) return;

    fitToQuestTasks(map, questTasks);
  };

  return {mapRef, onMapReady};
};

import {useRef} from 'react';
import MapView from 'react-native-maps';

import QuestTasks from 'types/quest/quest-task';

export const useMapLogic = (questTasks: QuestTasks[]) => {
  const mapRef = useRef<MapView>(null);

  const fitToQuestTasks = () => {
    if (!questTasks.length) return;

    if (questTasks.length === 1) {
      const {latitude, longitude} = questTasks[0];
      if (!latitude || !longitude) return;

      mapRef.current?.setCamera({
        center: {latitude: +latitude, longitude: +longitude},
        zoom: 14,
      });
    } else {
      mapRef.current?.fitToSuppliedMarkers(
        questTasks.map(t => t.uuid),
        {
          edgePadding: {top: 100, right: 100, bottom: 100, left: 100},
          animated: false,
        },
      );
    }
  };

  return {mapRef, fitToQuestTasks};
};

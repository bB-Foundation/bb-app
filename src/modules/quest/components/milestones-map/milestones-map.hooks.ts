import {useRef} from 'react';
import MapView from 'react-native-maps';

import Milestone from 'types/milestone';

export const useMapLogic = (milestones: Milestone[]) => {
  const mapRef = useRef<MapView>(null);

  const fitToMilestones = () => {
    if (!milestones.length) return;

    if (milestones.length === 1) {
      const {latitude, longitude} = milestones[0];
      if (!latitude || !longitude) return;

      mapRef.current?.setCamera({
        center: {latitude: +latitude, longitude: +longitude},
        zoom: 14,
      });
    } else {
      mapRef.current?.fitToSuppliedMarkers(
        milestones.map(m => m.uuid),
        {
          edgePadding: {top: 100, right: 100, bottom: 100, left: 100},
          animated: false,
        },
      );
    }
  };

  return {mapRef, fitToMilestones};
};

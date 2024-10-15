import React, {FC} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

import styles from '../../quest-tasks-map.styles';
import {QuestTasksMapProps} from '../../quest-tasks-map.types';
import {Markers} from '../markers';
import {useMapLogic} from './map-android.hooks';

export const QuestTasksMapAndroid: FC<QuestTasksMapProps> = ({questTasks}) => {
  const {mapRef, isNavigationAnimationFinished, isMapPositionSet, onMapLoaded} =
    useMapLogic(questTasks);

  if (!isNavigationAnimationFinished) return null;

  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      style={isMapPositionSet ? styles.root : styles.hidden}
      showsUserLocation
      showsMyLocationButton
      onMapLoaded={onMapLoaded}>
      <Markers questTasks={questTasks} />
    </MapView>
  );
};

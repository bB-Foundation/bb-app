import React, {FC} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

import styles from '../../quest-tasks-map.styles';
import {useMapLogic} from './map-ios.hooks';
import {QuestTasksMapProps} from '../../quest-tasks-map.types';
import {Markers} from '../markers';

export const QuestTasksMapIos: FC<QuestTasksMapProps> = ({questTasks}) => {
  const {mapRef, onMapReady} = useMapLogic(questTasks);

  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      style={styles.root}
      showsUserLocation
      showsMyLocationButton
      onMapReady={onMapReady}>
      <Markers questTasks={questTasks} />
    </MapView>
  );
};

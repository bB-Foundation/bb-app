import React, {FC} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import styles from './quest-tasks-map.styles';
import {useMapLogic} from './quest-tasks-map.hooks';
import {QuestTasksMapProps} from './quest-tasks-map.types';

export const QuestTasksMap: FC<QuestTasksMapProps> = ({questTasks}) => {
  const {mapRef, fitToQuestTasks} = useMapLogic(questTasks);

  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      style={styles.root}
      showsUserLocation
      showsMyLocationButton
      onMapReady={fitToQuestTasks}>
      {questTasks.map(t => {
        if (!t.latitude || !t.longitude) return null;

        return (
          <Marker
            key={t.uuid}
            identifier={t.uuid}
            coordinate={{
              latitude: +t.latitude,
              longitude: +t.longitude,
            }}
          />
        );
      })}
    </MapView>
  );
};

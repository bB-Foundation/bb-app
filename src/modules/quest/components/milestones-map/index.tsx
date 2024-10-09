import React, {FC} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import styles from './milestones-map.styles';
import {useMapLogic} from './milestones-map.hooks';
import {MilestonesMapProps} from './milestones-map.types';

export const MilestonesMap: FC<MilestonesMapProps> = ({milestones}) => {
  const {mapRef, fitToMilestones} = useMapLogic(milestones);

  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      style={styles.root}
      showsUserLocation
      showsMyLocationButton
      onMapReady={fitToMilestones}>
      {milestones.map(m => {
        if (!m.latitude || !m.longitude) return null;

        return (
          <Marker
            key={m.uuid}
            identifier={m.uuid}
            coordinate={{
              latitude: +m.latitude,
              longitude: +m.longitude,
            }}
          />
        );
      })}
    </MapView>
  );
};

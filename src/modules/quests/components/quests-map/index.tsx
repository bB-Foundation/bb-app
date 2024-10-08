import React, {FC} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import {QuestsMapProps} from './quests-map.types';
import styles from './quests-map.styles';
import {useMapLogic} from './quests-map.hooks';

export const QuestsMap: FC<QuestsMapProps> = ({quests}) => {
  const {mapRef, onUserLocationChange} = useMapLogic(quests);

  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      style={styles.root}
      showsUserLocation
      showsMyLocationButton
      onUserLocationChange={onUserLocationChange}>
      {quests.map(quest => (
        <Marker
          key={quest.id}
          identifier={quest.id.toString()}
          coordinate={{
            latitude: +quest.latitude,
            longitude: +quest.longitude,
          }}
          title={quest.title}
          description={quest.description}
        />
      ))}
    </MapView>
  );
};

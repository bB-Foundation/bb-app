import React, {FC} from 'react';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {Text} from '@ui-kitten/components';

import styles from './quests-map.styles';
import {useMapLogic} from './quests-map.hooks';
import {QuestsMapProps} from './quests-map.types';

export const QuestsMap: FC<QuestsMapProps> = ({quests}) => {
  const {mapRef, onUserLocationChange, goToQuest, onMapLoaded} =
    useMapLogic(quests);

  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      style={styles.root}
      showsUserLocation
      showsMyLocationButton
      onUserLocationChange={onUserLocationChange}
      onMapLoaded={onMapLoaded}>
      {quests.map(q => (
        <Marker
          key={q.id}
          identifier={q.id.toString()}
          coordinate={{
            latitude: +q.latitude,
            longitude: +q.longitude,
          }}
          title={q.title}
          description={q.description}
          onPress={() => goToQuest(q)}>
          <Callout>
            <Text>{q.title}</Text>
          </Callout>
        </Marker>
      ))}
    </MapView>
  );
};

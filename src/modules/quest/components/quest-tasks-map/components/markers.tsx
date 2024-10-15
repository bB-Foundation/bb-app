import React, {FC} from 'react';
import {Marker} from 'react-native-maps';

import QuestTask from 'types/quest/quest-task';

export const Markers: FC<{questTasks: QuestTask[]}> = ({questTasks}) => {
  return (
    <>
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
    </>
  );
};

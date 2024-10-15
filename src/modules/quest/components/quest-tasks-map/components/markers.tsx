import React, {FC} from 'react';
import {Marker} from 'react-native-maps';
import {getCompletedTasks} from 'src/shared/utils/storage';

import QuestTask from 'types/quest/quest-task';

export const Markers: FC<{questTasks: QuestTask[]}> = ({questTasks}) => {
  const completedQuestTasks = getCompletedTasks();

  return (
    <>
      {questTasks.map(t => {
        if (!t.latitude || !t.longitude) return null;

        const isCompleted = completedQuestTasks.includes(t.id);

        return (
          <Marker
            key={t.uuid}
            identifier={t.uuid}
            coordinate={{
              latitude: +t.latitude,
              longitude: +t.longitude,
            }}
            pinColor={isCompleted ? 'green' : undefined}
          />
        );
      })}
    </>
  );
};

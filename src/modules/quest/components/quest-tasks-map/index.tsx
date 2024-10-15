import React, {FC} from 'react';
import {Platform} from 'react-native';

import {QuestTasksMapAndroid} from './components/map-android';
import {QuestTasksMapProps} from './quest-tasks-map.types';
import {QuestTasksMapIos} from './components/map-ios';

const QuestTasksMap: FC<QuestTasksMapProps> = ({questTasks}) => {
  return Platform.OS === 'ios' ? (
    <QuestTasksMapIos questTasks={questTasks} />
  ) : (
    <QuestTasksMapAndroid questTasks={questTasks} />
  );
};

export default QuestTasksMap;

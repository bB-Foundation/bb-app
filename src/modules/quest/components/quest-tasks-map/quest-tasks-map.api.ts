import MapView from 'react-native-maps';

import QuestTask from 'types/quest/quest-task';

export const fitToQuestTasks = (map: MapView, questTasks: QuestTask[]) => {
  if (!questTasks.length) return;

  if (questTasks.length === 1) {
    const {latitude, longitude} = questTasks[0];
    if (!latitude || !longitude) return;

    map.setCamera({
      center: {latitude: +latitude, longitude: +longitude},
      zoom: 14,
    });
  } else {
    map.fitToSuppliedMarkers(
      questTasks.map(t => t.uuid),
      {
        edgePadding: {top: 100, right: 100, bottom: 100, left: 100},
        animated: false,
      },
    );
  }
};

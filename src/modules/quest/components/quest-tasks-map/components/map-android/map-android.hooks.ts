import {useEffect, useRef, useState} from 'react';
import MapView from 'react-native-maps';

import QuestTask from 'types/quest/quest-task';
import {fitToQuestTasks} from '../../quest-tasks-map.api';

export const useMapLogic = (questTasks: QuestTask[]) => {
  const mapRef = useRef<MapView>(null);

  const [isNavigationAnimationFinished, setIsNavigationAnimationFinished] =
    useState(false);

  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const [isMapPositionSet, setIsMapPositionSet] = useState(false);

  const onMapLoaded = () => setIsMapLoaded(true);

  /** Toggle the flag after the navigation animation ends */
  useEffect(() => {
    (async () => {
      await new Promise(res => setTimeout(res, 700));
      setIsNavigationAnimationFinished(true);
    })();
  }, []);

  /** Fit the map to the quest tasks when the map is loaded */
  useEffect(() => {
    if (!isMapLoaded) return;

    const map = mapRef.current;
    if (!map) return;

    fitToQuestTasks(map, questTasks);

    setTimeout(() => setIsMapPositionSet(true), 200);
  }, [isMapLoaded, questTasks]);

  /** Toggle the flag after the navigation animation ends */
  // useFocusEffect(
  //   useCallback(() => {
  //     const unsubscribe = navigation.addListener('transitionEnd', e => {
  //       if (e.data.closing === false) {
  //         setIsNavigationAnimationFinished(true);
  //       }
  //     });

  //     return () => unsubscribe;
  //   }, [navigation]),
  // );

  return {mapRef, isNavigationAnimationFinished, isMapPositionSet, onMapLoaded};
};

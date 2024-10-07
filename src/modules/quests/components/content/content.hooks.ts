import {useEffect} from 'react';
import {useQuery} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {GeoPosition} from 'react-native-geolocation-service';

import queryKeys from 'configs/query-keys';
import QuestFilters from 'types/quest/quest-filters';
import QuestWithDistance from 'types/quest/quest-with-distance';
import {calculateQuestsDistance, getQuests} from './content.api';
import {hideLoader} from 'src/redux-store/slices/quests-page';
import {Errors} from 'src/enums/errors';
import {RootState} from 'src/redux-store';
import Quest from 'types/quest';

export const useContentLogic = (geoPosition: GeoPosition) => {
  const dispatch = useDispatch();

  const {questsFilters} = useSelector((state: RootState) => state.questsPage);

  const {
    data: quests = [],
    error: loadQuestsError,
    isSuccess,
  } = useQuests({
    ...questsFilters,
    latitude: geoPosition.coords.latitude.toFixed(6).toString(),
    longitude: geoPosition.coords.longitude.toFixed(6).toString(),
  });
  if (loadQuestsError) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: Errors.UNKNOWN,
    });
  }

  /** hide loader after quests are loaded or after error */
  useEffect(() => {
    dispatch(hideLoader());
  }, [isSuccess, dispatch]);

  return {
    quests,
  };
};

const useQuests = (filters: QuestFilters) => {
  // TODO DELETE ROW
  delete filters.minRewards;

  return useQuery<{quests: Quest[]}, Error, QuestWithDistance[]>({
    queryKey: queryKeys.getQuests(filters),
    queryFn: () => getQuests(filters),
    select: ({quests}) => calculateQuestsDistance(filters, quests),
  });
};

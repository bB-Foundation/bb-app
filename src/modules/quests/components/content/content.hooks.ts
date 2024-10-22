import {useEffect, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {GeoPosition} from 'react-native-geolocation-service';

import queryKeys from 'configs/query-keys';
import QuestFilters from 'types/quest/quest-filters';
import QuestWithDistance from 'types/quest/quest-with-distance';
import {
  calculateQuestsDistance,
  formatQuestFilterValues,
  getQuests,
} from './content.api';
import {hideLoader, showLoader} from 'src/redux-store/slices/quests-page';
import {Errors} from 'src/enums/errors';
import {RootState} from 'src/redux-store';
import Quest from 'types/quest';

export const useContentLogic = (geoPosition: GeoPosition) => {
  const dispatch = useDispatch();

  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const {questsFilters} = useSelector((state: RootState) => state.questsPage);

  const {
    data: quests = [],
    error: loadQuestsError,
    isLoading: areLoadingQuests,
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

  /** hide loader after quests are loaded */
  useEffect(() => {
    if (areLoadingQuests) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [areLoadingQuests, dispatch]);

  return {
    quests,
    selectedTabIndex,
    setSelectedTabIndex,
  };
};

const useQuests = (filters: QuestFilters) => {
  delete filters.minRewards;

  const updatedFilters = formatQuestFilterValues(filters);

  return useQuery<{quests: Quest[]}, Error, QuestWithDistance[]>({
    queryKey: queryKeys.getQuests(updatedFilters),
    queryFn: () => getQuests(updatedFilters),
    select: ({quests}) => calculateQuestsDistance(updatedFilters, quests),
  });
};

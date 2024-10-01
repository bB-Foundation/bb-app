import {useQuery} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import {getQuests} from './quests.api';
import queryKeys from 'configs/query-keys';
import {Errors} from 'src/enums/errors';

export const useQuestsLogic = () => {
  const {data: quests = [], error: loadQuestsError} = useQuests();
  if (loadQuestsError) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: Errors.UNKNOWN,
    });
  }

  return {
    quests,
  };
};

const useQuests = () =>
  useQuery({
    queryKey: queryKeys.getQuests(),
    queryFn: getQuests,
    select: data => data.quests,
  });

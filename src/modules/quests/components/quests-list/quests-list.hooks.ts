import {useNavigation} from '@react-navigation/native';
import {useQueryClient} from '@tanstack/react-query';

import queryKeys from 'configs/query-keys';
import { NavigationProp } from 'src/modules/navigation/navigation.types';
import Quest from 'types/quest';

export const useQuestsListLogic = () => {
  const navigation = useNavigation<NavigationProp>();

  const queryClient = useQueryClient();

  const goToQuest = (quest: Quest) => {
    const queryKey = queryKeys.getQuestById(quest.id);
    queryClient.setQueryData(queryKey, quest);

    navigation.navigate('quest', {questId: quest.id});
  };

  return {
    goToQuest,
  };
};

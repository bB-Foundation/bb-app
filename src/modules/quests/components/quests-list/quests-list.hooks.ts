import {useNavigation} from '@react-navigation/native';
import {useQueryClient} from '@tanstack/react-query';
import {useSelector} from 'react-redux';

import queryKeys from 'configs/query-keys';
import {NavigationProp} from 'src/modules/navigation/navigation.types';
import Quest from 'types/quest';
import {RootState} from 'src/redux-store';

export const useQuestsListLogic = () => {
  const navigation = useNavigation<NavigationProp>();

  const queryClient = useQueryClient();

  const {showLoader: showLoader} = useSelector(
    (state: RootState) => state.questsPage,
  );

  const goToQuest = (quest: Quest) => {
    const queryKey = queryKeys.getQuestById(quest.id);
    queryClient.setQueryData(queryKey, quest);

    navigation.navigate('quest', {questId: quest.id});
  };

  return {
    showLoader,
    goToQuest,
  };
};

import {useEffect, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import {
  NavigationProp,
  QrCodeStackParamList,
} from '../navigation/navigation.types';
import {claimQuestTaskReward} from './check-quest-task-qr-code';
import {getApiOrUnknownErrorMessage} from 'src/shared/utils/errors';
import {markTaskAsCompleted} from 'src/shared/utils/storage';
import queryKeys from 'configs/query-keys';
import {getQuestById} from 'src/shared/api/quests';

export const useCheckQrCode = () => {
  const {
    params: {questTaskId},
  } = useRoute<RouteProp<QrCodeStackParamList, 'check-quest-task-qr-code'>>();

  const navigation = useNavigation<NavigationProp>();

  const [isProcessing, setIsProcessing] = useState(true);

  const queryClient = useQueryClient();

  const {mutateAsync: claimQuestTaskRewardAsync} = useClaimQuestTaskReward();

  /** claim quest task reward */
  useEffect(() => {
    (async () => {
      try {
        await new Promise(res => setTimeout(res, 1000));
        const questId = await claimQuestTaskRewardAsync(questTaskId);

        await queryClient.prefetchQuery({
          queryKey: queryKeys.getQuestById(questId),
          queryFn: () => getQuestById(questId),
        });

        markTaskAsCompleted(questTaskId);

        navigation.reset({
          index: 1,
          routes: [
            {
              name: 'main',
              state: {routes: [{name: 'quests'}]},
            },
            {
              name: 'main',
              state: {
                routes: [
                  {
                    name: 'quests',
                    state: {
                      routes: [
                        {
                          name: 'quest',
                          params: {questId},
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        });

        await new Promise(res => setTimeout(res, 500));
        Toast.show({
          type: 'success',
          text1: 'Congratulations',
          text2: 'Task completed!',
        });
      } catch (error) {
        navigation.reset({index: 0, routes: [{name: 'qr-scanner-camera'}]});

        await new Promise(res => setTimeout(res, 500));
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: getApiOrUnknownErrorMessage(error),
        });
      } finally {
        setIsProcessing(false);
      }
    })();
  }, [questTaskId, navigation, queryClient, claimQuestTaskRewardAsync]);

  return {isProcessing};
};

const useClaimQuestTaskReward = () =>
  useMutation({
    mutationFn: claimQuestTaskReward,
  });

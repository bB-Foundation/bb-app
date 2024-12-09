import {useCallback, useEffect} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useQueryClient} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import {
  NavigationProp,
  QrCodeStackParamList,
} from '../navigation/navigation.types';
import {getApiOrUnknownErrorMessage} from 'src/shared/utils/errors';
import {markTaskAsCompleted} from 'src/shared/utils/storage';
import queryKeys from 'configs/query-keys';
import {getQuestById} from 'src/shared/api/quests';
import {useWebViewMessage} from 'react-native-react-bridge';
import {
  getUserAccountAddress,
  getUserPrivateKey,
} from 'src/shared/utils/secure-storage';
import {isErrorMessage, WebAppEvents} from 'components/web-app/web-app.api';
import {FinishQuestTaskEvent} from 'components/web-app/web-app.types';
import {Errors} from 'src/enums/errors';
import {claimQuestTaskReward} from './check-quest-task-qr-code.api';

export const useCheckQrCode = () => {
  const {
    params: {questId, taskId, taskCode},
  } = useRoute<RouteProp<QrCodeStackParamList, 'check-quest-task-qr-code'>>();

  const navigation = useNavigation<NavigationProp>();

  const queryClient = useQueryClient();

  const errorHandler = useCallback(
    async (errorMessage: string) => {
      navigation.reset({
        index: 0,
        routes: [{name: 'qr-scanner-camera'}],
      });
      await new Promise(res => setTimeout(res, 500));
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: errorMessage,
      });
    },
    [navigation],
  );

  const {
    ref: webBrowserRef,
    onMessage: onWebBrowserMessage,
    emit: emitToWebBrowser,
  } = useWebViewMessage(async message => {
    switch (message.type) {
      case WebAppEvents.FINISH_QUEST_TASK_RESULT: {
        if (isErrorMessage(message)) {
          return errorHandler(Errors.UNKNOWN);
        }

        try {
          const {txHash} = message.data as {txHash: string};
          if (!txHash) throw Error('No transaction hash');

          await claimQuestTaskReward({taskId, txHash});
          markTaskAsCompleted(taskId);

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
          errorHandler(getApiOrUnknownErrorMessage(error));
        }
      }
    }
  });

  /** claim quest task reward */
  useEffect(() => {
    (async () => {
      try {
        await new Promise(res => setTimeout(res, 1000));

        const quest = await queryClient.fetchQuery({
          queryKey: queryKeys.getQuestById(questId),
          queryFn: () => getQuestById(questId),
        });

        const [privateKey, accountAddress] = await Promise.all([
          getUserPrivateKey(),
          getUserAccountAddress(),
        ]);

        if (!privateKey || !accountAddress || !quest.contractAddress)
          throw Error('Inconsistent FinishQuestTaskEvent data');

        const event: FinishQuestTaskEvent = {
          type: WebAppEvents.FINISH_QUEST_TASK,
          data: {
            taskId,
            taskCode,
            questAddress: quest.contractAddress,
            accountAddress,
            privateKey,
          },
        };
        emitToWebBrowser(event);
      } catch (error) {
        errorHandler(getApiOrUnknownErrorMessage(error));
      }
    })();
  }, [taskId, questId, taskCode, queryClient, emitToWebBrowser, errorHandler]);

  return {webBrowserRef, onWebBrowserMessage};
};

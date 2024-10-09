import {useEffect, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import {
  NavigationProp,
  QrCodeStackParamList,
} from '../navigation/navigation.types';
import {claimMilestoneReward} from './check-milestone-qr-code.api';
import {getApiOrUnknownErrorMessage} from 'src/shared/utils/errors';

export const useCheckQrCode = () => {
  const {
    params: {milestoneUuid},
  } = useRoute<RouteProp<QrCodeStackParamList, 'check-milestone-qr-code'>>();

  const navigation = useNavigation<NavigationProp>();

  const [isProcessing, setIsProcessing] = useState(true);

  const {mutateAsync: claimMilestoneRewardAsync} = useClaimMilestoneReward();

  /** claim milestone reward */
  useEffect(() => {
    (async () => {
      try {
        console.log(+milestoneUuid);
        await new Promise(res => setTimeout(res, 1000));
        await claimMilestoneRewardAsync(+milestoneUuid);

        navigation.reset({index: 0, routes: [{name: 'main'}]});

        await new Promise(res => setTimeout(res, 500));
        Toast.show({
          type: 'success',
          text1: 'Congratulations',
          text2: 'Milestone completed!',
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
  }, [milestoneUuid, navigation, claimMilestoneRewardAsync]);

  return {isProcessing};
};

const useClaimMilestoneReward = () =>
  useMutation({
    mutationFn: claimMilestoneReward,
  });

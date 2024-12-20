import React, {FC, useEffect} from 'react';
import {View} from 'react-native';
import {useWebViewMessage} from 'react-native-react-bridge';
import WebView from 'react-native-webview';

import styles from './sign-trade.styles';
import {isErrorMessage, WebAppEvents} from 'components/web-app/web-app.api';
import {getUserPrivateKey} from 'src/shared/utils/secure-storage';
import {GenerateSignatureEvent} from 'components/web-app/web-app.types';
import webApp from 'components/web-app';
import {getTradeById} from 'src/shared/api/trade';
import {SignTradeProps} from './sign-trade.types';

export const SignTrade: FC<SignTradeProps> = ({
  userId,
  tradeId,
  signTradeHandler,
}) => {
  const {
    ref: webBrowserRef,
    onMessage: onWebBrowserMessage,
    emit: emitToWebBrowser,
  } = useWebViewMessage(async message => {
    console.log('🚀 ~ message:', message);

    switch (message.type) {
      case WebAppEvents.GENERATE_SIGNATURE_RESULT: {
        if (isErrorMessage(message)) {
          return;
        }
        try {
          const {signature} = message.data as {signature: string};
          if (!signature) throw Error('No signature');

          signTradeHandler(signature);
        } catch (error) {
          // TODO add error handler
        }
      }
    }
  });

  useEffect(() => {
    (async () => {
      await new Promise(res => setTimeout(res, 1000));

      try {
        const privateKey = await getUserPrivateKey(userId);
        if (!privateKey) throw new Error('Inconsistent signature data');

        const {initiatorId, receiverId, initiatorGemIds, receiverGemIds} =
          await getTradeById(tradeId);

        const formattedInitiatorGemIds = initiatorGemIds.map(e => e.toString());
        const formattedReceiverGemIds = receiverGemIds.map(e => e.toString());

        const event: GenerateSignatureEvent = {
          type: WebAppEvents.GENERATE_SIGNATURE,
          data: {
            privateKey,
            initiatorId,
            receiverId,
            initiatorGemIds: formattedInitiatorGemIds,
            receiverGemIds: formattedReceiverGemIds,
          },
        };

        emitToWebBrowser(event);
      } catch (error) {
        // TODO add error handler
      }
    })();
  }, [userId, tradeId, emitToWebBrowser]);

  return (
    <View style={styles.hidden}>
      <WebView
        ref={webBrowserRef}
        source={{html: webApp}}
        onMessage={onWebBrowserMessage}
      />
    </View>
  );
};

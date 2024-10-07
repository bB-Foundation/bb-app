import React from 'react';
import axios from 'axios';
import {
  webViewRender,
  emit,
  useNativeMessage,
} from 'react-native-react-bridge/lib/web';
import {CallData, RpcProvider} from 'starknet';

import {
  createAccount,
  deployAccount,
  generateMessage,
  signMessage,
  web3Data,
  WebAppEvents,
} from './web-app.api';
import {DeployAccountMessage} from './web-app.types';

const WebApp = () => {
  useNativeMessage(async message => {
    if (message.type === WebAppEvents.CREATE_ACCOUNT) {
      try {
        const accountData = createAccount(web3Data.argentXaccountClassHash);
        emit({type: WebAppEvents.CREATE_ACCOUNT_RESULT, data: accountData});
      } catch (error) {
        emit({type: WebAppEvents.CREATE_ACCOUNT_RESULT, data: {error}});
      }
    }

    if (message.type === WebAppEvents.DEPLOY_ACCOUNT) {
      try {
        const messageData = message.data as DeployAccountMessage;

        const {
          accountAddress,
          publicKey,
          fullPublicKey,
          privateKey,
          encryptedPrivateKey,
          accessToken,
          baseApiUrl,
        } = messageData;

        const getSignatureMessage = generateMessage(
          accountAddress,
          encryptedPrivateKey,
        );

        const signature = await signMessage(privateKey, getSignatureMessage);

        await axios.post<string>(
          `${baseApiUrl}/user/register-account`,
          {
            accountAddress,
            encryptedPrivateKey,
            fullPublicKey,
            signature,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        await new Promise(resolve => setTimeout(resolve, 3000));

        const ConstructorCallData = CallData.compile({
          owner: publicKey,
          guardian: '0',
        });

        const deployAccountPayload = {
          classHash: web3Data.argentXaccountClassHash,
          constructorCalldata: ConstructorCallData,
          contractAddress: accountAddress,
          addressSalt: publicKey,
        };

        const provider = new RpcProvider({
          nodeUrl: web3Data.nodeUrl,
        });
        const txHash = await deployAccount(
          provider,
          privateKey,
          deployAccountPayload,
        );

        emit({type: WebAppEvents.DEPLOY_ACCOUNT_RESULT, data: txHash});
      } catch (error) {
        emit({type: WebAppEvents.DEPLOY_ACCOUNT_RESULT, data: {error}});
      }
    }
  });

  return null;
};

export default webViewRender(<WebApp />);

import React from 'react';
import axios from 'axios';
import {
  webViewRender,
  emit,
  useNativeMessage,
} from 'react-native-react-bridge/lib/web';
import {Account, CallData, Contract, RpcProvider} from 'starknet';

import {
  calculateMaxFee,
  createAccount,
  deployAccount,
  generateMessage,
  signMessage,
  web3Data,
  WebAppEvents,
} from './web-app.api';
import {Events} from './web-app.types';
import deployedContracts from 'src/assets/data/deployedContracts';

const WebApp = () => {
  useNativeMessage(async message => {
    const event = message as Events;

    switch (event.type) {
      case WebAppEvents.CREATE_ACCOUNT: {
        try {
          const accountData = createAccount(web3Data.argentXaccountClassHash);
          emit({
            type: WebAppEvents.CREATE_ACCOUNT_RESULT,
            data: accountData,
          });
        } catch (error) {
          emit({type: WebAppEvents.CREATE_ACCOUNT_RESULT, data: {error}});
        }

        break;
      }

      case WebAppEvents.DEPLOY_ACCOUNT: {
        try {
          const {
            accountAddress,
            publicKey,
            fullPublicKey,
            privateKey,
            encryptedPrivateKey,
            accessToken,
            baseApiUrl,
          } = event.data;

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
          const {txHash, account} = await deployAccount(
            provider,
            privateKey,
            deployAccountPayload,
          );

          await provider.waitForTransaction(txHash);

          // approve transfer

          const preferredChain = 'sepolia';
          const gemContactAddress =
            deployedContracts[preferredChain].Gem.address;
          const gemContactAbi = deployedContracts[preferredChain].Gem.abi;

          const gemContract = new Contract(
            gemContactAbi,
            gemContactAddress,
            provider,
          );

          const approveTransferTx = gemContract.populate(
            'approve_transfer',
            [],
          );
          // const approveTransferMaxFee = await calculateMaxFee({
          //   account,
          //   TX: approveTransferTx,
          // });
          const approveTransferResult = await account.execute(
            [approveTransferTx],
            undefined,
            // {maxFee: approveTransferMaxFee},
          );

          await provider.waitForTransaction(
            approveTransferResult.transaction_hash,
          );

          // sbt mint

          const sbtAddress = deployedContracts[preferredChain].SBT.address;
          const sbtAbi = deployedContracts[preferredChain].SBT.abi;

          const sbtContract = new Contract(sbtAbi, sbtAddress, provider);

          const sbtMintTx = sbtContract.populate('mint', []);
          // const maxFee = await calculateMaxFee({
          //   account,
          //   TX: sbtMintTx,
          // });
          const result = await account.execute(
            [sbtMintTx],
            undefined,
            // {maxFee,}
          );

          const txReceipt = await provider.waitForTransaction(
            result.transaction_hash,
          );
          if (!txReceipt.isSuccess()) {
            throw new Error('Mint sbt transaction failed');
          }

          emit({
            type: WebAppEvents.DEPLOY_ACCOUNT_RESULT,
            data: {txHash: txReceipt.transaction_hash},
          });
        } catch (error) {
          emit({type: WebAppEvents.DEPLOY_ACCOUNT_RESULT, data: {error}});
        }

        break;
      }

      case WebAppEvents.JOIN_QUEST: {
        try {
          const {questAddress, accountAddress, privateKey} = event.data;

          const provider = new RpcProvider({
            nodeUrl: web3Data.nodeUrl,
          });

          const {abi: questAbi} = await provider.getClassAt(questAddress);
          if (questAbi === undefined) {
            throw new Error('no abi.');
          }

          const account = new Account(provider, accountAddress, privateKey);
          const questContract = new Contract(questAbi, questAddress, provider);

          const joinQuestTx = questContract.populate('join_quest', []);
          // const maxFee = await calculateMaxFee({account, TX: joinQuestTx});
          const result = await account.execute([joinQuestTx], undefined, 
            // {maxFee,}
        );
          const txReceipt = await provider.waitForTransaction(
            result.transaction_hash,
          );

          if (!txReceipt.isSuccess()) {
            throw new Error('Join quest transaction failed');
          }

          emit({
            type: WebAppEvents.JOIN_QUEST_RESULT,
            data: {txHash: txReceipt.transaction_hash},
          });
        } catch (error) {
          emit({type: WebAppEvents.JOIN_QUEST_RESULT, data: {error}});
        }

        break;
      }

      case WebAppEvents.FINISH_QUEST_TASK: {
        try {
          const {taskId, taskCode, questAddress, accountAddress, privateKey} =
            event.data;

          const provider = new RpcProvider({
            nodeUrl: web3Data.nodeUrl,
          });

          const {abi: questAbi} = await provider.getClassAt(questAddress);
          if (questAbi === undefined) {
            throw new Error('no abi.');
          }

          const account = new Account(provider, accountAddress, privateKey);
          const questContract = new Contract(questAbi, questAddress, provider);

          const claimTaskRewardTx = questContract.populate('claim_reward', [
            taskId,
            taskCode,
          ]);
          // TODO Fix  calculateMaxFee
          // const maxFee = await calculateMaxFee({
          //   account,
          //   TX: claimTaskRewardTx,
          // });
          const result = await account.execute(
            [claimTaskRewardTx],
            undefined,
            //    {
            //   maxFee,
            // }
          );
          const txReceipt = await provider.waitForTransaction(
            result.transaction_hash,
          );

          if (!txReceipt.isSuccess()) {
            throw new Error('Claim task reward transaction failed');
          }

          emit({
            type: WebAppEvents.FINISH_QUEST_TASK_RESULT,
            data: {txHash: txReceipt.transaction_hash},
          });
        } catch (error) {
          emit({
            type: WebAppEvents.FINISH_QUEST_TASK_RESULT,
            data: {error},
          });
        }

        break;
      }

      case WebAppEvents.SWAP_LOOMI: {
        try {
          const {accountAddress, privateKey, tokenIds} = event.data;

          emit({
            type: WebAppEvents.SWAP_LOOMI_RESULT,
            data: event.data,
          });

          const provider = new RpcProvider({
            nodeUrl: web3Data.nodeUrl,
          });

          const preferredChain = 'sepolia';
          const gemContactAddress =
            deployedContracts[preferredChain].Gem.address;
          const gemContactAbi = deployedContracts[preferredChain].Gem.abi;

          const account = new Account(provider, accountAddress, privateKey);
          const gemContract = new Contract(
            gemContactAbi,
            gemContactAddress,
            provider,
          );

          const swapGemsTx = gemContract.populate('swap', [tokenIds]);
          // const maxFee = await calculateMaxFee({account, TX: swapGemsTx});
          const result = await account.execute(
            [swapGemsTx],
            undefined,
            //   {
            //   maxFee,
            // }
          );
          const txReceipt = await provider.waitForTransaction(
            result.transaction_hash,
          );

          if (!txReceipt.isSuccess()) {
            throw new Error('Swap loomi transaction failed');
          }

          emit({
            type: WebAppEvents.SWAP_LOOMI_RESULT,
            data: {txHash: txReceipt.transaction_hash},
          });
        } catch (error) {
          emit({type: WebAppEvents.SWAP_LOOMI_RESULT, data: {error}});
        }

        break;
      }
    }
  });

  return null;
};

export default webViewRender(<WebApp />);

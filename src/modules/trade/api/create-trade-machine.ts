import {ActorRefFrom, assign, fromPromise, setup} from 'xstate';
import {io, Socket} from 'socket.io-client';

import {GemColor} from 'types/gem';
import {Trade} from 'types/trade';
import {initializeTrade, signTradeByInitiator} from './trade.api';
import {InitializeTradeData, SignTradeData} from '../trade.types';
import {ChatData} from './trade.types';

export const createTradeMachine = setup({
  types: {
    context: {} as {
      /** Current user id */
      userId: number;
      receiverBbId: string;
      /** Color of gems to be traded */
      gemColor: GemColor | undefined;
      receiverGemIds: number[];
      currentTrade: Trade | undefined;
      signature: string;
      resultTxHash: string;
      // chat
      chatSocket: Socket;
      chatRoomId: number;
      groupPgpPublicKey: string;
    },
    input: {} as {
      data: {
        userId: number;
        accessToken: string;
        currentTrade: Trade | undefined;
      };
    },
    events: {} as
      | {type: 'setChatData'; chatRoomId: number; groupPgpPublicKey: string}
      | {type: 'setFindRecipient'}
      | {type: 'setWaitingAcceptance'}
      | {type: 'setSigning'}
      | {type: 'setWaitingFinish'}
      | {type: 'selectRecipient'; receiverBbId: string}
      | {type: 'selectGemColor'; gemColor: GemColor}
      | {type: 'selectTokens'; receiverGemIds: number[]}
      | {type: 'sendRequest'}
      | {type: 'generateSignatureError'}
      | {type: 'checkAcceptance'}
      | {type: 'sign'; signature: string}
      | {type: 'finish'; resultTxHash: string}
      | {type: 'exit'},
  },
  actions: {
    setChatDataAction: assign({
      chatRoomId: (_, {chatRoomId}: ChatData) => chatRoomId,
      groupPgpPublicKey: (_, {groupPgpPublicKey}: ChatData) =>
        groupPgpPublicKey,
    }),
    selectRecipientAction: assign({
      receiverBbId: (_, {receiverBbId}: {receiverBbId: string}) => receiverBbId,
    }),
    setGemColor: assign({
      gemColor: (_, {gemColor}: {gemColor: GemColor}) => gemColor,
    }),
    selectTokensAction: assign({
      receiverGemIds: (_, {receiverGemIds}: {receiverGemIds: number[]}) =>
        receiverGemIds,
    }),
    setSignature: assign({
      signature: (_, {signature}: {signature: string}) => signature,
    }),
    setResultTxHash: assign({
      resultTxHash: (_, {resultTxHash}: {resultTxHash: string}) => resultTxHash,
    }),
  },
  actors: {
    sendTradeRequest: fromPromise(
      async ({input}: {input: InitializeTradeData}) => initializeTrade(input),
    ),
    signTrade: fromPromise(async ({input}: {input: SignTradeData}) =>
      signTradeByInitiator(input),
    ),
  },
}).createMachine({
  /** @xstate-layout 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 */
  context: ({input}) => {
    const {userId, accessToken, currentTrade} = input.data;
    return {
      userId,
      receiverBbId: '',
      receiverGemIds: [],
      signature: '',
      gemColor: undefined,
      currentTrade,
      resultTxHash: '',
      chatSocket: io(
        `${process.env.BACKEND_API_URL}:${process.env.BACKEND_WS_TRADE_CHAT_PORT}`,
        {extraHeaders: {authorization: 'Bearer ' + accessToken}},
      ),
      chatRoomId: 0,
      groupPgpPublicKey: '',
    };
  },

  initial: 'checkingTradeStatus',

  states: {
    findRecipient: {
      on: {
        selectRecipient: {
          target: 'viewTokens',
          actions: {
            type: 'selectRecipientAction',
            params: ({event}) => event,
          },
        },
      },
    },

    viewTokens: {
      on: {
        selectGemColor: {
          target: 'viewTokenAmount',
          actions: {type: 'setGemColor', params: ({event}) => event},
        },
      },
    },

    sendingRequest: {
      invoke: {
        src: 'sendTradeRequest',

        input: ({context: {receiverBbId, receiverGemIds}}) => ({
          receiverbBId: receiverBbId,
          initiatorGemIds: receiverGemIds,
        }),

        onError: 'reviewOffer',

        onDone: {
          target: 'waitingAcceptance',
          actions: assign({currentTrade: ({event}) => event.output}),
        },
      },
    },

    reviewOffer: {
      on: {
        sendRequest: 'sendingRequest',
      },
    },

    viewTokenAmount: {
      on: {
        selectTokens: {
          target: 'reviewOffer',
          actions: {type: 'selectTokensAction', params: ({event}) => event},
        },
      },
    },

    reviewResult: {
      on: {
        exit: 'finished',
      },
    },

    waitingAcceptance: {
      on: {
        checkAcceptance: 'signing',
      },
    },

    signing: {
      states: {
        generatingSign: {
          on: {
            sign: {
              target: 'signing',
              actions: {type: 'setSignature', params: ({event}) => event},
            },

            generateSignatureError: 'signatureError',
          },
        },
        signing: {
          invoke: {
            src: 'signTrade',

            input: ({context: {currentTrade, signature}}) => {
              if (!currentTrade) throw new Error('Trade is not found');

              return {tradeId: currentTrade.id, signature};
            },

            onError: 'signatureError',
            onDone: '#(machine).waitingFinish',
          },
        },
        signatureError: {},
      },

      initial: 'generatingSign',
    },

    waitingFinish: {
      on: {
        finish: {
          target: 'reviewResult',
          actions: {
            type: 'setResultTxHash',
            params: ({event}) => event,
          },
        },
      },
    },

    finished: {
      type: 'final',
    },

    canceled: {
      type: 'final',
    },

    checkingTradeStatus: {
      on: {
        setFindRecipient: 'findRecipient',
        setWaitingAcceptance: 'waitingAcceptance',
        setSigning: 'signing',
        setWaitingFinish: 'waitingFinish',
      },
    },
  },

  on: {
    exit: '.canceled',
    setChatData: {
      actions: {
        type: 'setChatDataAction',
        params: ({event}) => event,
      },
    },
  },

  output: ({context: {chatSocket}}) => {
    chatSocket.close();
  },
});

export type CreateTradeActor = ActorRefFrom<typeof createTradeMachine>;

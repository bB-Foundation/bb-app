import {ActorRefFrom, assign, fromPromise, setup} from 'xstate';
import {io, Socket} from 'socket.io-client';

import {GemColor} from 'types/gem';
import {Trade} from 'types/trade';
import {acceptTrade, completeTrade, signTradeByReceiver} from './trade.api';
import {AcceptTradeData, SignTradeData} from '../trade.types';
import {ChatData} from './trade.types';

export const acceptTradeMachine = setup({
  types: {
    context: {} as {
      /** Current user id */
      userId: number;
      receiverGemIds: number[];
      currentTrade: Trade;
      signature: string;
      /** color of gems to be traded */
      gemColor: GemColor | undefined;
      // chat
      chatSocket: Socket;
      chatRoomId: number;
      groupPgpPublicKey: string;
    },
    input: {} as {
      data: {
        userId: number;
        currentTrade: Trade;
        accessToken: string;
      };
    },
    events: {} as
      | {type: 'setChatData'; chatRoomId: number; groupPgpPublicKey: string}
      | {type: 'setViewTokens'}
      | {type: 'setWaitingSign'}
      | {type: 'setSigning'}
      | {type: 'setCompleting'}
      | {type: 'selectGemColor'; gemColor: GemColor}
      | {type: 'selectTokens'; receiverGemIds: number[]}
      | {type: 'sendRequest'}
      | {type: 'startSigning'}
      | {type: 'sign'; signature: string}
      | {type: 'exit'},
  },
  actions: {
    setChatDataAction: assign({
      chatRoomId: (_, {chatRoomId}: ChatData) => chatRoomId,
      groupPgpPublicKey: (_, {groupPgpPublicKey}: ChatData) =>
        groupPgpPublicKey,
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
  },
  actors: {
    acceptTradeRequest: fromPromise(async ({input}: {input: AcceptTradeData}) =>
      acceptTrade(input),
    ),
    signTrade: fromPromise(async ({input}: {input: SignTradeData}) =>
      signTradeByReceiver(input),
    ),
    completeTrade: fromPromise(
      async ({input: {tradeId}}: {input: {tradeId: number}}) =>
        completeTrade(tradeId),
    ),
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAYljABcBhbdCgETvQG0AGAXUVAAcB7WXBVy98XEAA9EAJikA2AHQBORQEYALFJUAOAKwBmLay169AGhABPRAFoA7AttrZeqVpWLbWxW4C+P82hYeISkYOKCbJxIIHwCQiJikgiy7vK2Ohkqeio6Ms4q5lYIOWryaqw6aspSjjqOWn4BGDgExPIAbrhgAO4AKrwA1mD4sGRgADZgmBQA4mCoVLzjvABOkWKxgsKi0UnaKmVaanqy6YYGMoXSagcqsvc697JeejqKeo0ggS0h8uT4EAIUAASmAAI4AVzgFBIEBEYHkBHagwR32CbX+gPwIPBUNgFAQSN4mDo20i62im3iO1Ae0qOnkrFcKlYWVY5VYFSuCDkDJeNT0GkUMjUtk+aNaRD+wyxOMh0JIYBWK1W8m44zoADNVqh5BLfpigaD5fjCfhkSTqeSOBt+FsErtECzOWUVLZBbZWU9bIpua8FFVbDl7kyg7Jxc10VKVmBOj0APKazVKsYA414igUnh26mJJ3sqSMwUZRysTwsrTcuSlPTvKQGYNGVjh-xfSOS+SYXiodWUIGw+GI80ovXt35dnuTITYs0W0kia1RbNxbZ5hAmLxlG7vNxSUWKHRV2SKeSyNRaZ6KCqs-QtppBDsxuPdUGwCHjGFhCI2yk51eO9cfVKGRa10HR1CMKsr3kLR0j3Pc1CqVQVAjB9fmffohnwABBVBeAhfAYXISZpkw4ZYCzGI-wdWlEHyeQ9CMOocm0N4yyrG5TyeR57heN5UJ+NpunQLZsQAZVwKB8DICh0BWCgJKkoFKKpf9aOKao0ndXQmT0TxniPGs609ewr1gxQ7zbNCMUk-AgXkGBCBWUlxNsshbJU6iaQkaRawUVRPWbUCAqkDiFB0TkbjkdkLOyMVW31GylOxaUASNXEFThQgh2RIZR2sqUBGSqBUtldNoVnYl53wRdbRXGifJ5MzDmPVhFCcJwpF9SxpGFBj0ncYUclUSzEqlHApgGIFemciAwDE2SKAhUZyAoAA1Lo+hREZPPq7ykhqeRckFWR9CMTRVDMHr11OU9hS648TikOoBKjTtsEm6bZvmxblrGCgAHUROnKBFJqn9l3tfbEAirQlFFFQclrdrbHsblEIcbxL2ijxPFejsJswKbsRm9A5oWug-tWxZJz7bFdqhtcWRSNIIrUOoajYvTuTqPQ0gqK9wNgplFHx8cPqJr6yZ+ymVsoMHlIhqi9qZrxgI8EbnlRzxK2u3I+TkWRXHKCybj8Vt8F4Ob4GiMa6sZgDrC6+QBRuO5ZE5K8nG5M8YMMWDPGezRKlFhKxzaDDtptyHcwAjRDIYusG0eJtRvDwqZXSk0KHt2P1JUOQ4ZMLqqii7IDw42x5DdEXDEQstnjUMW2ifTbE2TFZc7UxrdDh-YPADlxayrT1T09Lr7COWteeb8bu17EGu4apJsmcBiuvUO4LwDo8DlyEbzqkZtWBOWf5FbnpX3fHPfxVgCnsLTnnHed1PTUKDWBguCNEQpDEbPyOWFcL4UIkvaG64PBlC1k4I4MVDYJ1rEPNwKdDBpwKvIYSolQa2TAarI+LtBQFwLu8R4sEEHGQbmZH0aDBKFVskCXBAFNDHgYnUfQqNg5PG5DkQsBg2oVC8EGI4+gz5FTsilRySoXLYKkow9SMg3SsPSHpWwnD7hHj5nwrQvJ6znlUaI+hKVDTYnKviORjVnrPAYh7IwHhnAnCrLWP2Rh7Ai1FPrM+moCC4FgB9CA5iV5Xn8q-VkRx-YWQ-l-XIP9ELKERjQt6JJ8CYAmJAAJiANAHD3JUXi3hYK6G4foauGRzyuEeqKE+Z9CbEygKTcmv1o7KwdvnOGqjTpaGMMjNqlR0Ysz3G1PS2Rsjb3Nj4IAA */
  context: ({input}) => {
    const {userId, currentTrade, accessToken} = input.data;
    return {
      userId,
      tradeOffers: [],
      receiverBbId: '',
      receiverGemIds: [],
      currentTrade,
      signature: '',
      gemColor: undefined,
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
        src: 'acceptTradeRequest',

        input: ({context: {currentTrade, receiverGemIds}}) => ({
          tradeId: currentTrade.id,
          receiverGemIds,
        }),

        onError: 'reviewOffer',
        onDone: 'waitingSign',
      },
    },

    reviewOffer: {
      on: {
        sendRequest: 'sendingRequest',
      },
    },

    completing: {
      invoke: {
        src: 'completeTrade',
        input: ({context: {currentTrade}}) => ({tradeId: currentTrade.id}),
        onDone: {
          target: '#(machine).reviewResult',
          actions: assign({
            currentTrade: ({event, context: {currentTrade}}) => ({
              ...currentTrade,
              txHash: event.output,
            }),
          }),
        },
      },
    },

    reviewResult: {
      on: {
        exit: 'finished',
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

    waitingSign: {
      on: {
        startSigning: 'signing',
      },
    },

    signing: {
      states: {
        generatingSign: {
          on: {
            sign: {
              target: 'sendingRequest',
              actions: {type: 'setSignature', params: ({event}) => event},
            },
          },
        },
        sendingRequest: {
          invoke: {
            src: 'signTrade',
            input: ({context: {currentTrade, signature}}) => ({
              tradeId: currentTrade.id,
              signature,
            }),
            onDone: '#(machine).completing',
          },
        },
      },

      initial: 'generatingSign',
    },

    finished: {
      type: 'final',
    },

    canceled: {
      type: 'final',
    },

    checkingTradeStatus: {
      on: {
        setViewTokens: 'viewTokens',

        setWaitingSign: {
          target: 'waitingSign',
        },

        setCompleting: 'completing',
        setSigning: 'signing',
      },
    },
  },

  on: {
    setChatData: {
      actions: {
        type: 'setChatDataAction',
        params: ({event}) => event,
      },
    },

    exit: '.canceled',
  },

  output: ({context: {chatSocket}}) => {
    chatSocket.close();
  },
});

export type AcceptTradeActor = ActorRefFrom<typeof acceptTradeMachine>;

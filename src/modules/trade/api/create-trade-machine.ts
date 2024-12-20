import {ActorRefFrom, assign, fromPromise, setup} from 'xstate';

import {GemColor} from 'types/gem';
import {Trade} from 'types/trade';
import {
  checkIfTradeAccepted,
  checkIfTradeFinished,
  initializeTrade,
  signTradeByInitiator,
} from './trade.api';
import {InitializeTradeData, SignTradeData} from '../trade.types';
import {getTradeById} from 'src/shared/api/trade';

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
    },
    input: {} as {
      data: {
        userId: number;
      };
    },
    events: {} as
      | {type: 'selectRecipient'; receiverBbId: string}
      | {type: 'selectGemColor'; gemColor: GemColor}
      | {type: 'selectTokens'; receiverGemIds: number[]}
      | {type: 'sendRequest'}
      | {type: 'generateSignatureError'}
      | {type: 'sign'; signature: string}
      | {type: 'exit'},
  },
  actions: {
    selectRecipientAction: assign({
      receiverBbId: (_, {receiverBbId}: {receiverBbId: string}) => receiverBbId,
    }),
    selectTokensAction: assign({
      receiverGemIds: (_, {receiverGemIds}: {receiverGemIds: number[]}) =>
        receiverGemIds,
    }),
    setSignature: assign({
      signature: (_, {signature}: {signature: string}) => signature,
    }),
    setGemColor: assign({
      gemColor: (_, {gemColor}: {gemColor: GemColor}) => gemColor,
    }),
  },
  actors: {
    sendInitiatorRequest: fromPromise(
      async ({input}: {input: InitializeTradeData}) => initializeTrade(input),
    ),
    checkAcceptance: fromPromise(
      async ({input: {tradeId}}: {input: {tradeId: number}}) =>
        checkIfTradeAccepted(tradeId),
    ),
    signTradeByInitiator: fromPromise(async ({input}: {input: SignTradeData}) =>
      signTradeByInitiator(input),
    ),
    checkIfFinished: fromPromise(
      async ({input: {tradeId}}: {input: {tradeId: number}}) => {
        const trade = await getTradeById(tradeId);
        await checkIfTradeFinished(trade);
        return trade;
      },
    ),
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgDMCIAlMTXAB1zHwBcBiWMAG1pZrsbMWAbQAMAXUSh6Ae1i4WuGfikgAHogCMATgBMJXdoBsADgDsAZgvaArABYTF0RYA0IAJ6JdZ-XZtO9XQtdO20LfwBfCLc0LDxCUgA3JgB3ABUZAGtmWA5uXgBxMFQAYRkuGQAnMUkkEFl5RWVVDQR-EwMbUW7dGzNNIzMTIzdPBG9ff1FA4NDwiyiYjBwCYhJOfAgCKBoARwBXOHYIZTASAkSss9iVhPXmLfwdsAOjhAuZTHQm-Bqa1QaCiUKjqrU0JlEZhIkNERiMdk0onsNkcoy8ZjsJD8AT6KKM2js8MWIBu8TWG0ez1esHYYEqlSqJHoXG+ZCqqBIpNWpAp2z2hxp73wly+Pz+EgBciBzVBWgsmihCM04MhFlMdlcHi8on0mi6IURuhMXU0umJXLulTAyTAKQA8mQyHS8pt+Ud-nVAT8WnK7KISD5wqEbIM7N47GjxrYSINjDZvN1hs5zcsyUlUhlsvgAIKoGT7Vh5HiYFiZnIe6RS72yhBhfQWMz+NWiPwm7SRiYkWzytXGcwOMwpuLckhWm0pGiwfZcWlqBQV+pV4E+hCEkzaEiI4ZDYIhjUd7SaGMD02QvVBAZD25rFLoIFPbOYTBgegsdD4Z-nCA8NhqGnfM50DIFg6WQXRulEIg2AtG870UB8nxfN8PzOXBvzABcvWXGtdF0fEAxMEJLEcIxgiMGxIzVTFjQxawzB1UwjE0K80xIW97ygR9n1fd9PxwWhMm2LikN4sA2BOQhzmFK5OVTEd2PgzjEJ4lCSH4zBBIQ7jkOfIURW+YFxVqStGmw0BWm8CxMV0cE9BMMNjFCEYtXGfosT6TQNThBU+jsFj5LgoTlJ0s51M0pTtNEtg6QZSomRZFg2UqDkYNIBSgsi1SwoykSUL0z4DOUIzJVMmVzK8XD9Bs8CHBRE0Ixco0bCxCx7NhY0mMcWF-LueQoHwbYSBgQhKgMp4AGVcH6jgpt+CVPSXMr1EQYJwJjeyTD1OxtpCTUxk7GqjQ2hwmN6HryVmwbhrpMaoEm6brtGkD7vwb59itABRekqkwxaQXKqNtA3URPKCGw9F8hr9s0CwDF6UR7KMFtpjsHxzp5S6nnWTGoHE04pMubJZOHXqcex-rtny0VDIkX7Sv+5aEDVIx61hTztBMdcMWcsYnGa-FbEPPCdXB1H0fJgasb6yXcZixlmVZdlievDGKalnGqcKubxDp6UGdaKwMSxMwTaswxtDMdtGs8gN4dI1HwfBsJxfSp4ADECFwWBsC-H8-zfECSCAkDKjAiCoNStjAvdz3vd9jD5pMvWVz9ewCNI7wFR0E2KJcv1-URPRWpbU0nHMF3o6gD2Brj7KY5r7A8ckj4icj12q9jn2647hvNbFWnE8XemU66fmw2NBVwOsSNwWa0GdWNftD0hCuOOrr2u+wATtnX73ou+uKFcSpW28r3fN+3+uN77mmdcHrCltaP1OZjHwBnDTnAw7BwSBDGFt0bEmPy0QSRyQSNFOcIh75-RXEEKE3YkRqicHRUwkZzAkDanhbElg9DMWJPgGQEA4CqFSiVZONYAC0PNEAUK6AGUuMMkZA2RuRcWFBXS0AYEwVgZDqwAzDAefmltyIJgRkjBYIDI7jjLPgeAC1h41msB0Mw5EmLwiasqPaXhoyxhEfRMRyZJFgPJA8PkLwBQsF4WZRmW1moOBsgiJGOoYZaNcrqYRHMBhWCRCYcWY5UgOidJUKxj8tADGoh5RE8ZlRcwPIqU0yp8TRJsJ5Gw4tpFXBzHmAslj5HkIBj4Iw61CL0TCKaPogjX5xlEUmCRSwSZrH8baSc05clJz4YzPw20sSo1MCU1GCMDxHnhOYU8-R4zyiMKvRSwkVLPhCfrbU4MDD2T0ORHw21tozxRF2PouFESOPsdMnKczULoQWbAxEUIjShDwnszZUMvCOC7K1QkyD2gs2OVpXKfEt4aROSFC5OE-D6FIp5BsgYYaaG-kUvw4z4wqMGERcW0tthAoBoYFJ0JQbhAhhiR5TMilDBUdoEGth86DBRWTR6t0XrosZk4Na1hcIOwcFZVxR0MFXNWt5dqVK1ZQAlmivJHSDZ+kxDofEsJrDBGno1CEXZgzylwrys6RiGmqxlhLN6n0D70oNs4TEDZwjeEIkxQ8M8QgrJJdtBUPRphfJ7hvfVK1P6-z8Jo2w9lwQzyYtCJG9Fto2HBojM06qVZRzXp3eOLqmZhGasiT1KIEQmEogjX+AaxE5yAY68+ak-nhXPrGsM6akXvwxJ-XQaaOh-x8PYcl202Gd0gMWoYc8uiHjNsMOEQzjzmF6DoDUkNxZfBQjwCAxbgaQk2k7KwdEkRoKhJg+E-gcHgUHFECIQA */
  context: ({input}) => {
    const {userId} = input.data;
    return {
      userId,
      receiverBbId: '',
      receiverGemIds: [],
      signature: '',
      gemColor: undefined,
      currentTrade: undefined,
    };
  },

  initial: 'findRecipient',

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
        src: 'sendInitiatorRequest',

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
        exit: "finished"
      }
    },

    waitingAcceptance: {
      states: {
        idle: {
          after: {
            '2000': 'checkingAcceptance',
          },
        },
        checkingAcceptance: {
          invoke: {
            src: 'checkAcceptance',

            input: ({context: {currentTrade}}) => {
              if (!currentTrade) throw new Error('Trade is not found');

              return {tradeId: currentTrade.id};
            },

            onError: 'idle',
            onDone: '#(machine).signing.generatingSign',
          },
        },
      },

      initial: 'idle',
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
            src: 'signTradeByInitiator',

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
      states: {
        idle: {
          after: {
            '2000': 'checkingFinish',
          },
        },
        checkingFinish: {
          invoke: {
            src: 'checkIfFinished',
            input: ({context: {currentTrade, signature}}) => {
              if (!currentTrade) throw new Error('Trade is not found');

              return {tradeId: currentTrade.id, signature};
            },
            onDone: {
              target: "#(machine).reviewResult",
              actions: assign({currentTrade: ({event}) => event.output}),
            },
            onError: 'idle',
          },
        },
      },

      initial: 'idle',
    },

    finished: {
      type: "final"
    },

    canceled: {
      type: "final"
    }
  },

  on: {
    exit: ".canceled"
  }
});

export type CreateTradeActor = ActorRefFrom<typeof createTradeMachine>;

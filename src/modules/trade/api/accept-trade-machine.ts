import {ActorRefFrom, assign, fromPromise, setup} from 'xstate';

import {GemColor} from 'types/gem';
import {Trade} from 'types/trade';
import {
  acceptTrade,
  checkIfTradeSignedByInitiator,
  completeTrade,
  signTradeByReceiver,
} from './trade.api';
import {AcceptTradeData, SignTradeData} from '../trade.types';

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
    },
    input: {} as {
      data: {
        userId: number;
        currentTrade: Trade;
      };
    },
    events: {} as
      | {type: 'selectGemColor'; gemColor: GemColor}
      | {type: 'selectTokens'; receiverGemIds: number[]}
      | {type: 'sendRequest'}
      | {type: 'sign'; signature: string}
      | {type: 'exit'},
  },
  actions: {
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
    checkInitiatorSign: fromPromise(
      async ({input: {currentTradeId}}: {input: {currentTradeId: number}}) =>
        checkIfTradeSignedByInitiator(currentTradeId),
    ),
    sendReceiverRequest: fromPromise(
      async ({input}: {input: AcceptTradeData}) => acceptTrade(input),
    ),
    signTradeByReceiver: fromPromise(async ({input}: {input: SignTradeData}) =>
      signTradeByReceiver(input),
    ),
    completeTrade: fromPromise(
      async ({input: {tradeId}}: {input: {tradeId: number}}) =>
        completeTrade(tradeId),
    ),
  },
  guards: {},
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgDdcwB3AFQHsBrMfWAYljABsxMAXAcTCoAwnU50ATgG0ADAF1EoAA51YuXrjr5FIAB6IAjAA4DJACxGzAZgBsAdgCsRmVaMAmNwBoQAT0RuzUwMbEIcQmyMATisHaIBfOO80LDxCUg58CAIoACUwAEcAVzheVggtMBICMkZK5JwCYhIMrPxcguLYXgRqukx0DS1ZOWGdFTVB7SQ9QzMIkhkAuzM7CLcHYxtvPwRjBxIrOZk7YxkjMIMLBKSMBrTm5lb2opLWMAkJSRIlTgGAM0kqBI9VSTRa2TyLy6PXwNX6k2Go2m43UmimoH0uxk2PMBjshzsMmCITskW2iBiNnMkROYRsixONmuIBBjVIEjAFGoAHk-n93uxHpDOrwkcpVKitDpMQYZGY3AtDg4HMtjiYzuSEG4bGYDtE3K4DGEzjImYkWbdQaRMHRUD8wBo2mUKlVYbVgZa2SQbXbuI6oDC4QM0Yj5GMJZNpRTIm5IiQ7EY7MsbJEdbE3EZNVYMyQM1ZDkYTPi5Q5maz7hyuVQ8rBCpxSmBdOoxSAUZHppjrIcSGEaZFrA5XAms2Y4w4ZJFIos3AYZ-Ky577lX6Ex8ABBVB0Qr4Uocbh8FfMWAtttoqMIGxWUxWM4qo17Kd2TUBUzhGx0iLRWILlJeqjoVE2gAZVwKB8CqCBuFYXQugGSp0D+Xh3mQNxsRkIhWHLJp-0AqAQLAiDuBPCMzw7QwaSsBZ7FJbMbACDwDE1MwJxIAwp2OYJ1gcCw3B-O5sIA-18PAnAeAYbJhOdQhXRqJgPV-e4cKE0CROwMSJJUwM+mDIZ5GIiZSIxfwViCfsr3lO8UyzKw7FzK8IivRZZQMYI+KtEglI0gjRMwcTgJUt4Pi+H5-kBeT+NITz-O8tTfK8-AtPhEM9LDZESKlMitVNSiEzxIlR0vFVn0CEgzOCM5LHxS8zRuBSwRU7ISBgQgJGDaL8HYFT9MldEZi1aIqVjHUJxOJNzgcLNtXjIx8wNRZ+2Yqw3K9NQwMa8E2mFV5ymk3o5Kw9IGraB5MghDoSkSnT8FDBQ0oMjKjIQQ4LBIGa3BOGa5XlJ9fApDYFgnc4ok+kIjBqi06owxtm1S8V7t6zF7Bkcw7G1BMAmsGbGN+3Z-tJI15SJNjIkTSIEnNfA6AgOAdAO8N4fPABaLYcZ1XNIkuMGwnzacyfNA7yEoWhahYemevPeVnzZqx9UNY1nHBgWNueEUxfbR7Z3mWb+37Wcr0iCacaWVjCVjZwzGY1ZLGWitOSF3l+QkNXDL6oHWJMGlE3xA0ySNwkSCR2MresA38RtpofXtf1nYevqbJcAPlgNmQHG1exDZ2bNkeCVxUKcGMXICcP2Tt6gazrXgY4RxBAjogO5x4gwYkWEcxwnKcGLnXj+cXJplxFjctx3Kvzxl2y5kTCfmNHNOpd1GXszl+kFeLjzBPikfMrxPEeynd9DjxQcM8MbjzGsYnuItg3u9qiK19w4TCLATeNdWfZYlNQdAkcGIsyJUrz7L0qrYWwq8op4RUt6WKfkIFgRfn1GcM1pp5UuKmGIP1M6zjssEEmIdbDLFXqtfA2R4GYnemceMthdZyjlL-I22YA6XkcCTRMKZ96EKOlAJqzB3htVgb1U8scyGOCpFVah086GZ2sIwmyVCVipmsBwtax1lZbS6KQikspbL4h1jedwHhLCTWzkwsGZhBzXxiKvP4BBcCwDUhADRCALYrAOGxDYppEyFkcK3Hs7dpyzkuKhMwq9+j4EwFwSAjj5SUXfHRNOM4Uy+x2PeeMHMNhXljMqEwS1yZAA */
  context: ({input}) => {
    const {userId, currentTrade} = input.data;
    return {
      userId,
      tradeOffers: [],
      receiverBbId: '',
      receiverGemIds: [],
      currentTrade,
      signature: '',
      gemColor: undefined,
    };
  },

  initial: 'viewTokens',

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
        src: 'sendReceiverRequest',

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
      states: {
        idle: {
          after: {
            '60000': 'checkingSign',
          },
        },

        checkingSign: {
          invoke: {
            src: 'checkInitiatorSign',

            input: ({context: {currentTrade}}) => ({
              currentTradeId: currentTrade.id,
            }),

            onError: 'idle',
            onDone: '#(machine).signing',
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
              target: 'sendingRequest',
              actions: {type: 'setSignature', params: ({event}) => event},
            },
          },
        },
        sendingRequest: {
          invoke: {
            src: 'signTradeByReceiver',
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
  },

  on: {
    exit: '.canceled',
  },
});

export type AcceptTradeActor = ActorRefFrom<typeof acceptTradeMachine>;

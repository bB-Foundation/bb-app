import {ActorRefFrom, assign, fromPromise, setup} from 'xstate';

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
      chatRoomId: number;
      groupPgpPublicKey: string;
    },
    input: {} as {
      data: {
        userId: number;
        currentTrade: Trade | undefined;
      };
    },
    events: {} as
      | {type: 'setChatData'; chatRoomId: number; groupPgpPublicKey: string}
      | {type: 'setFindRecipient'}
      | {type: 'setWaitingAcceptance'}
      | {type: 'setReviewingOfferedGems'}
      | {type: 'setSigning'}
      | {type: 'setWaitingFinish'}
      | {type: 'selectRecipient'; receiverBbId: string}
      | {type: 'selectGemColor'; gemColor: GemColor}
      | {type: 'selectTokens'; receiverGemIds: number[]}
      | {type: 'sendRequest'}
      | {type: 'generateSignatureError'}
      | {type: 'reviewOffer'; currentTrade: Trade}
      | {type: 'acceptOffer'}
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
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAYjAA9cAXAbQAYBdRUABwHtZrc39mRzEAJgDMAdgB0ATgCswurIBsc4ZNEKAHABoQAT0TqJ6gCx1BCo7NErBARgC+d7Wix5CpWGCoBhbOioARP3R6JiQQdk4qbl4wgQQjQTopQTNRC3UbQVVRUW09BABaGxtpcQUFOjojSQsFGwU0yQcnDBwCYnEAMwIIACUwTFwWXDB8KhIPABsBqn7B4dHaRj4Irh4+OJtJQXEsjSsVaSN1ZTyhUR2LOW2RQWrhWWaQZza3cQA3EYB3ABU2AGtRrAJmBppgqABxMCoLxsSZsABOIRWHDWMVAcVk6l20kqpmkonqonUCjOCEEF3EVzoN2Ed0kD2ETxerg6HnwEAIUH6AEcAK5wcYQHhgcQEd4A0Us9pEcTszn4blgfmChDitiYPzRELIsKrKLrWKIEo2CTlSRbBQUwTSE6k3SICylaQlO4E01KBSSBTM1qs2Xyrm8gWwcZgBEIxHiFiTPydRGocTSt6BxXB1XqzUG-A65Z61HZjbG4SmqnFGzqOhWDRGYRkxI7EqmIw2UzqXGZX0uGXiBFgT5gL4AeU6nXDII56dDutYBeiRYQNmEJnEFwe1WkDQSaXrMjKom90gplRJdCZjmefp7A9+kvwAEFUGw+WMQWCqH9AfhYDPwnPDRiiAMjsYiyMIFROnQWz1pSMgluB3oGMcohdq8HR9je-SwHykxhpQSyhLOkTzkai5ekkKjFKI0i4oI6jtnWDoIBowjiMuNF0XQ5iSJU54tN2bxfOgXCKvemCYGALBUOg+ASSQGHfCOY5InmRFoguxQPOINGSKecjVDkZIWEY4hQUeJgJBashNBeyZsrgUD4Fy4gwIQCJaoqADKDn4BMPm-vqJGAQgJY2FSFwpMIy5yISm5kgoRz7gkXH3BS9Sof6co+c5rnhh5UDeY5JC5e5VBgIV+B+HyfYAKIRoiAX-ui-D6JI4iVvUtbqG6FymmS0h7l6uKmHUNryBlPacI5zlTU5iokMKhBivgEqAkmV4ptlipZdNipqitGpajwuaEX+xEAS1CAnBRhKtnSrbIfFxjtcZlZ0mYDzqBNm27VAO1zVAZD1Qi0axlQ8YIomdkBltf2zVy+0Slm2qMI153NXERgJbsCU2AkWwkhWjH5ANEhbNUGTHLWohVN9HRCSJUAAGIELgsDYCQ3ROezaPqaRS6mLslGmGoBhiEY8UVGUFaSNk2wugYdOyjgAz-FyPzuRA5XSVQfLAh4VAs5OAxDCMYy84WpFmFIVytkcCWqLL0j1nSq4XMcS6OwyBJK+IKuYGrioa+gWueTresglQADqwlRKJ4mSdJslgBbQWXZkOSmbpHEWikFlGVU7VWlxD1mAkPq2RtHT+4HUDB6H4f654FVcqnF1xEUNriK6Wx0PRJQmA8RlGGa2y6QPVS2IIvs1+rmva1VTfR7HXJG2z2BtxjiAFLYrG1hP3olNcuRMcYJmWTcJpHuBvsKYOXJKeGkBQqgwJYBJUmPypp2Be3iBpNie6VQGQZFojYIyahVwtm6iacoFgZ7YFVnPEOC9dZL36DeB+o4n4QBfj+VSZ0+bBX7lSa0Bg3Q2gyAXEyJJEjHG6okNI08nj4DYFreAYRoYonRguHekCsg0hGq2JcJ98gURMB9LI1RNJXF9lzPoJsFhjG4UQy6CRdylAaIeY8fcKh8UvAJDoN5PxAhUZbYKKhsRqE3J1OiLolwaP3Nommuizy+1TEqFUoYzFp02EcUoxxbAtgqKYJcxNziNgPF6DISg5C2lvv2RS2CEQ+L-ouTq7V3R21sDLURQhVBlhyUNWwLp4GV0MbKYxd5HzPmUfmHhpELgKDKPRY8DJMgEkcVohKOi9IJMwnAHCVBUlb0XEeHYDJwLXDuCaSQT1WLsSPJWbilRmH8TQrKBmccoBiQ-knCSIyNJZDCiWd2cgRAnCMBLJiI9mlpArCU+o5hpDuNhoc0iLZ2pQXMMIbqFhep5PiFsHEahth41OQNV5v0XKjDytsiq7zgrlm7lEmiVzCSxXtPkBoYVOIJRFhYU0+job-Rmm8+pqjMY1CkMYEsllEg4udkxcoe9ybVBELRKsUKAb-SqrVYGiL05d3qDSB4FwOw1HCQgXEdyCSjQSEcTIUVfZbNXqzdmgrNitjakob02dQk7mZScNiTo8XVF4nI9ViCICauNMSMKukvRZB4p6QFGgdg0iOKoEk65ygzxkhJaYNqKXmLUW1So9qBqTJUDTJl+QDAvRGlcKw2wuXlI2X7RBAdkEN0XrawoKRsQCJ4mYYRCE42IHAkkO48grTbASoSBo-TvhYOUs-aEHC1KhriOob0Ntzkum9J6qVtyoEPNgc8hwDggA */
  context: ({input}) => {
    const {userId, currentTrade} = input.data;
    return {
      userId,
      receiverBbId: '',
      receiverGemIds: [],
      signature: '',
      gemColor: undefined,
      currentTrade,
      resultTxHash: '',
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
        reviewOffer: {
          target: 'reviewingOfferedGems',
          actions: assign({currentTrade: ({event}) => event.currentTrade}),
        },
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
        setReviewingOfferedGems: 'reviewingOfferedGems',
      },
    },

    reviewingOfferedGems: {
      on: {
        acceptOffer: 'signing',
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
});

export type CreateTradeActor = ActorRefFrom<typeof createTradeMachine>;

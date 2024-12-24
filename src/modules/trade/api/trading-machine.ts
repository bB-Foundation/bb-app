import {assign, createActor, fromPromise, setup} from 'xstate';

import {Trade} from 'types/trade';
import {createTradeMachine} from './create-trade-machine';
import {acceptTradeMachine} from './accept-trade-machine';
import {getUserTradeOffers, TradingMachinesIds} from './trade.api';

export const tradingMachine = setup({
  types: {
    context: {} as {
      /** Current user id */
      userId: number;
      /** Available trade offers from other users */
      tradeOffers: Trade[];
    },
    events: {} as
      | {type: 'start'; userId: number}
      | {type: 'offer'}
      | {type: 'accept'; currentTrade: Trade},
  },
  actions: {
    setUserId: assign({
      userId: (_, {userId}: {userId: number}) => userId,
    }),
  },
  actors: {
    checkTradeOffers: fromPromise(async ({input}: {input: {userId: number}}) =>
      getUserTradeOffers(input),
    ),
    createTradeMachine,
    acceptTradeMachine,
  },
  guards: {},
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBcBOBDCBLAdlAdAO7pbK5QAqGEYA8gGb1iqwDEA9o8wNoAMAuolAAHdrFJZ2OISAAeiAIy8AnAFZ8AFgBsWgBz6du3r1UAaEAE9FvXZoDMCgEwB2BRseqNyu1tUBfP3M0THIiEjI8Kkw6LhZWdABjBLBhZD5BJBBRcTIpGXkEJV0tfG8XXQUdBWUtN3MrBDsPfEdqu14XRy9fVTsAoOpQ4glI6himFnwsCAAbMFZZWGR0ZDB8dHpV1AAKLWNjAEpWYOw8MJHKMYYJ2CnZsHSZbIk8zIKKu3xnEyc7DWdVEY7Mp6ogHOpnLoAUYoXtapV+iATkNwuQojRrsxbrAwOhUAkABZoq6xNgQKRrXAAN3YAGs1sizsMIpdopjJji8YTiWzSQhqewEitJDh0o9Ms9ctI3ohHLpPgpPIq9t9nHLdGZLIo7Op5bUNMCNb0gYjGQRmTyMaT8Jz8UTRrybqxmKh2Kh8MIZit6G6ALb4M3nFno8ZYm24u2W0Msfk4GlCqVigRPMQvaWgAp7WwKSFOZx2XTKfO6DSghCOFz4dp7BRNWqqVQ1PqBJGDM6JZKpEOsck4SlxukMtsEDspZAh2Px4VSJMZESpqX5awKWxeHOFwsaYpdMvlfBwrx-RxZ4Gm4d3OasJZ4tLJiULkVLhDOZwtP68F-KXhr3Q7rXlvZ8HlfMATcXgCx0fwW0DBJUFxVZu17fsaXpANz1g+CwAnAUExFWcUxyR8ZUKDoSlcPRlCMVpVC0Asy0VWwaJcD8tDlXglFUBQAhbHB2BoeBMjNAi0yfABaXoWmUCtvm-RxjArMtROBfBKgLA0ixXfRnDPEImVRB0rRuYTF2IxwdRUpUaI-D91U1BotyrHxFX2PQui0bToPPC0DOjW5pjmYyiIzRB3Mcfdc0qLQNA4jV6NUV9eFY74HA0TwOl0HTTnNfTWUMsNbW5Hz2QE+dCNeYLyxLfBVArNdlC8FxqmcXc1RaFdnDhKK9kcZRMtCUcuzGQLyrkRQ5VfSF3DVKKzI0bRdwqFp9H+LNPHi8C+rOfywGG9NRoQcTJOk4x3HkuSFAWz4aOBHVf1rMyuM83SCAwlYsKG+8yr2gonELTQukLWoNWcGotHoypqpUXpPFYis5W4vwgA */
  context: {
    userId: 0,
    tradeOffers: [],
  },
  id: 'trading',
  initial: 'idle',
  states: {
    waitingTradeOffers: {
      on: {
        offer: {
          target: 'createTrade',
        },

        accept: {
          target: 'acceptTrade',
        },
      },

      states: {
        idle: {
          after: {
            '60000': 'searchingTradeOffers',
          },
        },

        searchingTradeOffers: {
          invoke: {
            src: 'checkTradeOffers',
            input: ({context: {userId}}) => ({userId}),
            onDone: {
              target: 'idle',
              actions: assign({tradeOffers: ({event}) => event.output}),
            },
            onError: 'idle',
          },
        },
      },

      initial: 'searchingTradeOffers',
    },

    acceptTrade: {
      invoke: {
        src: 'acceptTradeMachine',
        id: TradingMachinesIds.ACCEPT_TRADE,

        input: ({context: {userId}, event}) => ({
          data: {userId, currentTrade: event.currentTrade},
        }),

        onDone: 'waitingTradeOffers',
      },
    },

    idle: {
      on: {
        start: {
          target: 'waitingTradeOffers',
          actions: {type: 'setUserId', params: ({event}) => event},
        },
      },
    },

    createTrade: {
      invoke: {
        src: 'createTradeMachine',
        id: TradingMachinesIds.CREATE_TRADE,
        input: ({context: {userId}}) => ({data: {userId}}),
        onDone: 'waitingTradeOffers',
      },
    },
  },
});

export const tradingActor = createActor(tradingMachine);
tradingActor.start();

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
  /** @xstate-layout N4IgpgJg5mDOIC5QBcBOBDCBLAdlAdAO7pbK5QAqGEYA8gGb1iqwDEA9o8wNoAMAuolAAHdrFJZ2OISAAeiAJwBWAIz4FAdg1KNKgBwAWBSpN6ANCACeiFQoX4AzEoUA2A3t7GDWhxoC+fhZomOREJGR4VJh0XCys6ADGCWDCyHyCSCCi4mRSMvIIygb4SnoATHoaZe4uCmVKLhbWCA4KDviGBk4uTuUuvFoBQdShxBKR1DFMLPhYEAA2YKyysMjoyGD46PQbqAAUSry8AJSswdh4YeOUkwzTsLMLYOky2RJ5mQWl7QYqBjpGPQ6BS8JRNRAOPQ-XgqJQOX4uJSAlxDEDnUbhchRGh3ZgPWBgdCoBIACyxt1ibAgUk2uAAbuwANabdGXMYRG7RXEzAlE0nkrmUhD09gJdaSHDpF6ZN65aSfRBItTaKG2Mq1WG8MrghBlDTFIxlWy2LoDBzVVGsgjsgU4yn4XnEskTQX3VjMVDsVD4YTzdb0L0AW3wVquHOxUzxDsJTttkZYwpwDLFcqlAleYne8tAXwMZXwprKZVa8JUvgMOrKnnwiNBvl08JhSiUlpGlzmi1YqyJaXTMszcvyiC0+GLBgGGhBRn01Ur-Q6vl8qnHkJciNbIUuiWSqQjrGpOFpSaZLLbBG3KWQEcTyfFUjTGREA4lQ4QKjKdRKRaRAz0JsaVgQl06jaM4-xAr0BgooEaJnvgCSoISGx7geR4MsyIZwQhSFgNeIophKD4ZjkL4Km+H7FCoPRlpofzLg4lYaC4+BaP03h6ECf6wgEME4OwNDwJkVrEVmr4ALRwqOdR6kceZHEWOrwjWhyHPqcnqh+G4XNamIuna9wiYOZHFsxShFtOCiGromg6u++aamZ9RaA2xhaRi1wRtyDwdmAhmkTmw4uHojhgbw8J9HoyiVsoLH6ExtRdC45luWyumcvpUaOvyenxoJT4kR8AW6oYX7VMYll1NZGiMfmRqVP0a5QVqCgpeeSSXhGfmFXINi8LUjiVK0RYOC4GjyYpY2OAYXSHAMdS-GUrWPIsXXZj1CASVJRZjbwclalWKiVlCJQ9G0pRGuaDgqEt2HrLhkyra+KgDPm+qjf0KiTkaza2doHTONRkLvv8Gh6DxfhAA */
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
        }
      },

      initial: 'idle',
    },

    acceptTrade: {
      invoke: {
        src: 'acceptTradeMachine',
        id: TradingMachinesIds.ACCEPT_TRADE,

        input: ({context: {userId}, event}) => ({
          data: {userId, currentTrade: event.currentTrade},
        }),

        onDone: "waitingTradeOffers"
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
        onDone: "waitingTradeOffers"
      },
    },
  },
});

export const tradingActor = createActor(tradingMachine);
tradingActor.start();

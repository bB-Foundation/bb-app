import {assign, createActor, setup} from 'xstate';

import {Trade} from 'types/trade';
import {createTradeMachine} from './create-trade-machine';
import {acceptTradeMachine} from './accept-trade-machine';
import {TradingMachinesIds} from './trade.api';
import {TradingMachineInitialData} from './trade.types';

export enum TradingEventType {
  TradeInitialized = 'trade_initialized',
  TradeAccepted = 'trade_accepted',
  TradeInitiatorSigned = 'trade_initiator_signed',
  TradeReceiverSigned = 'trade_receiver_signed',
  TradeCompleted = 'trade_completed',
}

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
      | {type: 'offer'; currentTrade?: Trade}
      | {type: 'accept'; currentTrade: Trade},
  },
  actions: {
    setInitialData: assign({
      userId: (_, {userId}: TradingMachineInitialData) => userId,
    }),
  },
  actors: {
    createTradeMachine,
    acceptTradeMachine,
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBcBOBDCBLAdlAdAO7pbK5QAqGEYA8gGb1iqwDEA9o8wNoAMAuolAAHdrFJZ2OISAAeiAMwBOAEz4AjCqUB2AKy8AHAu0AWAGxKzAGhABPRCt4L8KrQZMHNXs7oMBfPxs0THIiEjI8Kkw6LhZWdABjBLBhZD5BJBBRcTIpGXkEV118JV9ebQV1YwMlE21rO0U9fF11dV4zdt0FMxN1PQCg6lDE5NSomlYIKTB8XAA3dgBrWeDsPHxRlOQJsAQF9gT0XJx09JlsiTzMgoUVdXwKpU0VXQteEw6bewRjbXxeG1eLolIYfNo2rpBiA1qEsBAADZgViwZDoVBpAQXMRXaQ3RDaf4qBSfQmgkzPAwqEzfBxmXj4IwVPTqT4KAxmHzQ2EbBKoMDHMC7KYzOY4RYrfA8gh8gXIIXUPYHI4nM5YzKXE75RDqXr4Mz1AwfdrA-oqWmFD6PNzvVTaQFc6E4dg0eCZaXYnKSPGgAoAWm6LlUKntH0cvFcFr97Ue6ncBpM914ljq2m5ww2xAkkUVDCYLE9uO1hV0-06njM905Bm6ugtKiMALMyl0IdL5VZCnTIQ2W3GisLWvxhRMxXUIN6ds5JhMCgtM-+VM0Bm0xN0fTjXcCMIzBHhSMH3uLAaDrlDid4Ecc6nrjbeygUvnud0q3fWMv5gt2h+uvoc5kZS8VHpHxfCpWoLXqR5PFbcxPDaEk0wCPwgA */
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
    },

    acceptTrade: {
      invoke: {
        src: 'acceptTradeMachine',
        id: TradingMachinesIds.ACCEPT_TRADE,
        input: ({context: {userId}, event: {currentTrade}}) => ({
          data: {userId, currentTrade},
        }),
        onDone: 'waitingTradeOffers',
      },
    },

    idle: {
      on: {
        start: {
          target: 'waitingTradeOffers',
          actions: {type: 'setInitialData', params: ({event}) => event},
        },
      },
    },

    createTrade: {
      invoke: {
        src: 'createTradeMachine',
        id: TradingMachinesIds.CREATE_TRADE,
        input: ({context: {userId}, event: {currentTrade}}) => ({
          data: {userId, currentTrade},
        }),
        onDone: 'waitingTradeOffers',
      },
    },
  },
});

export const tradingActor = createActor(tradingMachine);
tradingActor.start();

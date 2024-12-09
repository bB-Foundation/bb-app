import {createActor, setup} from 'xstate';

import Quest from 'types/quest';
import {JoinQuestData, LeaveQuestData} from './quest.types';
import api from 'configs/axios';
import {UserProfile} from 'types/user';
import {getDistanceBetweenPointsInKm} from 'src/shared/utils/location';

export const joinQuest = async ({
  questId,
  txHash,
}: JoinQuestData): Promise<void> =>
  (await api.post<void>(`/quest/join/${questId}`, {txHash})).data;

export const leaveQuest = async ({
  questId,
  txHash,
}: LeaveQuestData): Promise<void> =>
  (await api.post<void>(`/quest/leave/${questId}`, {txHash})).data;

export const defineUserParticipateQuest = (
  quest: Quest,
  currentUserProfile: UserProfile,
): boolean => !!quest.users.find(u => u.email === currentUserProfile.email);

export const calculateDistanceFromQuestInKm = (
  userLatitude: number | undefined,
  userLongitude: number | undefined,
  quest: Quest | undefined,
): number | undefined => {
  if (!userLatitude || !userLongitude || !quest) return;

  return getDistanceBetweenPointsInKm(
    userLatitude,
    userLongitude,
    +quest.latitude,
    +quest.longitude,
  );
};

export const getDistanceLabel = (distanceInKm: number | undefined): string => {
  if (distanceInKm === undefined) return '';

  let distanceLabel = '';

  if (distanceInKm < 1) {
    distanceLabel = `${Math.round(distanceInKm * 1000)}m`;
  } else {
    if (distanceInKm.toFixed(1).toString().split('.')[1] === '0') {
      distanceLabel = `${distanceInKm.toFixed(0)} km`;
    } else {
      distanceLabel = `${distanceInKm.toFixed(1)} km`;
    }
  }

  return distanceLabel;
};

export const machine = setup({
  types: {
    context: {} as {},
    events: {} as
      | {type: 'reset'}
      | {type: 'done'}
      | {type: 'toggle'}
      | {type: 'reject'}
      | {type: 'setIsParticipient'}
      | {type: 'setIsNotParticipient'},
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2UoBswEUCucyACgIYBOyAlgMaUAOJAdsrAMRlxjIDaADALqJQdVLEpVUjISAAeiACwAmADQgAnokWKAbADptigMyGAjPPkB2Rb14X5AVgC+j1WgzZ8hUhRr0mLXUoIbFZYLgBJWG8qWjpKMGY+QSQQETEJKRS5BC09Q0UADl4AThN7B0NtewtVDRzjXV5DYuKLExNjDpNeAudXdCxcAlhichi-ZlhA4LBQiNgAOVRRn1j4xIFpNPFKSWls3N18otLy+0rq2sQTAsVdcpsbG6tCiws+kDdBzxHo3wZJoEomN-utkKwvtgkltRDs9llEFYrggzIoTLoTEZFK07PJjE4XJ8Bh5hitxgCApRFss-msEuDIWBoSlthl9ohbsjSncChZ8W8bh0rB9GT8yf9-FNYHgAEYAW3EABkwCQAG5gXTYNVDQgAYUkyDIJGo4IgkiZmxZsLZCIQ8naGPsBm0+WMhgK9layK6Fl0xSd2jK9gKRRDihFxJ1vxBsUluml8qVKvVmuTUeQ+uYRpN7DAACswCbmcJrbtMqBsvb0WVna7jB6vepruZ7BisdUXiYXRH3OnaRMAgmFchldrU9qxbmC0XLSX0mX2QgquiLAVMcZtLz7Jiak2Ufl5Ec+YYmloCoZhYTRaT+xSpbLh6OU1r1ZOzYwLck53Dy7IOUU-U3bRih6XhPWKe1vWsQx9CxAptDeZ1eG0HtvhvGMB3vRMRzTXQwDIMhUDIVgZBGEhkA1EgADMKLIAAKewbAASghSMxVvOMhyTMd8MIshi1SUt4QrRADG9coYIvfJeExEwLBdGTUJJLwMLveMH3EAApVBKEYXQ8x0xgxUzQ1jXBDhpx4WdBPnYS-wQQxPT9ZC5N4IxSl5eTkQ7I96wQl5DHkYolL7VTOI05BtN0-TDOMg1s1Nc0BNZBdbUc4pnMDCw3OaZ4vL3BxeF0axtH87dSvkbR5BC9iwsBLjIsMmLdLfJLrJSuzsjXX08T5PEHG6Bx7GRfFdF5YwzxDD0TGCq82PQ1ZMPU7Cor0gyWtJKdCysr8bJ-RdgwKYqgpDF18idSCCqdWC3WKQKShdaq5t7WrFrUhrVrwgiiJIsiKN0ajaIY5jWJehbyXClamt4ojkqE39snsFQ9y7AwbpKvkZq7XoPkYVAIDgaRrxUt7JRhWyEcQABabQuVbXh5EeJmmcMGrwYlQEgmwcn9ttVEjkKMCPT5HprGGvctF9ddsQKYpbiUPk2ZJiHOeBN6wR5m0RIQUpfWQrQWhsC9eXkEbsTbTo7AZtcCX6MHlY5ylqXFOlmE11LtblorPUqSrHPG2mUesFdjxK7QehPd5nrQh3Y3qiKnzAd3OuuF1iuKTdWhK84oJPXQHCqCwQKqPFbaJe3o1J+PsMT8dX1JEyEuTymcgdbFM6sZCc5RvEMrD-XFCUc6lcrlXBwT3CX3TZuDrKMbBf9Plqn9ApvVMI6C-Dmw5cYnG7Zj0fHawx9cJhsgZ9tCxroqZDA1l4otHFuozHdXzFCRow13fvfy4Pl2lo+oZC+2tMSHmOELaoJ5bhgRGmjbKpVsr6wmvJEe-93oRU+utIyDd4pmWAfZOSdxwHBkgaLGBe5qjogLlYIKlgPKoI4tXYcmDYqknwZWKq9xVw2EUHYMorRA51EKroeB2UChBWDLfMuxND5x3HlDaKZ92GiQfn6NEbQQyBVaKbCh2UbqOSaCUJoKDnCOCAA */
  context: {},

  id: 'toggleQuestParticipants',
  initial: 'idle',

  states: {
    idle: {
      on: {
        setIsParticipient: {
          target: 'isParticipient',
        },
        setIsNotParticipient: {
          target: 'isNotParticipient',
        },
      },
    },
    isParticipient: {
      on: {
        toggle: {
          target: 'submitLeave',
        },
      },
    },
    isNotParticipient: {
      on: {
        toggle: {
          target: 'submitJoin',
        },
      },
    },
    submitLeave: {
      initial: 'leaveQuestContract',
      states: {
        leaveQuestContract: {
          on: {
            done: 'leaveQuest',
            reject: 'error',
          },
        },
        leaveQuest: {
          on: {
            reject: 'error',
            done: '#toggleQuestParticipants.isNotParticipient',
          },
        },
        error: {
          after: {
            '500': '#toggleQuestParticipants.isParticipient',
          },
        },
      },
    },
    submitJoin: {
      initial: 'joinQuestContract',
      states: {
        joinQuestContract: {
          on: {
            reject: 'error',
            done: 'joinQuest',
          },
        },
        joinQuest: {
          on: {
            done: '#toggleQuestParticipants.isParticipient',
            reject: 'error',
          },
        },
        error: {
          after: {
            '500': '#toggleQuestParticipants.isNotParticipient',
          },
        },
      },
    },
  },

  on: {
    reset: '.idle',
  },
});

export const toggleQuestParticipantsActor = createActor(machine);
toggleQuestParticipantsActor.start();

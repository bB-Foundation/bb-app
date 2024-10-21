import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';

import store from '../redux-store';
import {emailVerificationPage, questsPage} from 'src/redux-store/slices';
import QuestWithDistance from 'types/quest/quest-with-distance';
import {QuestCategory, QuestStatus} from 'types/quest';
import User, {UserRole, UserStatus} from 'types/user';

export const Providers = ({children}: {children: React.ReactNode}) => {
  const queryClient = new QueryClient();

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />

      <ApplicationProvider {...eva} theme={eva.light}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>{children}</NavigationContainer>
        </QueryClientProvider>
      </ApplicationProvider>
    </>
  );
};

export const testUserCredentials = {
  email: 'test-email@gmail.com',
  password: '12345Aa!',
};

type Store = typeof store;

type Wrapper = ({children}: {children: React.ReactNode}) => React.JSX.Element;

type TestStore = {
  store: Store;
  wrapper: Wrapper;
};

export function setupTestStore(): TestStore {
  const refObj: {
    store: Store | undefined;
    wrapper: Wrapper | undefined;
  } = {store: undefined, wrapper: undefined};

  beforeEach(() => {
    const mockStore = configureMockStore();
    refObj.store = store;
    refObj.wrapper = ({children}: {children: React.ReactNode}) => (
      <Provider store={mockStore}>{children}</Provider>
    );
  });

  return refObj as {store: Store; wrapper: Wrapper};
}

const configureMockStore = () =>
  configureStore({
    reducer: {
      questsPage,
      emailVerificationPage,
    },
  });

export const mockGeoPosition = {
  geoPosition: {
    coords: {
      accuracy: 5,
      altitude: 0,
      altitudeAccuracy: -1,
      heading: -1,
      latitude: 40.763775,
      longitude: -73.975024636,
      speed: -1,
    },
    timestamp: 1729413146978.615,
  },
  getGeoPositionError: undefined,
  isPermissionDenied: undefined,
  isGetPermissionError: undefined,
};

export const mockGeoPositionDenied = {
  geoPosition: undefined,
  getGeoPositionError: undefined,
  isPermissionDenied: true,
  isGetPermissionError: undefined,
};

export const basketballQuest: QuestWithDistance = {
  id: 1,
  title: 'Basketball',
  description: 'Description',
  imgUrl: 'url',
  latitude: '40.760476',
  longitude: '-73.960938',
  contractAddress: null,
  status: QuestStatus.LAUNCHED,
  category: QuestCategory.SPORTS_FITNESS,
  distanceInKm: 1,
  tasks: [],
  users: [],
};

export const CurrentUser: User = {
  bbId: 'bbId',
  email: 'test@gmail.com',
  role: UserRole.BB,
  status: UserStatus.ACTIVE,
  fullPublicKey: null,
  address: null,
};

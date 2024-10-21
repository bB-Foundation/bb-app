import React from 'react';
import {act, fireEvent, render, waitFor} from '@testing-library/react-native';

import * as hooks from './quest.hooks';

import Quests from '.';
import {basketballQuest, mockGeoPosition, Providers} from 'configs/tests';
import useGeoPosition from 'hooks/geo-position';
import api from 'configs/axios';

jest.mock('hooks/geo-position');

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useRoute: jest.fn().mockReturnValue({params: {questId: 1}}),
}));

describe('Quest component', () => {
  beforeEach(() => {
    (useGeoPosition as jest.Mock).mockImplementation(() => mockGeoPosition);
  });

  beforeEach(() => {
    jest
      .spyOn(api, 'get')
      .mockReturnValue(Promise.resolve({data: basketballQuest}));
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should render quest', async () => {
    const {getByText} = render(
      <Providers>
        <Quests />
      </Providers>,
    );

    const title = await waitFor(() => getByText(basketballQuest.title));

    await waitFor(() => expect(title).toBeDefined());
  });

  it('should not render join / leave quest button while data is not loaded', async () => {
    const {queryByTestId} = render(
      <Providers>
        <Quests />
      </Providers>,
    );

    const joinQuestButton = await waitFor(() =>
      queryByTestId('join-quest-button'),
    );
    const leaveQuestButton = await waitFor(() =>
      queryByTestId('leave-quest-button'),
    );

    await waitFor(() => expect(joinQuestButton).toBeNull());
    await waitFor(() => expect(leaveQuestButton).toBeNull());
  });

  it('should call join quest handler on join button press', async () => {
    jest.spyOn(hooks, 'useQuestLogic').mockReturnValue({
      quest: basketballQuest,
      isUserParticipateQuest: false,
      distanceFromQuestInKm: basketballQuest.distanceInKm,
    });

    const joinQuestHandler = jest.fn();
    jest.spyOn(hooks, 'useButtonHandlers').mockReturnValue({
      joinQuestHandler,
      leaveQuestHandler: jest.fn(),
    });

    const {getByTestId, queryByTestId} = render(
      <Providers>
        <Quests />
      </Providers>,
    );

    const joinQuestButton = await waitFor(() =>
      getByTestId('join-quest-button'),
    );
    const leaveQuestButton = await waitFor(() =>
      queryByTestId('leave-quest-button'),
    );

    await waitFor(() => expect(leaveQuestButton).toBeNull());

    await act(() => fireEvent.press(joinQuestButton));

    await waitFor(() =>
      expect(joinQuestHandler).toHaveBeenCalledWith({
        questId: basketballQuest.id,
        txHash: 'txHash',
      }),
    );
  });

  it('should call leave quest handler on leave button press', async () => {
    jest.spyOn(hooks, 'useQuestLogic').mockReturnValue({
      quest: basketballQuest,
      isUserParticipateQuest: true,
      distanceFromQuestInKm: basketballQuest.distanceInKm,
    });

    const leaveQuestHandler = jest.fn();
    jest.spyOn(hooks, 'useButtonHandlers').mockReturnValue({
      joinQuestHandler: jest.fn(),
      leaveQuestHandler,
    });

    const {getByTestId, queryByTestId} = render(
      <Providers>
        <Quests />
      </Providers>,
    );

    const joinQuestButton = await waitFor(() =>
      queryByTestId('join-quest-button'),
    );
    const leaveQuestButton = await waitFor(() =>
      getByTestId('leave-quest-button'),
    );

    await waitFor(() => expect(joinQuestButton).toBeNull());

    await act(() => fireEvent.press(leaveQuestButton));

    await waitFor(() =>
      expect(leaveQuestHandler).toHaveBeenCalledWith({
        questId: basketballQuest.id,
        txHash: 'txHash',
      }),
    );
  });
});

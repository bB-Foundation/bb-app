import React from 'react';
import {act, fireEvent, render, waitFor} from '@testing-library/react-native';

import {QuestsList} from '.';
import {basketballQuest, Providers, setupTestStore} from 'configs/tests';
import * as hooks from './quests-list.hooks';

describe('QuestsList component', () => {
  const storeRef = setupTestStore();

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should render quests list', async () => {
    const {getByTestId} = render(
      <Providers>
        <QuestsList quests={[basketballQuest]} />
      </Providers>,
      {wrapper: storeRef.wrapper},
    );

    const questCard = getByTestId(`quest-card-${basketballQuest.id}`);

    expect(questCard).toBeDefined();
  });

  it('should call goToQuest on quest card press', async () => {
    const goToQuest = jest.fn();
    jest.spyOn(hooks, 'useQuestsListLogic').mockReturnValue({goToQuest});

    const {getByTestId} = render(
      <Providers>
        <QuestsList quests={[basketballQuest]} />
      </Providers>,
      {wrapper: storeRef.wrapper},
    );

    const questCard = getByTestId(`quest-card-${basketballQuest.id}`);

    await act(async () => {
      fireEvent.press(questCard);
    });

    await waitFor(() => expect(goToQuest).toHaveBeenCalled());
  });
});

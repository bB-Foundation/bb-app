import React from 'react';
import {render} from '@testing-library/react-native';

import Quests from '.';
import {
  mockGeoPosition,
  mockGeoPositionDenied,
  Providers,
  setupTestStore,
} from 'configs/tests';
import useGeoPosition from 'hooks/geo-position';

jest.mock('hooks/geo-position');

describe('Quests component', () => {
  const storeRef = setupTestStore();

  beforeEach(() => {
    (useGeoPosition as jest.Mock).mockImplementation(() => mockGeoPosition);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should render with default geoPosition values', async () => {
    const {getByText} = render(
      <Providers>
        <Quests />
      </Providers>,
      {wrapper: storeRef.wrapper},
    );

    const filtersButton = getByText(/filter/i);

    expect(filtersButton).toBeDefined();
  });

  it('should render button to get geo permissions if user deny it', async () => {
    (useGeoPosition as jest.Mock).mockImplementation(
      () => mockGeoPositionDenied,
    );

    const {getByTestId} = render(
      <Providers>
        <Quests />
      </Providers>,
      {wrapper: storeRef.wrapper},
    );

    const requestGeoPermissionButton = getByTestId('request-geo-permission');

    expect(requestGeoPermissionButton).toBeDefined();
  });
});

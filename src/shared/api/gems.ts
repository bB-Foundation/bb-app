import {groupBy} from 'lodash';

import api from 'configs/axios';
import {GemColor, GemMetadata} from 'types/gem';
import {GemFilters} from '../hooks/gems/gems.types';

export const getGemById = async (tokenId: number) =>
  (await api.get<GemMetadata>(`reward/gem/metadata/${tokenId}`)).data;

export const getGems = async ({userId}: GemFilters): Promise<GemMetadata[]> =>
  (await api.get<GemMetadata[]>(`/reward/gem/list/${userId}`)).data;

export const stackGemsByColor = (gems: GemMetadata[]) =>
  groupBy(gems, gem => gem.attributes.color);

export const getGemImageSourceByColor = (gemColor: string) => {
  switch (gemColor) {
    case 'black':
      return require('src/assets/images/quests/assets/gem-black.png');
    case GemColor.BLUE:
      return require('src/assets/images/quests/assets/gem-blue.png');
    case GemColor.YELLOW:
      return require('src/assets/images/quests/assets/gem-yellow.png');
    case GemColor.PINK:
      return require('src/assets/images/quests/assets/gem-pink.png');
    case GemColor.PURPLE:
      return require('src/assets/images/quests/assets/gem-purple.png');
    case GemColor.GREEN:
      return require('src/assets/images/quests/assets/gem-green.png');
  }
};

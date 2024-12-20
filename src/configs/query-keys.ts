import {GemFilters} from 'hooks/gems/gems.types';
import {LoomisFilters} from 'hooks/loomis/loomis.types';
import QuestFilters from 'types/quest/quest-filters';

enum QueryKeys {
  QUESTS = 'QUESTS',
  CURRENT_USER_PROFILE = 'CURRENT_USER_PROFILE',
  GEMS = 'GEMS',
  LOOMIS = 'LOOMIS',
  TRADES = 'TRADES',
}

const queryKeys = {
  // QUESTS
  getQuests: (filters: QuestFilters) => [QueryKeys.QUESTS, filters],
  getQuestById: (questId: number) => [QueryKeys.QUESTS, questId],
  // USER PROFILE
  getCurrentUserProfile: () => [QueryKeys.CURRENT_USER_PROFILE],
  // GEMS
  getGems: (filters: GemFilters) => [QueryKeys.GEMS, filters],
  getGemById: (gemId: number) => [QueryKeys.GEMS, gemId],
  getLoomis: (filters: LoomisFilters) => [QueryKeys.LOOMIS, filters],
  // TRADE
  getTradeById: (tradeId: number) => [QueryKeys.TRADES, tradeId],
};

export default queryKeys;

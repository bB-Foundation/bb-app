import QuestFilters from 'types/quest/quest-filters';

enum QueryKeys {
  QUESTS = 'QUESTS',
  CURRENT_USER_PROFILE = 'CURRENT_USER_PROFILE',
}

const queryKeys = {
  // QUESTS
  getQuests: (filters: QuestFilters) => [QueryKeys.QUESTS, filters],
  getQuestById: (questId: number) => [QueryKeys.QUESTS, questId],
  // USER PROFILE
  getCurrentUserProfile: () => [QueryKeys.CURRENT_USER_PROFILE],
};

export default queryKeys;

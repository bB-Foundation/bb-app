enum QueryKeys {
  QUESTS = 'QUESTS',
  CURRENT_USER_PROFILE = 'CURRENT_USER_PROFILE',
}

const queryKeys = {
  // QUESTS
  getQuests: () => [QueryKeys.QUESTS],
  getQuestById: (questId: number) => [QueryKeys.QUESTS, questId],
  // USER PROFILE
  getCurrentUserProfile: () => [QueryKeys.CURRENT_USER_PROFILE],
};

export default queryKeys;

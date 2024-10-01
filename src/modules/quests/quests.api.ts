import api from 'configs/axios';
import Quest from 'types/quest';

export const getQuests = async (): Promise<{quests: Quest[]}> =>
  (await api.get<{quests: Quest[]}>('/quest')).data;

import api from 'configs/axios';
import {UserProfile} from 'types/user';

export const fetUserByBbId = async (bbId: string) =>
  (await api.get<UserProfile>(`user/search/${bbId}`)).data;

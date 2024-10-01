import api from 'configs/axios';
import {UserProfile} from 'types/user';

export const getCurrentUserProfile = async (): Promise<UserProfile> =>
  (await api.get<UserProfile>('/user')).data;

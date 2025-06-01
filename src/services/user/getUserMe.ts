import { customFetch } from '@/utils/customFetch';

export interface UserMeResponse {
  userId: string;
  email: string;
  name: string;
  profileImageUrl: string;
  score: number;
  createdAt: string;
}

export const getUserMe = async (): Promise<UserMeResponse | undefined> => {
  return customFetch<UserMeResponse>('/users/me');
};

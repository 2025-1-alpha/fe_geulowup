import { customFetch } from '@/utils/customFetch';

export interface SignupRequest {
  name: string;
  job: string;
  tags: string[];
}

export const userSignUp = async (payload: SignupRequest): Promise<void> => {
  return customFetch('/users/sign-up', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

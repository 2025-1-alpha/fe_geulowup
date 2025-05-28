import { checkAuth } from '@/utils/checkAuth';
import { useUnsaveModalStore } from '@/stores/useUnsaveModalStore';

export const useAuth = () => {
  const { openUnsaveModal } = useUnsaveModalStore();

  const requireAuth = (): boolean => {
    const isAuthenticated = checkAuth();

    if (!isAuthenticated) {
      openUnsaveModal();
      return false;
    }

    return true;
  };

  return { requireAuth };
};

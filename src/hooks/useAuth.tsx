import { checkAuth } from '@/utils/checkAuth';
import { useLoginModalStore } from '@/stores/useLoginModal';

export const useAuth = () => {
  const {  openLoginModal } = useLoginModalStore();

  const requireAuth = (): boolean => {
    const isAuthenticated = checkAuth();

    if (!isAuthenticated) {
      openLoginModal();
      return false;
    }

    return true;
  };

  return { requireAuth };
};

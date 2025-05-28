import { checkAuth } from '@/utils/checkAuth';
import { useLoginModalStore } from '@/stores/useLoginModal';

export const useAuth = () => {
  const { isLoginOpen, openLoginModal } = useLoginModalStore();

  const requireAuth = (): boolean => {
    const isAuthenticated = checkAuth();

    if (!isAuthenticated) {
      openLoginModal();
      console.log(isLoginOpen)
      return false;
    }

    return true;
  };

  return { requireAuth };
};

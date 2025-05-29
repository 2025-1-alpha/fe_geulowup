export const checkAuth = (): boolean => {
  if (typeof window === 'undefined') return false;

  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  return !!(token && user);
};

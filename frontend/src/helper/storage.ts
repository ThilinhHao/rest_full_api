import { firestoreFirebaseAuthApp } from '@hooks/useFireBase/useFireBase';
import { storeSetAuth, storeSetToken, storeSetUserType } from '@store/auth-reducer';
import { store } from 'rootStore';

export const accessToken = 'accessToken';
export const refreshToken = 'refreshToken';

export const setItem = (key: string, value: any) => {
  window.localStorage.setItem(key, value);
};

export const getItem = (key: string) => {
  const value = window.localStorage.getItem(key);
  return value === null ? '' : value;
};

export const setToken = (value: string) => {
  setItem(accessToken, value);
};

export const clearToken = () => setToken('');

export const getToken = () => getItem(accessToken);

export const setRefreshToken = (value: string) => {
  setItem(refreshToken, value);
};

export const clearRefreshToken = () => setRefreshToken('');

export const getRefreshToken = () => getItem(refreshToken);

export const handleLogout = (isNavigateToLogin: boolean = true) => {
  store.dispatch(storeSetToken(''));
  store.dispatch(storeSetUserType(0));
  store.dispatch(storeSetAuth(null));
  firestoreFirebaseAuthApp?.signOut();
  setTimeout(() => {
    window.location.reload();
    if (isNavigateToLogin) (window as any).location.href = '/login';
  }, 100);
};

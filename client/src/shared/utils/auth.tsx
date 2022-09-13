import { UserRole } from 'shared/const';

interface IUserAuthData {
  userId: number | string;
  token: string;
  userRole: UserRole;
}

const userAuthDataKey = 'userAuthData';

export const getAuthToken = () => {
  const authData = getAuthData();
  if (authData) return authData.token;
  else return null;
};

export const storeAuthData = (userData: IUserAuthData) => {
  localStorage.setItem(userAuthDataKey, JSON.stringify(userData));
};

export const getAuthData = () => JSON.parse(localStorage.getItem(userAuthDataKey) || 'null');

export const resetAuthData = () => localStorage.setItem(userAuthDataKey, '');

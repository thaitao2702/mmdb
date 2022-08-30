const tokenKey = 'authToken'

export const getAuthToken = () => localStorage.getItem(tokenKey);

export const storeAuthToken = (token:string) => localStorage.setItem(tokenKey, token);

export const removeAuthToken = () => localStorage.removeItem(tokenKey)
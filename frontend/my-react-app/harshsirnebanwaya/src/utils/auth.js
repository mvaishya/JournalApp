// Authentication utility functions for managing user sessions

const AUTH_STORAGE_KEY = 'journal_app_user';

export const saveUserToStorage = (user) => {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Failed to save user to localStorage:', error);
  }
};

export const getUserFromStorage = () => {
  try {
    const userJson = localStorage.getItem(AUTH_STORAGE_KEY);
    return userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    console.error('Failed to retrieve user from localStorage:', error);
    return null;
  }
};

export const clearUserFromStorage = () => {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear user from localStorage:', error);
  }
};

export const isUserLoggedIn = () => {
  return getUserFromStorage() !== null;
};

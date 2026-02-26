const ACCESS_TOKEN_KEY = "access_token";
const USER_KEY = "user";
const isClient = () => typeof window !== "undefined";

export const storage = {
  getAccessToken: (): string | null =>
    isClient() ? localStorage.getItem(ACCESS_TOKEN_KEY) : null,

  setAccessToken: (token: string): void => {
    if (isClient()) localStorage.setItem(ACCESS_TOKEN_KEY, token);
  },

  removeAccessToken: (): void => {
    if (isClient()) localStorage.removeItem(ACCESS_TOKEN_KEY);
  },

  clearAuth: (): void => {
    if (isClient()) {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  },
};


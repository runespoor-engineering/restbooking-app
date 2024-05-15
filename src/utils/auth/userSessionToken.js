import { PLAYER_TOKEN_LOCAL_STORAGE_ITEM, SSR_MODE } from "../../constants/common";

export const getPlayerSessionToken = () =>
  !SSR_MODE ? localStorage.getItem(PLAYER_TOKEN_LOCAL_STORAGE_ITEM) : null;

export const setPlayerSessionToken = (token) => {
  if (!SSR_MODE) localStorage.setItem(PLAYER_TOKEN_LOCAL_STORAGE_ITEM, token);
};

export const clearPlayerSessionToken = () => {
  if (!SSR_MODE) localStorage.removeItem(PLAYER_TOKEN_LOCAL_STORAGE_ITEM);
};

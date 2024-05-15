import { isLoggedInVar } from '../apollo/cache';
import { clearPlayerSessionToken } from './userSessionToken';

// TODO Looks like a good place for refactor or move from DAL
const logoutPlayer = async () => {
  clearPlayerSessionToken();
  isLoggedInVar(false);
};

export default logoutPlayer;

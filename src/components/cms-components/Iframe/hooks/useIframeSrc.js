import { useContext, useEffect, useMemo, useState } from 'react';

import { UserContext } from '../../../../context/UserContext/UserContext';
import { getPlayerSessionToken } from '../../../../utils/auth/userSessionToken';
import { PLAYER_ID_REGEXP, TOKEN_MARKER_REGEXP, USERNAME_ID_REGEXP } from '../srcMarkersRegexp';

const useIframeSrc = (markedSrc) => {
  const [token, setToken] = useState(null);
  const { data: playerData } = useContext(UserContext);
  const { id: playerId, userName } = playerData?.player || {};

  const iframeSrc = useMemo(() => {
    return markedSrc
      .replace(TOKEN_MARKER_REGEXP, token)
      .replace(PLAYER_ID_REGEXP, playerId)
      .replace(USERNAME_ID_REGEXP, userName);
  }, [markedSrc, playerId, token, userName]);

  useEffect(() => {
    setToken(getPlayerSessionToken());
  }, [markedSrc, playerId]);

  return iframeSrc;
};

export default useIframeSrc;

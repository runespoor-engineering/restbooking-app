import { PLAYER_QUERY } from '../../../../../context/UserContext/graphql/queries';
import { onFormSubmitRedirectLinkVar } from '../../../../../utils/apollo/cache';
import { setPlayerSessionToken } from '../../../../../utils/auth/userSessionToken';
import removeQueryParameters from '../../../../../utils/router/removeQueryParameters';

const handlePlayerRegisterCompleted = async ({
  record,
  router,
  apolloClient,
  onFormSubmitRedirectLink,
  setIsLoggedIn,
  useSaveModalHistory
}) => {
  const { jwt } = record;
  setPlayerSessionToken(jwt);
  await apolloClient.refetchQueries({
    include: [PLAYER_QUERY]
  });
  if (onFormSubmitRedirectLink) {
    setIsLoggedIn(true);
    if (useSaveModalHistory !== false) {
      router.push(onFormSubmitRedirectLink);
    } else {
      router.replace(onFormSubmitRedirectLink);
    }
    onFormSubmitRedirectLinkVar('');
  } else {
    removeQueryParameters(router, ['modal'], useSaveModalHistory);
  }
};

const handlePlayerLoginCompleted = async ({
  record,
  router,
  apolloClient,
  onFormSubmitRedirectLink,
  setIsLoggedIn,
  useSaveModalHistory
}) => {
  const { jwt } = record;
  setPlayerSessionToken(jwt);
  await apolloClient.refetchQueries({
    include: [PLAYER_QUERY]
  });
  if (onFormSubmitRedirectLink) {
    setIsLoggedIn(true);
    if (useSaveModalHistory !== false) {
      router.push(onFormSubmitRedirectLink);
    } else {
      router.replace(onFormSubmitRedirectLink);
    }
    onFormSubmitRedirectLinkVar('');
  } else {
    removeQueryParameters(router, ['modal'], useSaveModalHistory);
  }
};

const FORM_TYPE_MUTATION_COMPLETED_HANDLER_MAP = {
  registration: handlePlayerRegisterCompleted,
  shortRegistration: handlePlayerRegisterCompleted,
  login: handlePlayerLoginCompleted
};

export default FORM_TYPE_MUTATION_COMPLETED_HANDLER_MAP;

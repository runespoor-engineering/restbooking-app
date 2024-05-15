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
  const { sessionToken } = record;
  setPlayerSessionToken(sessionToken);
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
  const { sessionToken } = record;
  setPlayerSessionToken(sessionToken);
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

const handleTicketOpenCompleted = async ({ router }) => {
  removeQueryParameters(router, ['modal']);
};

const FORM_TYPE_MUTATION_COMPLETED_HANDLER_MAP = {
  registration: handlePlayerRegisterCompleted,
  shortRegistration: handlePlayerRegisterCompleted,
  login: handlePlayerLoginCompleted,
  ticketOpen: handleTicketOpenCompleted
};

export default FORM_TYPE_MUTATION_COMPLETED_HANDLER_MAP;

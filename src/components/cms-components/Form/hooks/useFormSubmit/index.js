import { useApolloClient, useMutation, useReactiveVar } from '@apollo/client';
import { useRouter } from 'next/router';
import { useCallback, useContext, useState } from 'react';

import { FORM_TYPES } from '../../../../../constants/cms';
import { MUTATION_STATUS } from '../../../../../constants/serverConstants';
import { useCmsStaticDataContext } from '../../../../../context/CmsStaticDataContext';
import ConfigContext from '../../../../../context/ConfigContext';
import { UserContext } from '../../../../../context/UserContext/UserContext';
import useGlobalTranslations, {
  GLOBAL_TRANSLATION_TYPE
} from '../../../../../hooks/useGlobalTranslations';
import { onFormSubmitRedirectLinkVar } from '../../../../../utils/apollo/cache';
import { PLAYER_LOGIN_MUTATION, PLAYER_REGISTER_MUTATION } from '../../graphql';
import { FORM_TYPE_MUTATION_COMPLETED_HANDLER_MAP } from '../../utils';

const FORM_MUTATION_MAP = {
  [FORM_TYPES.registration]: PLAYER_REGISTER_MUTATION,
  [FORM_TYPES.login]: PLAYER_LOGIN_MUTATION
};
const FORM_QUERY_UPDATE_MAP = {};

const useFormSubmit = (formType, onSubmitLinkToOpen, anonymousFallbackLink) => {
  const router = useRouter();
  const { setIsLoggedIn, isLoggedIn } = useContext(UserContext);
  const onFormSubmitRedirectLink = useReactiveVar(onFormSubmitRedirectLinkVar);
  const apolloClient = useApolloClient();
  const { getGlobalTranslation } = useGlobalTranslations();
  const { globalUiConfigs } = useCmsStaticDataContext();
  const { useSaveModalHistory } = globalUiConfigs?.data[0]?.attributes || {};
  const { bmsPartnerId } = useContext(ConfigContext);
  const [requestStatus, setRequestStatus] = useState(null);
  const [requestProblems, setRequestProblems] = useState(null);
  const handleMutationCompleted = FORM_TYPE_MUTATION_COMPLETED_HANDLER_MAP[formType];

  // TODO Replace `PLAYER_REGISTER_MUTATION` placeholder after player updating mutations will be implemented !!!
  const [mutate, mutationResult] = useMutation(
    FORM_MUTATION_MAP[formType] || PLAYER_REGISTER_MUTATION,
    {
      onCompleted: async (data) => {
        const record = Object.values(data)[0];

        setRequestStatus(MUTATION_STATUS.SUCCESS);

        if (handleMutationCompleted)
          await handleMutationCompleted({
            record,
            router,
            apolloClient,
            onFormSubmitRedirectLink,
            setIsLoggedIn,
            useSaveModalHistory
          });

        if (onSubmitLinkToOpen) router.push(onSubmitLinkToOpen);
      },
      onError: ({ networkError }) => {
        if (networkError && networkError?.statusCode) {
          setRequestStatus(MUTATION_STATUS.FAIL);
          setRequestProblems([
            {
              problemCode: networkError?.statusCode,
              message: getGlobalTranslation({
                iqsTranslationId: networkError?.statusCode,
                status: MUTATION_STATUS.FAIL,
                type: GLOBAL_TRANSLATION_TYPE.ERROR
              })
            }
          ]);
        }
      },
      refetchQueries: [{ query: FORM_QUERY_UPDATE_MAP[formType], variables: { bmsPartnerId } }]
    }
  );

  const handleFormSubmit = useCallback(
    async (data) => {
      setRequestStatus(null);

      if (anonymousFallbackLink && !isLoggedIn) {
        router.push(anonymousFallbackLink);
      } else {
        mutate({
          variables: {
            input: {
              ...data
            }
          }
        });
      }
    },
    [anonymousFallbackLink, isLoggedIn, router, mutate]
  );
  return [handleFormSubmit, mutationResult, requestStatus, requestProblems];
};

export default useFormSubmit;

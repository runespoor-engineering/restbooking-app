// import { useApolloClient, useMutation, useReactiveVar } from '@apollo/client';
// import { bmsAPI, onFormSubmitRedirectLinkVar } from '@clovertech-portal/common-dal';
// import { useRouter } from 'next/router';
// import { useCallback, useContext, useMemo, useState } from 'react';

// import { FORM_TYPES, MUTATION_STATUS } from '../../../../../constants';
// import { useCmsStaticDataContext } from '../../../../../context/CmsStaticDataContext';
// import { useUserTrackingContext } from '../../../../../context/UserTrackingContext/UserTrackingContext';
// import { BONUSES_DEPOSIT_QUERY } from '../../../../../graphql/federation/queries/index';
// import useGlobalTranslations, {
//   GLOBAL_TRANSLATION_TYPE
// } from '../../../../../hooks/useGlobalTranslations';
// import ConfigContext from '../../../../../utils/context/ConfigContext';
// import { UserContext } from '../../../../../utils/providers/UserProvider/UserContext';
// import { TICKETS_QUERY } from '../../../Tickets/graphql/queries';
// import {
//   BONUS_ACTIVATE_BY_PROMO_CODE_MUTATION,
//   COMPLIMENTARY_POINTS_EXCHANGE_MUTATION,
//   EMAIL_VERIFY_MUTATION,
//   PASSWORD_RECOVER_MUTATION,
//   PASSWORD_SEND_RECOVERY_TOKEN_BY_EMAIL_MUTATION,
//   PASSWORD_UPDATE_MUTATION,
//   PLAYER_LOGIN_MUTATION,
//   PLAYER_REGISTER_MUTATION,
//   PLAYER_REGISTER_SHORT_MUTATION,
//   PLAYER_VERIFICATION_DOCUMENTS,
//   TICKET_OPEN_MUTATION
// } from '../../graphql';
// import { FORM_TYPE_MUTATION_COMPLETED_HANDLER_MAP } from '../../utils';

// const FORM_MUTATION_MAP = {
//   [FORM_TYPES.registration]: PLAYER_REGISTER_MUTATION,
//   [FORM_TYPES.login]: PLAYER_LOGIN_MUTATION,
//   [FORM_TYPES.sendRecoveryTokenByEmail]: PASSWORD_SEND_RECOVERY_TOKEN_BY_EMAIL_MUTATION,
//   [FORM_TYPES.recoverPassword]: PASSWORD_RECOVER_MUTATION,
//   [FORM_TYPES.updatePassword]: PASSWORD_UPDATE_MUTATION,
//   [FORM_TYPES.shortRegistration]: PLAYER_REGISTER_SHORT_MUTATION,
//   [FORM_TYPES.verifyEmail]: EMAIL_VERIFY_MUTATION,
//   [FORM_TYPES.ticketOpen]: TICKET_OPEN_MUTATION,
//   [FORM_TYPES.exchangeComplimentaryPoints]: COMPLIMENTARY_POINTS_EXCHANGE_MUTATION,
//   [FORM_TYPES.activatePromoCode]: BONUS_ACTIVATE_BY_PROMO_CODE_MUTATION
// };
// const FORM_QUERY_UPDATE_MAP = {
//   [FORM_TYPES.ticketOpen]: TICKETS_QUERY,
//   [FORM_TYPES.activatePromoCode]: BONUSES_DEPOSIT_QUERY
// };

// const useFormSubmit = (formType, onSubmitLinkToOpen, anonymousFallbackLink) => {
//   const router = useRouter();
//   const { setIsLoggedIn, isLoggedIn } = useContext(UserContext);
//   const onFormSubmitRedirectLink = useReactiveVar(onFormSubmitRedirectLinkVar);
//   const apolloClient = useApolloClient();
//   const { getGlobalTranslation } = useGlobalTranslations();
//   const { globalUiConfigs } = useCmsStaticDataContext();
//   const { useSaveModalHistory } = globalUiConfigs?.data[0]?.attributes || {};
//   const { data: playerData } = useContext(UserContext);
//   const { bmsPartnerId } = useContext(ConfigContext);
//   const { id: playerId } = playerData?.player || {};
//   const [requestStatus, setRequestStatus] = useState(null);
//   const [requestProblems, setRequestProblems] = useState(null);
//   const handleMutationCompleted = FORM_TYPE_MUTATION_COMPLETED_HANDLER_MAP[formType];

//   // TODO Replace `PLAYER_REGISTER_MUTATION` placeholder after player updating mutations will be implemented !!!
//   const [mutate, mutationResult] = useMutation(
//     FORM_MUTATION_MAP[formType] || PLAYER_REGISTER_MUTATION,
//     {
//       onCompleted: async (data) => {
//         const { status, problems, record } = Object.values(data)[0];

//         setRequestStatus(status);
//         if (status === MUTATION_STATUS.FAIL) {
//           const translatedProblems = problems.map((problem) => ({
//             ...problem,
//             message: getGlobalTranslation({
//               iqsTranslationId: problem.problemCode,
//               status: MUTATION_STATUS.FAIL,
//               type: GLOBAL_TRANSLATION_TYPE.ERROR
//             })
//           }));
//           setRequestProblems(translatedProblems);
//           return;
//         }

//         if (handleMutationCompleted)
//           await handleMutationCompleted({
//             record,
//             router,
//             apolloClient,
//             onFormSubmitRedirectLink,
//             setIsLoggedIn,
//             useSaveModalHistory
//           });

//         if (onSubmitLinkToOpen) router.push(onSubmitLinkToOpen);
//       },
//       onError: ({ networkError }) => {
//         if (networkError && networkError?.statusCode) {
//           setRequestStatus(MUTATION_STATUS.FAIL);
//           setRequestProblems([
//             {
//               problemCode: networkError?.statusCode,
//               message: getGlobalTranslation({
//                 iqsTranslationId: networkError?.statusCode,
//                 status: MUTATION_STATUS.FAIL,
//                 type: GLOBAL_TRANSLATION_TYPE.ERROR
//               })
//             }
//           ]);
//         }
//       },
//       refetchQueries: [{ query: FORM_QUERY_UPDATE_MAP[formType], variables: { bmsPartnerId } }]
//     }
//   );

//   const userRegistrationTrackingData = useUserTrackingContext();

//   const formExtraData = useMemo(() => {
//     const FORM_TYPE_TO_EXTRA_INPUT_VARIABLES_MAP = {
//       registration: userRegistrationTrackingData
//     };

//     return FORM_TYPE_TO_EXTRA_INPUT_VARIABLES_MAP[formType];
//   }, [formType, userRegistrationTrackingData]);

//   const handleFormSubmit = useCallback(
//     async (data) => {
//       setRequestStatus(null);

//       if (anonymousFallbackLink && !isLoggedIn) {
//         router.push(anonymousFallbackLink);
//       } else if (formType === FORM_TYPES.kycVerify) {
//         try {
//           const kycVerificationResponse = await bmsAPI.uploadImage(bmsPartnerId, playerId, data);

//           if (kycVerificationResponse.ResponseCode === 0) {
//             setRequestStatus(MUTATION_STATUS.SUCCESS);
//             await apolloClient.refetchQueries({
//               include: [PLAYER_VERIFICATION_DOCUMENTS]
//             });
//           } else {
//             setRequestStatus(MUTATION_STATUS.FAIL);
//             setRequestProblems([
//               {
//                 message: getGlobalTranslation({
//                   iqsTranslationId: kycVerificationResponse.ResponseCode,
//                   type: GLOBAL_TRANSLATION_TYPE.ERROR,
//                   status: MUTATION_STATUS.FAIL
//                 })
//               }
//             ]);
//           }

//           if (onSubmitLinkToOpen) router.push(onSubmitLinkToOpen);
//         } catch (error) {
//           // TODO: handle error
//         }
//       } else {
//         mutate({
//           variables: {
//             input: {
//               ...data,
//               ...formExtraData
//             },
//             bmsPartnerId,
//             locale: router.locale,
//             recoveryToken: router.query.recoveryToken
//           }
//         });
//       }
//     },
//     [
//       apolloClient,
//       onSubmitLinkToOpen,
//       anonymousFallbackLink,
//       isLoggedIn,
//       formType,
//       formExtraData,
//       router,
//       bmsPartnerId,
//       playerId,
//       getGlobalTranslation,
//       mutate
//     ]
//   );
//   return [handleFormSubmit, mutationResult, requestStatus, requestProblems];
// };

export default () => {};

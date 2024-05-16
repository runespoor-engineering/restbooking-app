import { useCallback, useMemo } from 'react';

import { MUTATION_STATUS } from '../../constants/serverConstants';
import { useCmsStaticDataContext } from '../../context/CmsStaticDataContext';

export const GLOBAL_TRANSLATION_GENERAL_ERROR_TRANSLATION_KEY = 'Something went wrong';
export const GLOBAL_TRANSLATION_GENERAL_SUCCESS_TRANSLATION_KEY = 'Success';

const MUTATION_STATUS_TO_GENERAL_TRANSLATION_ID_MAP = {
  FAIL: GLOBAL_TRANSLATION_GENERAL_ERROR_TRANSLATION_KEY,
  SUCCESS: GLOBAL_TRANSLATION_GENERAL_SUCCESS_TRANSLATION_KEY
};

export const GLOBAL_TRANSLATION_TYPE = {
  ERROR: 'error',
  SUCCESS: 'success',
  KYC_DOCUMENT_STATUS: 'KYCDocumentStatus',
  KYC_DOCUMENT_TYPE: 'KYCDocumentType',
  AFFILIATE_CLIENT_STATUS: 'AffiliateClientStatus'
};

export const findGlobalTranslation = ({ iqsTranslationId, type, globalTranslations }) =>
  globalTranslations?.find(
    ({ attributes }) =>
      String(attributes.iqsTranslationId) === String(iqsTranslationId) && attributes.type === type
  ) || null;

const useGlobalTranslations = () => {
  const cmsDataContext = useCmsStaticDataContext();
  const globalTranslations = useMemo(
    () => cmsDataContext.globalTranslations?.data || [],
    [cmsDataContext.globalTranslations]
  );

  const getGlobalTranslation = useCallback(
    ({ iqsTranslationId, status = MUTATION_STATUS.SUCCESS, type } = {}) => {
      const generalGlobalTranslationKey = MUTATION_STATUS_TO_GENERAL_TRANSLATION_ID_MAP[status];
      const foundGlobalTranslation = findGlobalTranslation({
        iqsTranslationId,
        type,
        globalTranslations
      });

      return (
        foundGlobalTranslation?.attributes?.translation ||
        findGlobalTranslation({
          iqsTranslationId: generalGlobalTranslationKey,
          globalTranslations
        })?.attributes?.translation ||
        generalGlobalTranslationKey
      );
    },
    [globalTranslations]
  );

  return { getGlobalTranslation };
};

export default useGlobalTranslations;

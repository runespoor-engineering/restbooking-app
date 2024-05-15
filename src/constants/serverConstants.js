export const MUTATION_STATUS = {
  FAIL: 'FAIL',
  SUCCESS: 'SUCCESS'
};

export const BONUS_STATUSES = {
  Active: 'Active',
  NotAwarded: 'NotAwarded'
};
export const BONUS_STATUS_CAPTION = {
  [BONUS_STATUSES.Active]: 'Activated',
  [BONUS_STATUSES.NotAwarded]: 'Not Awarded'
};
export const SUCCESS_NOTIFICATION_KEYS = {
  registration: 'SuccessRegisterPlayer',
  login: 'SuccessLoginPlayer',
  sendRecoveryTokenByEmail: 'SuccessSendRecoveryTokenByEmail',
  recoverPassword: 'SuccessRecoverPassword',
  verifyEmail: 'VerificationEmailHasBeenSent',
  affiliateClientInvite: 'SuccessAffiliateClientInvite',
  bonusActivateByPromoCode: 'SuccessBonusActivateByPromoCode'
};

export const CMS_PUBLICATION_STATE = {
  LIVE: 'LIVE',
  PREVIEW: 'PREVIEW'
};

export const BMS_PRODUCT_TYPES = {
  regular: 1,
  liveGame: 4
};

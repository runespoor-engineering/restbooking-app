const VERIFICATION_FORM_TYPE_TO_PLAYER_FIELD_MAP = { verifyEmail: 'isEmailVerified' };

export const isFormOfVerificationType = (formType) =>
  Object.keys(VERIFICATION_FORM_TYPE_TO_PLAYER_FIELD_MAP).includes(formType);

export const isPlayerDataVerified = (formType, playerData) => {
  return playerData?.[VERIFICATION_FORM_TYPE_TO_PLAYER_FIELD_MAP[formType]];
};

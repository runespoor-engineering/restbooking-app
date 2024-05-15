import { useMemo } from 'react';

import selectSettings from '../../../../../utils/componentSettings/selectSettings';

const getInactiveStateButtonConfig = (buttonConfig) => {
  const {
    isMuiIconButton,
    muiButtonAction,
    muiButtonLink,
    muiButtonText,
    muiIconButtonIcon,
    muiButtonStartIcon,
    muiButtonEndIcon,
    settings
  } = buttonConfig || {};

  return {
    isIconButton: isMuiIconButton,
    link: muiButtonLink,
    muiButtonProps: selectSettings(settings),
    startIcon: muiButtonStartIcon,
    endIcon: muiButtonEndIcon,
    icon: muiIconButtonIcon,
    text: muiButtonText,
    action: muiButtonAction
  };
};

const getActiveStateButtonConfig = (buttonConfig) => {
  const {
    isMuiIconButton,
    muiButtonAction,
    muiButtonLink,
    muiButtonTextActive,
    muiIconButtonIconActive,
    muiButtonStartIconActive,
    muiButtonEndIconActive,
    settings
  } = buttonConfig || {};

  return {
    isIconButton: isMuiIconButton,
    link: muiButtonLink,
    muiButtonProps: selectSettings(settings),
    startIcon: muiButtonStartIconActive,
    endIcon: muiButtonEndIconActive,
    icon: muiIconButtonIconActive,
    text: muiButtonTextActive,
    action: muiButtonAction
  };
};

const normalizeActionButtonConfig = (buttonConfig, action, isActive = false) => {
  if (!buttonConfig) return null;
  return action === 'toggleFavoriteGame' && isActive
    ? getActiveStateButtonConfig(buttonConfig)
    : getInactiveStateButtonConfig(buttonConfig);
};

const useNormalizeActionButtonConfig = (buttonConfig, action, isActive) => {
  const normalizedButtonConfig = useMemo(
    () => normalizeActionButtonConfig(buttonConfig, action, isActive),
    [buttonConfig, isActive, action]
  );
  return normalizedButtonConfig;
};

export default useNormalizeActionButtonConfig;

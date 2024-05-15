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

const normalizeButtonConfig = (buttonConfig, isActive = false) => {
  if (!buttonConfig) return null;
  return buttonConfig.muiButtonUseActiveState && isActive
    ? getActiveStateButtonConfig(buttonConfig)
    : getInactiveStateButtonConfig(buttonConfig);
};

const useNormalizedButtonConfig = (buttonConfig, isActive) => {
  const normalizedButtonConfig = useMemo(
    () => normalizeButtonConfig(buttonConfig, isActive),
    [buttonConfig, isActive]
  );
  return normalizedButtonConfig;
};

export default useNormalizedButtonConfig;

const getCurrentStateIconUrl = (stepData) => {
  const { isActive, isCompleted, activeStepIcon, completedStepIcon, defaultStepIcon } = stepData;
  if (activeStepIcon && completedStepIcon && defaultStepIcon) {
    switch (true) {
      case isActive:
        return activeStepIcon?.url;
      case isCompleted:
        return completedStepIcon?.url;
      default:
        return defaultStepIcon?.url;
    }
  }
  return null;
};

export default getCurrentStateIconUrl;

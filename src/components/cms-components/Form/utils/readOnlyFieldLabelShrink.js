const readOnlyFieldLabelShrink = (readonlyFormOptions = {}) => {
  if (Object.values(readonlyFormOptions).includes(true)) {
    return true;
  }
  return undefined;
};

export default readOnlyFieldLabelShrink;

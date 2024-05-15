// eslint-disable-next-line default-param-last
const forceLabelShrink = (fieldValue, disablingFormOptions = {}, defaultShrinkValue) => {
  if ((Object.values(disablingFormOptions).includes(true) && fieldValue) || fieldValue) {
    return true;
  }
  return defaultShrinkValue;
};

export default forceLabelShrink;

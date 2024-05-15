/**
 * Gets props from componentProps object, merges it with required props and returns the result object.
 * @param {Object} [requiredProps={}] - The required settings(props)
 * @param {Object | null} [componentProps={}] - The component (cms) settings(props)
 * @param {Object | null} [customProps={}] - The custom settings(props)
 * @returns {Object} - Merged requiredProps with componentProps[(defaultSettings | customProps)]
 */

const getComponentProps = (requiredProps = {}, componentProps = {}, customProps = {}) => {
  if (componentProps === null) return requiredProps;
  const mergedProps = {
    ...requiredProps,
    ...customProps,
    ...componentProps
  };
  return mergedProps;
};

export default getComponentProps;

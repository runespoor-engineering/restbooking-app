/**
 * HOF that provides const required props of special component for 'getComponentProps' function.
 *  @param {function} getComponentPropsFunction - Function that will be used be HOF.
 *  @param {Object} requiredProps - This object will be passed to the getComponentPropsFunction as the first argument.
 *  @returns {function} Function which takes componentProps object,
 *  passes it to the getComponentPropsFunction as the second argument and returns the result of getComponentPropsFunction call.
 */
const withRequiredProps =
  (getComponentPropsFunction, requiredProps) => (componentProps, customProps) =>
    getComponentPropsFunction(requiredProps, componentProps, customProps);

export default withRequiredProps;

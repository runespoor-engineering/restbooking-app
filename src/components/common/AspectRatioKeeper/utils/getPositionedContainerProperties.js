/**
 * Choose the `height` and `position` css props based on the `aspectRatioKeeper` `height` and `aspectRatio` properties.
 * @param {Object} aspectRatioKeeper - object with breakpoints objects that contain `height` or `aspectRatio`.
 * @param {Object} [aspectRatioKeeper.xs] - xs breakpoint.
 * @param {Object} [aspectRatioKeeper.sm] - sm breakpoint.
 * @param {Object} [aspectRatioKeeper.md] - md breakpoint.
 * @param {Object} [aspectRatioKeeper.lg] - lg breakpoint.
 * @param {Object} [aspectRatioKeeper.xl] - xl breakpoint.
 * @param {'xs' | 'sm' | 'md' | 'lg' | 'xl'} breakpoint - breakpoint value.
 * @returns {{height: 'max-content' | '100%' | String, position: 'static' | 'absolut'} | {}}
 */
const getPositionedContainerProperties = (aspectRatioKeeper, breakpoint) => {
  if (!aspectRatioKeeper) {
    return { height: 'max-content', position: 'static' };
  }
  if (aspectRatioKeeper[breakpoint]?.height) {
    return { height: aspectRatioKeeper[breakpoint]?.height, position: 'static' };
  }
  if (aspectRatioKeeper[breakpoint]?.aspectRatio) {
    return { height: '100%', position: 'absolute' };
  }
  return {};
};

export default getPositionedContainerProperties;

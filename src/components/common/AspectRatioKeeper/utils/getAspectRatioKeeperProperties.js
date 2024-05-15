const calculateAspectRatioInPercents = (aspectRatio) => aspectRatio * 100;

/**
 * Choose the `display` and `paddingTop` css prop based on the `aspectRatioKeeper` `height` and `aspectRatio` properties.
 * @param {Object} aspectRatioKeeper - object with breakpoints objects that contain `height` or `aspectRatio`.
 * @param {Object} [aspectRatioKeeper.xs] - xs breakpoint.
 * @param {Object} [aspectRatioKeeper.sm] - sm breakpoint.
 * @param {Object} [aspectRatioKeeper.md] - md breakpoint.
 * @param {Object} [aspectRatioKeeper.lg] - lg breakpoint.
 * @param {Object} [aspectRatioKeeper.xl] - xl breakpoint.
 * @param {'xs' | 'sm' | 'md' | 'lg' | 'xl'} breakpoint - breakpoint value.
 * @returns {{display: 'none' | 'block', paddingTop: String} | {}}
 */
const getAspectRatioKeeperProperties = (aspectRatioKeeper, breakpoint) => {
  if (!aspectRatioKeeper) {
    return {};
  }
  return {
    display: aspectRatioKeeper[breakpoint]?.height ? 'none' : 'block',
    paddingTop:
      aspectRatioKeeper[breakpoint]?.aspectRatio &&
      `${calculateAspectRatioInPercents(aspectRatioKeeper[breakpoint].aspectRatio)}%`
  };
};

export default getAspectRatioKeeperProperties;

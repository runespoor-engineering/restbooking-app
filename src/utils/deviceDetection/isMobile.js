import { SSR_MODE } from '../../constants/common';

const mobileDeviceRegex = /\sMobile/i;

/**
 * User Agent based mobile detection.
 * @param {Object} [ctx] NextJS page or API context, express context, null or undefined.
 * @returns {boolean | null} - Boolean value if user's device is mobile or null in case ctx was not provided in ssrMode.
 */
const isMobileDevice = (ctx) => {
  const userAgent = SSR_MODE ? ctx?.req?.headers['user-agent'] : navigator.userAgent;
  return mobileDeviceRegex.test(userAgent) || null;
};

export default isMobileDevice;

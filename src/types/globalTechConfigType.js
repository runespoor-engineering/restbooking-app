import { bool, shape, string } from 'prop-types';

export default shape({
  premierCashier: shape({
    host: string.required,
    enabled: bool.required,
    casinoId: string.required,
    cloverPID: string.required,
    skinId: string.required,
    sportsbookValues: shape()
  }),
  reCaptcha: shape({
    enabled: bool,
    secret_site_key: string,
    secret_api_key: string
  }),
  tawkto: shape({
    tawkId: string.required,
    propertyId: string.required,
    enabled: bool.required
  }),
  customerIo: shape({
    siteId: string.required,
    inAppOrgId: string.required,
    enabled: bool.required
  }),
  smartico: shape({
    brandKey: string.required,
    labelKey: string.required,
    enabled: bool.required
  }),
  cloudflare: shape({
    zoneId: string.required,
    token: string.required,
    enabled: bool.required
  }),
  gtm: shape({
    enabled: bool.required,
    gtmId: string.required
  })
});

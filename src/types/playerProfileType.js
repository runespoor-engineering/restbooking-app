import { bool, shape, string } from 'prop-types';

export default shape({
  id: string,
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  birthDate: string,
  gender: string,
  country: string,
  currency: string,
  zipCode: string,
  postalAbbreviation: string,
  city: string,
  address: string,
  phone: string,
  promoAgreement: bool,
  privacyAgreement: bool,
  termsAgreement: bool,
  isRegisteredInCashier: bool
});

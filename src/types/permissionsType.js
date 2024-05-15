import { oneOf, shape, string } from 'prop-types';

export default shape({
  availableOnlyFor: oneOf(['LoggedIn', 'LoggedOut']),
  redirectUrl: string
});

import { arrayOf, oneOf, shape, string } from 'prop-types';

import formStepType from './formStepType';

export default shape({
  form: shape({
    title: string,
    type: oneOf(['login', 'registration', 'playerProfile']),
    steps: arrayOf(formStepType)
  })
});

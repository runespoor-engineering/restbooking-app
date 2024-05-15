import { arrayOf, shape, string } from 'prop-types';

import formFieldType from './formField/formFieldDataType';

export default shape({
  id: string,
  title: string,
  description: string,
  formFields: arrayOf(formFieldType)
});

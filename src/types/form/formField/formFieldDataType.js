import { bool, oneOf, shape, string } from 'prop-types';

import optionType from '../optionType';

export default shape({
  copyright: shape({
    id: string,
    name: string,
    identifier: string,
    kind: oneOf([
      'inputText',
      'inputPassword',
      'inputEmail',
      'inputDate',
      'inputTel',
      'inputNumber',
      'inputCheckbox',
      'inputFile',
      'select'
    ]),
    options: optionType,
    label: string,
    required: bool,
    maxlength: string,
    minlength: string,
    max: string,
    min: string,
    isVisible: bool,
    pattern: string,
    extraValidator: oneOf(['zipCode', 'postalAbbreviation'])
  })
});

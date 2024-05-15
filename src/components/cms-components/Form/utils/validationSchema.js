import * as yup from 'yup';

import getValidationDate from './utils';

const validatePasswordConfirmation = function validatePasswordConfirmation(options) {
  return this.test(
    'validatePasswordConfirmation',
    options.t(`Passwords must match`),
    function validatePasswordConfirmationFunc(value) {
      return [this.parent.password, this.parent.newPassword].includes(value);
    }
  );
};

const validateLengthBetween = function between(min, max, message) {
  return this.test('between', message, (value) => {
    return value.length >= min && value.length <= max;
  });
};

const imgMimeTypes = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png'
};

const convertFileAcceptToMimeRegexp = (acceptType) => {
  if (acceptType === 'image/*') {
    return /^image\//;
  }
  if (acceptType.startsWith('image/')) {
    return new RegExp(`^${acceptType}`);
  }
  const imageMimeType = imgMimeTypes[acceptType];
  return imageMimeType
    ? new RegExp(`^${imageMimeType}$`)
    : new RegExp(`^${acceptType.replace(/^\./, '^\\w*/').replace(/\*/, '.*')}$`);
};

export const testFilesType = (files, accept) => {
  const allowedExtensions = accept.split(',').map((ext) => ext.trim().replace(/^\./, ''));

  const allowedTypesRegexes = allowedExtensions
    .filter((ext) => ext !== '*')
    .map((ext) => convertFileAcceptToMimeRegexp(ext));

  const imageRegExp = /^image\/|(png|jpe?g)$/i;

  const isImageAllowed = allowedExtensions.some((ext) => imageRegExp.test(ext));

  return files
    ? Array.from(files).every((file) => {
        const fileExt = file.name.split('.').pop().toLowerCase();
        if (allowedExtensions.includes(fileExt)) {
          return true;
        }
        if (isImageAllowed) {
          return allowedTypesRegexes.some((regex) => regex.test(file.type));
        }
        return false;
      })
    : true;
};

const HARDCODED_FIELDS_VALIDATION = {
  confirmPassword: 'validatePasswordConfirmation'
};

yup.addMethod(yup.string, 'validatePasswordConfirmation', validatePasswordConfirmation);
yup.addMethod(yup.string, 'validateLengthBetween', validateLengthBetween);

const validatorTypesMap = {
  inputText: yup.string().trim(),
  inputPassword: yup.string().trim(),
  inputEmail: yup.string().trim().email(),
  select: yup.string().trim(),
  inputDate: yup.date(),
  inputTel: yup.string().trim(),
  inputNumber: yup.number(),
  inputCheckbox: yup.bool(),
  inputFile: yup.mixed().required()
};

const createValidationSchema = (formFields, options) => {
  return formFields.reduce((acc, field) => {
    const {
      name,
      required,
      minlength,
      maxlength,
      kind,
      min,
      max,
      pattern,
      accept,
      patternErrorMessage,
      nameForErrorMessage,
      typeErrorMessage
    } = field;
    let validators = validatorTypesMap[kind];

    if (kind === 'inputDate') {
      validators = patternErrorMessage
        ? validators.nullable().typeError(patternErrorMessage)
        : validators.nullable().typeError(options.t('Date correct format'));
    }

    if (required)
      validators = nameForErrorMessage
        ? validators.required(
            options.t('This is required field with name', { nameForErrorMessage })
          )
        : validators.required();

    if (pattern)
      validators = patternErrorMessage
        ? validators.matches(new RegExp(pattern), patternErrorMessage)
        : validators.matches(new RegExp(pattern));

    if (max) {
      validators =
        kind === 'inputDate'
          ? validators.min(
              getValidationDate(max),
              options.t('Age should be less than', { year: max })
            )
          : validators.max(max);
    }

    if (min) {
      validators =
        kind === 'inputDate'
          ? validators.max(
              getValidationDate(min),
              options.t('Age should be greater than', { year: min })
            )
          : validators.min(min);
    }

    if (minlength && maxlength) {
      validators = validators.validateLengthBetween(
        minlength,
        maxlength,
        nameForErrorMessage
          ? options.t('Should contain', { nameForErrorMessage, maxlength, minlength })
          : options.t('This field should contain', { maxlength, minlength })
      );
    } else if (minlength) {
      validators = nameForErrorMessage
        ? validators.min(
            minlength,
            options.t('Must be at least', { nameForErrorMessage, min: minlength })
          )
        : validators.min(minlength);
    } else if (maxlength) {
      validators = nameForErrorMessage
        ? validators.max(
            maxlength,
            options.t('Must be at most', { nameForErrorMessage, max: maxlength })
          )
        : validators.max(maxlength);
    }

    if (accept)
      validators = validators.test('fileFormat', options.t('Incorrect file format'), (value) =>
        testFilesType(value, accept)
      );

    if (kind === 'inputCheckbox' && required)
      validators = validators.oneOf(
        [true],
        patternErrorMessage ||
          (nameForErrorMessage
            ? options.t('This is required field with name', { nameForErrorMessage })
            : options.t('This is required field'))
      );

    if (typeErrorMessage) validators = validators.typeError(typeErrorMessage);

    const hardcodedValidation = HARDCODED_FIELDS_VALIDATION[name];
    if (hardcodedValidation) validators = validators[hardcodedValidation](options);

    return {
      ...acc,
      [field.name]: validators
    };
  }, {});
};

export default createValidationSchema;

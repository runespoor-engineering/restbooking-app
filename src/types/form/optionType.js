import { arrayOf, shape, string } from 'prop-types';

export default arrayOf(
  shape({
    label: string,
    value: string
  })
);

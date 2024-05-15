import { arrayOf, shape, string } from 'prop-types';

export default shape({
  description: string,
  title: string,
  meta: arrayOf(
    shape({
      name: string,
      property: string,
      content: string
    })
  )
});

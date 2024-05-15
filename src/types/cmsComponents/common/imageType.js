import { shape, string } from 'prop-types';

export default shape({
  data: shape({
    attributes: shape({
      url: string.isRequired
    }).isRequired
  })
});

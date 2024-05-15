import { shape, string } from 'prop-types';

export default shape({
  id: string.isRequired,
  content: string
});

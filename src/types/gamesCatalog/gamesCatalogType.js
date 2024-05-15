import { arrayOf, bool, shape, string } from 'prop-types';

import seoType from '../seoType';
import categoryType from './categoryType';
import gameType from './gameType';

export default shape({
  defaultCategory: shape({
    id: string,
    slug: string,
    seo: seoType,
    topGames: arrayOf(gameType),
    games: arrayOf(gameType)
  }),
  categories: arrayOf(categoryType),
  withSearch: bool,
  withLoadMore: bool
});

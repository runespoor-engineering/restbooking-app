import { arrayOf, shape, string } from 'prop-types';

import seoType from '../seoType';
import gameType from './gameType';

export default shape({
  id: string,
  category: shape({
    id: string,
    title: string,
    slug: string,
    route: string,
    tileIcon: shape({
      url: string,
      alternativeText: string
    }),
    tileColor: string,
    seo: seoType,
    topGames: arrayOf(gameType),
    games: arrayOf(gameType)
  })
});

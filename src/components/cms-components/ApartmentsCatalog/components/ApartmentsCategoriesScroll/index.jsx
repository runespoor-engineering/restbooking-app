import Box from '@mui/material/Box';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import React from 'react';

import Tile, { tileSettingsType } from '../../../../common/Tile';

const ApartmentsCategoriesScroll = ({
  categories,
  displayCategoryGamesCount,
  getCategoryTileClickHandler,
  activeCategorySlug,
  gamesCategoriesScrollSettings
}) => {
  const { scrollContainerSx, gamesCategoryContainerSx, gameCategoryTileSettings } =
    gamesCategoriesScrollSettings || {};

  return (
    <Box sx={{ width: '100%', overflowX: 'auto', display: 'flex', ...scrollContainerSx }}>
      {categories.map(({ apartmentCategory, id }) => {
        const categoryAttributes = apartmentCategory.data.attributes;
        return (
          <Box
            key={id || apartmentCategory?.data?.id}
            sx={{ p: '0 10px', ...gamesCategoryContainerSx }}
          >
            <Tile
              counter={categoryAttributes.uniqueSortedGames?.data.length}
              displayCounter={displayCategoryGamesCount}
              handleClick={getCategoryTileClickHandler(categoryAttributes.slug)}
              // icon={categoryAttributes.tileIcon}
              icon={{data: {attributes: {url: 'https://dummyimage.com/600x400/000/fff'}}}}
              isActive={activeCategorySlug === categoryAttributes.slug}
              settings={gameCategoryTileSettings}
              title={categoryAttributes.title}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export const gamesCategoriesScrollSettingsType = shape({
  scrollContainerSx: shape(),
  gamesCategoryContainerSx: shape(),
  gameCategoryTileSettings: tileSettingsType
});

ApartmentsCategoriesScroll.propTypes = {
  categories: arrayOf(shape().isRequired).isRequired,
  getCategoryTileClickHandler: func.isRequired,
  activeCategorySlug: string.isRequired,
  displayCategoryGamesCount: bool,
  gamesCategoriesScrollSettings: gamesCategoriesScrollSettingsType
};

ApartmentsCategoriesScroll.defaultProps = {
  displayCategoryGamesCount: false,
  gamesCategoriesScrollSettings: null
};

export default ApartmentsCategoriesScroll;

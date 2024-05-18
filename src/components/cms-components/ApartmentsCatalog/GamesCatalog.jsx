import { Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { UserContext } from '../../../context/UserContext/UserContext';
import useOffsetBasedPagination from '../../../hooks/useOffsetBasedPagination';
import usePagination from '../../../hooks/usePagination';
import useResponsiveValue from '../../../hooks/useResponsiveValue';
import selectSettings from '../../../utils/componentSettings/selectSettings';
import EntitiesCatalog from '../../common/EntitiesCatalog';
import GamePreview from './components/ApartmentPreview/ApartmentPreview';
import ApartmentsCategoriesScroll from './components/ApartmentsCategoriesScroll';
import getValuesFromGamesCatalogSettings from './getValuesFromGamesCatalogSettings';

const findCategoryBySlug = (gameCategories, slug) => {
  return gameCategories.find(({ gameCategory }) => gameCategory?.data.attributes.slug === slug);
};

const GamesCatalog = ({ staticData, globalData, ...props }) => {
  console.log({
    staticData,
    globalData,
    ...props
  });
  const {
    id,
    categories,
    useLoadMore,
    title,
    counter,
    categoriesTypeBreakpoints: {
      xsCategoriesType,
      smCategoriesType,
      mdCategoriesType,
      lgCategoriesType,
      xlCategoriesType
    } = {},
    settings,
    gamePreviewButtonsGridContainerSettings
  } = staticData || {
    title: '',
    useLoadMore: true,
    showMoreButton: null,
    counter: null,
    defaultCategory: { data: null },
    categories: [],
    settings: null,
    globalData: undefined
  };
  const { isLoggedIn } = useContext(UserContext);
  const router = useRouter();
  const { query } = router;

  const gamesCatalogSettings = selectSettings(settings);
  const {
    catalogGridContainerProps,
    catalogNavigationGridItemProps,
    categoriesGridItemProps,
    catalogGamesGridItemProps,
    navigationGridContainerProps,
    titleGridItemProps,
    gamesGridContainerProps,
    gamesGridItemProps,
    showMoreGridItemProps,
    mainGridContainerProps,

    gamesCategoriesPaginatedSettings,
    gamesCategoriesListSettings,
    gamesCategoriesScrollSettings,

    categoriesCountToShowBreakpoints,
    gamesCountToShowBreakpoints,
    gamePreviewAspectRatioKeeper,
    gamePreviewComplexSx,
    counterGridItemProps,
    counterSettings
  } = getValuesFromGamesCatalogSettings(gamesCatalogSettings);

  const GamesCategoriesComponent = ApartmentsCategoriesScroll;

  const [activeCategorySlug, setActiveCategorySlug] = useState(
    categories?.[0]?.apartmentCategory.data?.attributes.slug
  );
  const activeCategory = useMemo(
    () =>
      categories.find(
        ({ apartmentCategory }) => apartmentCategory.data.attributes.slug === activeCategorySlug
      ),
    [activeCategorySlug, categories]
  );
  const { apartments, template_apartment_preview } =
    activeCategory?.apartmentCategory.data?.attributes ||
    categories[0]?.apartmentCategory.data?.attributes ||
    {};

  const gamesCountToShow = useResponsiveValue(gamesCountToShowBreakpoints || {}, 5);

  const paginationConfig = useMemo(
    () => ({
      elementsCount: apartments.data?.length,
      elementsCountPerPage: useLoadMore ? gamesCountToShow : apartments.data?.length,
      defaultPage: 1 // TODO: OR 0
    }),
    [apartments?.length, useLoadMore, gamesCountToShow]
  );

  const {
    currentPage: gamesCurrentPage,
    setNextPage: setNextGamesPage,
    isCurrentPageLast: isCurrentGamesPageLast,
    setPage: setGamesPage,
    lastElementIndex: gamesLastElementIndex,
    elementsLeft: gamesCountLeft
  } = usePagination(
    paginationConfig.elementsCount,
    paginationConfig.elementsCountPerPage,
    paginationConfig.defaultPage
  );

  useEffect(() => setGamesPage(1), [router.asPath, setGamesPage]);

  const gamesToShow = useOffsetBasedPagination(apartments.data, 0, gamesLastElementIndex + 1);

  console.log('gamesToShow', gamesToShow);

  // TODO: Delete it after full migration on game preview templates
  const normalizeEntityAttributes = useCallback(
    (attributes) => {
      const squareThumbnail = attributes.squareThumbnail?.data;
      return {
        title: attributes.title,
        thumbnailData: {
          attributes: {
            url: 'https://dummyimage.com/600x400/000/fff'
          }
        },
        route: attributes.route,
        slug: attributes.slug,
        aspectRatioKeeper: gamePreviewAspectRatioKeeper,
        settings: gamePreviewComplexSx,
        templateAttributes:
          activeCategory?.apartmentCategory.data?.attributes.template_apartment_preview.data
            ?.attributes
      };
    },
    [
      activeCategory?.apartmentCategory.data?.attributes.template_apartment_preview.data
        ?.attributes,
      gamePreviewAspectRatioKeeper,
      gamePreviewComplexSx
    ]
  );

  const EntityComponent = GamePreview;

  const getCategoryTileClickHandler = useCallback(
    (slug) => () => {
      setActiveCategorySlug(slug);
      setGamesPage(1);
    },
    [setGamesPage]
  );

  return (
    <Grid spacing={3} {...catalogGridContainerProps}>
      <Grid {...catalogNavigationGridItemProps}>
        <Grid spacing={2} {...navigationGridContainerProps}>
          {title && (
            <Grid {...titleGridItemProps}>
              <Typography sx={{ color: 'text.primary' }} variant="h4">
                {title}
              </Typography>
            </Grid>
          )}

          <Grid {...categoriesGridItemProps}>
            <GamesCategoriesComponent
              activeCategorySlug={activeCategorySlug}
              categories={categories}
              gamesCategoriesScrollSettings={gamesCategoriesScrollSettings}
              getCategoryTileClickHandler={getCategoryTileClickHandler}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid {...catalogGamesGridItemProps}>
        <EntitiesCatalog
          EntityComponent={EntityComponent}
          counterConfig={counter}
          entities={{ data: gamesToShow }}
          handleButtonClick={setNextGamesPage}
          normalizeEntityAttributes={normalizeEntityAttributes}
          settings={{
            entitiesGridSettings: {
              mainGridItemContainerProps: gamesGridContainerProps,
              entityGridItemProps: gamesGridItemProps,
              entitySettings: gamePreviewComplexSx
            },
            mainGridContainerProps,
            showMoreGridItemProps,
            counterGridItemProps,
            counterSettings
          }}
          shouldRenderButton={!isCurrentGamesPageLast}
        />
      </Grid>
    </Grid>
  );
};

GamesCatalog.defaultProps = {
  title: '',
  useLoadMore: true,
  showMoreButton: null,
  counter: null,
  defaultCategory: { data: null },
  categories: [],
  settings: null,
  globalData: undefined
};

export default GamesCatalog;

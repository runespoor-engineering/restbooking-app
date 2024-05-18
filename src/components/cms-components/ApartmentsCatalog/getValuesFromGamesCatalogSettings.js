import {
  getGridContainerProps,
  getGridItemProps
} from '../../../utils/componentSettings/specialComponentProps';

const getValuesFromGamesCatalogSettings = (gamesCatalogSettings) => {
  const {
    categoriesCountToShowBreakpoints,
    gamesCountToShowBreakpoints,
    subCategoryGamesCountToShowBreakpoints,
    gamePreviewAspectRatioKeeper,
    gamePreviewComplexSx,
    gamePreviewSkeletonSx,
    filteringSelectProps,
    sortingSelectProps,
    searchFieldSx,
    gamesCategoriesPaginatedSettings,
    gamesCategoriesListSettings,
    gamesCategoriesScrollSettings,
    counterGridItemProps,
    counterSettings,
    subCategoryTitleTypographyProps
  } = gamesCatalogSettings;

  const catalogGridContainerProps = getGridContainerProps(
    gamesCatalogSettings?.catalogGridContainerProps
  );
  const catalogNavigationGridItemProps = getGridItemProps(
    gamesCatalogSettings?.catalogNavigationGridItemProps
  );
  const navigationGridContainerProps = getGridContainerProps(
    gamesCatalogSettings?.navigationGridContainerProps
  );
  const searchGridItemProps = getGridItemProps(gamesCatalogSettings?.searchGridItemProps);
  const filteringGridItemProps = getGridItemProps(gamesCatalogSettings?.filteringGridItemProps);
  const sortingGridItemProps = getGridItemProps(gamesCatalogSettings?.sortingGridItemProps);
  const titleGridItemProps = getGridItemProps(gamesCatalogSettings?.titleGridItemProps);
  const subCategoryTitleGridItemProps = getGridItemProps(
    gamesCatalogSettings?.subCategoryTitleGridItemProps
  );
  const categoriesGridItemProps = getGridItemProps(gamesCatalogSettings?.categoriesGridItemProps);
  const catalogGamesGridItemProps = getGridItemProps(
    gamesCatalogSettings?.catalogGamesGridItemProps
  );
  const gamesGridContainerProps = getGridContainerProps(
    gamesCatalogSettings?.gamesGridContainerProps
  );
  const gamesGridItemProps = getGridItemProps(gamesCatalogSettings?.gamesGridItemProps);
  const showMoreGridItemProps = getGridItemProps(gamesCatalogSettings?.showMoreGridItemProps);
  const mainGridContainerProps = getGridItemProps(gamesCatalogSettings?.mainGridContainerProps);
  const subCategoriesGridContainerProps = getGridContainerProps(
    gamesCatalogSettings?.subCategoriesGridContainerProps
  );

  return {
    catalogGridContainerProps,
    catalogNavigationGridItemProps,
    categoriesGridItemProps,
    catalogGamesGridItemProps,
    navigationGridContainerProps,
    sortingGridItemProps,
    filteringGridItemProps,
    searchGridItemProps,
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
    subCategoryGamesCountToShowBreakpoints,
    gamePreviewAspectRatioKeeper,
    gamePreviewComplexSx,
    gamePreviewSkeletonSx,
    filteringSelectProps,
    sortingSelectProps,
    searchFieldSx,
    counterGridItemProps,
    counterSettings,
    subCategoriesGridContainerProps,
    subCategoryTitleGridItemProps,
    subCategoryTitleTypographyProps
  };
};

export default getValuesFromGamesCatalogSettings;

// Read more:
// https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
// https://nextjs.org/docs/basic-features/data-fetching#the-paths-key-required

/**
 * Normalize the array of slugs for Game entities.
 * @param {Array<Object>} gamesSlugs - The array of Game entities with slugs.
 * @param {String} gamesSlugs.attributes.library_game.data.attributes.slug - The required slug
 * @return {Array<String>} - The normalized and filtered array of slugs.
 */
export const normalizeGamesSlugs = (gamesSlugs) =>
  gamesSlugs.map((gameSlug) => gameSlug.attributes.slug).filter(Boolean);

/**
 * Normalize the array of slugs for Lobby entities.
 * @param {Array<Object>} lobbiesSlugs - The array of Lobby entities with slugs.
 * @param {String} lobbiesSlugs.attributes.library_lobby.data.attributes.slug - The required slug
 * @return {Array<String>} - The normalized and filtered array of slugs.
 */
export const normalizeLobbiesSlugs = (lobbiesSlugs) =>
  lobbiesSlugs
    .map((lobbySlug) => lobbySlug.attributes.library_lobby?.data?.attributes?.slug)
    .filter(Boolean);

/**
 * Normalize the array of slugs for Promotion entities.
 * @param {Array<Object>} promotionsSlugs - The array of Promotion entities with slugs.
 * @param {String} promotionsSlugs.attributes.slug - The required slug
 * @return {Array<String>} - The normalized and filtered array of slugs.
 */
export const normalizePromotionsSlugs = (promotionsSlugs) =>
  promotionsSlugs.map((promotionSlug) => promotionSlug.attributes?.slug).filter(Boolean);

/**
 * Normalize the array of slugs for Game Category entities.
 * @param {Array<Object>} gameCategoriesSlugs - The array of Game Category entities with slugs.
 * @param {String} gameCategoriesSlugs.attributes.slug - The required slug
 * @return {Array<String>} - The normalized and filtered array of slugs.
 */
export const normalizeGameCategoriesSlugs = (gameCategoriesSlugs) =>
  gameCategoriesSlugs.map((gameCategorySlug) => gameCategorySlug.attributes?.slug).filter(Boolean);

/**
 * Normalize the array of slugs for Page entities.
 * @param {Array<Object>} pagesSlugs - The array of Page entities with slugs.
 * @param {String} pagesSlugs.attributes.slug - The required slug
 * @return {Array<String>} - The normalized and filtered array of slugs.
 */
export const normalizePagesSlugs = (pagesSlugs) =>
  pagesSlugs.map((pageSlug) => pageSlug.attributes?.slug).filter(Boolean);

/**
 * Normalize the array of slugs for Page Articles entities.
 * @param {Array<Object>} pageArticles - The array of Page Articles entities with slugs.
 * @param {String} pageArticles.attributes.slug - The required slug
 * @return {Array<String>} - The normalized and filtered array of slugs.
 */
export const normalizePageArticlesSlugs = (pageArticles) =>
  pageArticles
    .map((pageArticleAttributes) => pageArticleAttributes.attributes?.slug)
    .filter(Boolean);

/**
 * Normalize the array of slugs for Page Article Categories entities.
 * @param {Array<Object>} pageArticleCategories - The array of Page Article Categories entities with slugs.
 * @param {String} pageArticleCategories.attributes.slug - The required slug
 * @return {Array<String>} - The normalized and filtered array of slugs.
 */
export const normalizePageArticleCategoriesSlugs = (pageArticleCategories) =>
  pageArticleCategories
    .map((pageArticleCategoryAttributes) => pageArticleCategoryAttributes.attributes?.slug)
    .filter(Boolean);

/**
 * Normalize the array of slugs for Page Article Authors entities.
 * @param {Array<Object>} pageArticleAuthors - The array of Page Article Authors entities with slugs.
 * @param {String} pageArticleAuthors.attributes.slug - The required slug
 * @return {Array<String>} - The normalized and filtered array of slugs.
 */
export const normalizePageArticleAuthorsSlugs = (pageArticleAuthors) =>
  pageArticleAuthors
    .map((pageArticleAuthorAttributes) => pageArticleAuthorAttributes.attributes?.slug)
    .filter(Boolean);

/**
 * Generate the array of localized static paths for provided slug.
 * @param {String} slug - Slug that should be used for path generating.
 * @param {Array<String>} locales - The array of locales that should be used for path generating.
 * @return {Array<Object>} - the array of localized static paths in the next format [{ params: { slug: Array }, locale: String }].
 */
export const generateLocalizedPaths = (slug, locales) => {
  const slugArray = slug.toString().split('/');
  const localizedPaths = locales.map((locale) => {
    return {
      params: { slug: slugArray },
      locale
    };
  });
  return localizedPaths;
};

/**
 * Filter directSlugs and use only dynamic ones. Generate the array of static paths for provided slugs and locales.
 * @param {Array<String>} normalizedSlugs - The array of slugs.
 * @param {Array<String>} directSlugs - The array of slugs which should not be used for generating static paths.
 * @param {Array<String>} locales - The array of locales.
 * @return {Object} - Static paths object in the next format { paths: [{ params: { slug: Array }, locale: String }], fallback: false }.
 */
export const generateStaticPaths = ({ normalizedSlugs, directSlugs, locales }) => {
  const dynamicSlugs = normalizedSlugs.filter((slug) => !directSlugs.includes(slug));
  const paths = dynamicSlugs.reduce((acc, staticPageSlug) => {
    const localizedPaths = generateLocalizedPaths(staticPageSlug, locales);
    return [...acc, ...localizedPaths];
  }, []);

  return { paths, fallback: true };
};

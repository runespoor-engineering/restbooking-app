import omit from 'lodash/omit';
/**
 * Merge and push to URL query string an existing query parameters with the provided one for any page type.
 * @param {Object} router - Router instance.
 * @param {Object} queryToBePushed - Object that contains query parameters properties which should be merged.
 */
const pushQueryParameters = (router, queryToBePushed) => {
  const { asPath, query } = router;
  const queryWithoutSlug = omit(query, ['slug']);
  router.push({
    pathname: asPath.split('?')[0],
    query: {
      ...queryWithoutSlug,
      ...queryToBePushed
    }
  });
};

export default pushQueryParameters;

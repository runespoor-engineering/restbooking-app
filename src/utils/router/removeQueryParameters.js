import omit from 'lodash/omit';

/**
 * Delete the provided query parameters from URL query string for any page type.
 * @param {Object} router - Router instance.
 * @param {Array} queryToBeRemoved - Array that contains query parameter names which should be removed.
 * @param {Boolean | null} shouldSaveBrowserHistory=true - Boolean to control whether to use push or replace method.
 */
const removeQueryParameters = (router, queryToBeRemoved, shouldSaveBrowserHistory = true) => {
  const { asPath, query } = router;
  const remainingQueryParameters = omit(query, ['slug', ...queryToBeRemoved]);
  const urlObject = {
    pathname: asPath.split('?')[0],
    query: {
      ...remainingQueryParameters
    }
  };

  if (shouldSaveBrowserHistory || shouldSaveBrowserHistory === null) {
    router.push(urlObject, undefined, { shallow: queryToBeRemoved.includes('modal') });
  } else {
    router.replace(urlObject, undefined, { shallow: queryToBeRemoved.includes('modal') });
  }
};

export default removeQueryParameters;

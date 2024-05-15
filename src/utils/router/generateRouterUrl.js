const generateUrlSearchParams = (path, link, searchParam) => {
  const urlSearchParams = new URLSearchParams(path);
  const asPathHasModalParam = path.includes(searchParam);
  const linkModalParam = new URLSearchParams(link).get(searchParam);
  if (!asPathHasModalParam) {
    urlSearchParams.set(searchParam, linkModalParam);
  } else {
    [...urlSearchParams.keys()].reverse().forEach((key) => {
      if (key.includes(searchParam)) {
        urlSearchParams.set(key, linkModalParam);
      }
    });
  }
  return decodeURIComponent(urlSearchParams);
};

const generateRouterUrl = (link, asPath) => {
  const isLinkStartsWithQuestionMark = link && link.startsWith('?');
  const queryStringRegex = new RegExp(`[?&]${link}\\b`);
  const hasAsPathLink = queryStringRegex.test(asPath);
  const hasAsPathQuery = asPath?.indexOf('?') !== -1;

  switch (true) {
    case asPath?.includes('modal=') && link?.includes('modal='):
      return generateUrlSearchParams(asPath, link, 'modal');
    case asPath?.includes('modal-promo=') && link?.includes('modal-promo='):
      return generateUrlSearchParams(asPath, link, 'modal-promo');
    case hasAsPathLink:
      return asPath;
    case isLinkStartsWithQuestionMark && hasAsPathQuery:
      return `${asPath}&${link.slice(1)}`;
    case isLinkStartsWithQuestionMark && !hasAsPathQuery:
      return `${asPath}${link}`;
    default:
      return link;
  }
};

export default generateRouterUrl;

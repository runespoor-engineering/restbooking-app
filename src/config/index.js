const ROUTES = {
  HOME: '/',
  CATEGORY_TEMPLATE_PAGE: 'category-template-page',
  GAME_TEMPLATE_PAGE: 'game-template-page',
  GAMES: 'games',
  GAME: 'game',
  LOBBY: 'lobby',
  PROMOTION: 'promotion',
  PROMOTIONS: 'promotions',
  ARTICLES: 'blog',
  ARTICLE_CATEGORIES: 'blog/categories',
  ARTICLE_AUTHORS: 'blog/authors',

  FORGOT_PASSWORD: 'forgot-password',
  PAYMENTS: 'payments',
  MY_ACCOUNT: 'my-account',
  SIGN_IN: {
    pathname: '/',
    query: {
      modal: 'sign-in'
    }
  },
  SIGN_UP: {
    pathname: '/',
    query: {
      modal: 'sign-up'
    }
  }
};

const config = {
  identifier: process.env.NEXT_PUBLIC_IDENTIFIER,
  directPageSlugs: [
    // ROUTES.FORGOT_PASSWORD,
    ROUTES.GAME_TEMPLATE_PAGE,
    // ROUTES.PAYMENTS,
    ROUTES.MY_ACCOUNT
  ],
  CONSTANTS: ROUTES,
  logoDimensions: {
    smallWidth: 19,
    smallHeight: 26,
    largeWidth: 97,
    largeHeight: 26
  }
};

export default config;

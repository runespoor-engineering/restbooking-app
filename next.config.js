const { i18n } = require('./next-i18next.config');

console.log(
  '[Config] getCommonNextConfig, NODE_ENV: ',
  process.env.NODE_ENV,

  '; CMS_URL: ',
  process.env.CMS_URL,

  '; CMS_S3_URL: ',
  process.env.CMS_S3_URL,

  '; API_GATEWAY_URL: ',
  process.env.API_GATEWAY_URL,

  '; NEXT_PUBLIC_WEBSITE_WEB_API_URL: ',
  process.env.NEXT_PUBLIC_WEBSITE_WEB_API_URL
);

console.log('NEXT_PUBLIC_IDENTIFIER', process.env.NEXT_PUBLIC_IDENTIFIER);

// TODO add NL Before RD launch PT-2015
module.exports = {
  // This disables standalone build mode by default, so that rush build works as before.
  // Otherwise, with standalone mode, it fails on creating Rush build cache as it doesn't allow symlinks.
  // See rush-project.json and description of outputFolderNames option...
  // But in order to use this feature for deployment - we need to set this env var to true in CI and use pnpm directly.
  // See infrastructure/gitlab/configuration/common-deployment/.gitlab-ci.yml
  eslint: {
    ignoreDuringBuilds: true
  },
  i18n,
  /*
    Most probably any ES-module (or 3rd party lib not compiled and used as raw ES module) residing outside
    your Next.js app which you try to use, need to be added here so that this plugin transpiles it:
    https://github.com/martpie/next-transpile-modules#i-have-trouble-with-duplicated-dependencies-or-the-invalid-hook-call-error-in-react
  */
  webpack: (config, { webpack }) => {
    /*
      This allows to ignore the warning and allow rush incremental build:
      ../../common/temp/node_modules/.pnpm/i18next-fs-backend@1.1.1/node_modules/i18next-fs-backend/cjs/readFile.js
      Critical dependency: the request of a dependency is an expression

      See: https://webpack.js.org/plugins/context-replacement-plugin/#content-callback
      See: https://github.com/webpack/webpack/issues/196#issuecomment-682527214

      Alternative is to ignore this warning for all modules:
      config.module.exprContextCritical = false; See https://webpack.js.org/configuration/module/
     */
    config.plugins.push(
      new webpack.ContextReplacementPlugin(/^\.$/, (context) => {
        // Ensure we're only doing this for modules we know they produce warnings we wish to ignore
        if (/\/node_modules\/\.pnpm\/i18next-fs-backend/.test(context.context)) {
          context.dependencies.forEach((dependency) => {
            // eslint-disable-next-line no-param-reassign
            if (dependency.critical) dependency.critical = false; // Silence the warning
          });
        }
      })
    );

    return config;
  },
  images: {
    domains: ['localhost', 'dummyimage.com']
  },
  compress: process.env.NODE_ENV === 'development' // Next.js can't handle heavy HTML without compression in dev
};

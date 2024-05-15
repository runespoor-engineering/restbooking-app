import 'swiper/css/bundle';

import { ApolloProvider, useReactiveVar } from '@apollo/client';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useRouter } from 'next/router';
import { appWithTranslation } from 'next-i18next';
import { DefaultSeo } from 'next-seo';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo } from 'react';

import { ActionButtonClickHandlersProvider } from '../components/cms-components/ActionButton/context/ActionButtonClickHandlersContext';
// import DynamicComponentsModal from '../common/DynamicComponentsModal/DynamicComponentsModal';
import config from '../config';
import localeMap from '../config/datepickerLocalization';
import { CmsStaticDataContext } from '../context/CmsStaticDataContext';
import ConfigContext from '../context/ConfigContext';
import { ThemeProvider } from '../context/ThemeContext';
import UserProvider from '../context/UserContext/UserContext';
import { isLoggedInVar } from '../utils/apollo/cache';
import initializeApollo from '../utils/apollo/initializeApolloClient';
import createEmotionCache from '../utils/emotion/createEmotionCache';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const RootAppComponent = ({ Component, pageProps, emotionCache = clientSideEmotionCache }) => {
  const apolloClient = initializeApollo();

  console.log('======= pageProps =======', Component, pageProps, emotionCache);

  const router = useRouter();
  const { globalUiConfigs = {} } = pageProps;

  const [globalUiConfig = {}] = globalUiConfigs.data || [];

  const configContextValue = useMemo(() => config, []);

  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const setIsLoggedIn = useCallback((isLoggedInState) => {
    isLoggedInVar(isLoggedInState);
  }, []);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  // Prevent Next bug when it tries to render the [[...slug]] route
  if (router.asPath === '/[[...slug]]') {
    return null;
  }

  return (
    <CacheProvider value={emotionCache}>
      <ApolloProvider client={apolloClient}>
        <CmsStaticDataContext.Provider value={pageProps}>
          {/* <TemplateGamePreviewsContextProvider> */}
          <ThemeProvider globalUiConfig={globalUiConfig}>
            <CssBaseline />

            <ConfigContext.Provider value={configContextValue}>
              <UserProvider isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
                <ActionButtonClickHandlersProvider>
                  <LocalizationProvider
                    adapterLocale={localeMap[router.locale]}
                    dateAdapter={AdapterDateFns}
                  >
                    {/* <DynamicComponentsModal /> */}
                    <DefaultSeo />
                    <Component {...pageProps} />
                  </LocalizationProvider>
                </ActionButtonClickHandlersProvider>
              </UserProvider>
            </ConfigContext.Provider>
          </ThemeProvider>
          {/* </TemplateGamePreviewsContextProvider> */}
        </CmsStaticDataContext.Provider>
      </ApolloProvider>
    </CacheProvider>
  );
};

RootAppComponent.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape().isRequired,
  localeMap: PropTypes.shape().isRequired,
  config: PropTypes.shape().isRequired,
  emotionCache: PropTypes.shape()
};

RootAppComponent.defaultProps = {
  emotionCache: clientSideEmotionCache
};

const RootApp = (props) => <RootAppComponent {...{ ...props, localeMap, config }} />;

export default appWithTranslation(RootApp);

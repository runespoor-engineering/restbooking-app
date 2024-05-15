import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { createContext, useMemo, useState } from 'react';

import { globalUiConfigType } from '../types';
import { SSR_MODE } from '../constants/common';

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
};

const defaultMuiTheme = {
  palette: {
    tertiary: {
      main: '#EBA338',
      light: '#EBBB3D',
      dark: '#EB8B34'
    }
  }
};

const getDefaultThemeName = (isDoubleTheming, themeConfig) => {
  if (isDoubleTheming) return (!SSR_MODE && localStorage.getItem('theme')) || THEMES.LIGHT;

  const { useCustomTheme, customDarkTheme, customLightTheme, defaultLightTheme, defaultDarkTheme } =
    themeConfig || {};

  if (useCustomTheme) {
    return (
      [
        { themeValue: customDarkTheme, themeName: THEMES.DARK },
        { themeValue: customLightTheme, themeName: THEMES.LIGHT }
      ].find((themeInfo) => !!themeInfo.themeValue)?.themeName || null
    );
  }
  return (
    [
      { themeValue: defaultDarkTheme, themeName: THEMES.DARK },
      { themeValue: defaultLightTheme, themeName: THEMES.LIGHT }
    ].find((themeInfo) => !!themeInfo.themeValue)?.themeName || null
  );
};

const selectTheme = (themeName, darkTheme, lightTheme) => {
  switch (themeName) {
    case THEMES.DARK:
      return darkTheme;
    case THEMES.LIGHT:
      return lightTheme;
    default:
      return defaultMuiTheme;
  }
};

export const getSwitchedThemeName = (currentThemeName) => {
  switch (currentThemeName) {
    case THEMES.LIGHT:
      return THEMES.DARK;
    case THEMES.DARK:
      return THEMES.LIGHT;
    default:
      throw new Error(`Expected values: ${THEMES.LIGHT} || ${THEMES.DARK}`);
  }
};

export const ThemeContext = createContext(null);

const ThemeProviderCmp = ({ children, globalUiConfig }) => {
  const { theme: themeConfig } = globalUiConfig.attributes || {};
  const { useCustomTheme, customDarkTheme, customLightTheme, defaultLightTheme, defaultDarkTheme } =
    themeConfig || {};
  const isDoubleTheming = useMemo(
    () =>
      !!(useCustomTheme
        ? customDarkTheme && customLightTheme
        : defaultLightTheme && defaultDarkTheme),
    [customDarkTheme, customLightTheme, defaultDarkTheme, defaultLightTheme, useCustomTheme]
  );
  const [currentTheme, setTheme] = useState(getDefaultThemeName(isDoubleTheming, themeConfig));

  const customTheme = selectTheme(currentTheme, customDarkTheme, customLightTheme);
  const defaultTheme = selectTheme(currentTheme, defaultDarkTheme, defaultLightTheme);

  const theme = useCustomTheme ? customTheme : defaultTheme;
  const themeContextValue = useMemo(
    () => ({
      isDoubleTheming,
      currentTheme,
      setTheme
    }),
    [currentTheme, isDoubleTheming]
  );

  const muiTheme = useMemo(() => createTheme(theme || defaultMuiTheme), [theme]);

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
      </StyledEngineProvider>
    </ThemeContext.Provider>
  );
};

ThemeProviderCmp.propTypes = {
  children: PropTypes.node,
  globalUiConfig: globalUiConfigType.isRequired
};

ThemeProviderCmp.defaultProps = {
  children: undefined
};

export { ThemeProviderCmp as ThemeProvider };

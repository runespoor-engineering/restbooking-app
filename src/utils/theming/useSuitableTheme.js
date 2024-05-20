import { useContext } from 'react';

import { THEMES } from './constants';
import { ThemeContext } from '../../context/ThemeContext';

const useSuitableTheme = (darkTheme, lightTheme) => {
  const { currentTheme } = useContext(ThemeContext);
  return currentTheme === THEMES.DARK ? darkTheme : lightTheme;
};

export default useSuitableTheme;

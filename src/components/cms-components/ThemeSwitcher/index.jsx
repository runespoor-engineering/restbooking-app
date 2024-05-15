import Brightness3OutlinedIcon from '@mui/icons-material/Brightness3Outlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useContext } from 'react';

import { getSwitchedThemeName, ThemeContext, THEMES } from '../../../context/ThemeContext';

const Container = styled('label', {
  shouldForwardProp: (prop) => prop !== 'isActive'
})(({ theme, isActive }) => {
  const { divider, primary } = theme.palette;
  return {
    display: 'flex',
    alignItems: 'center',
    width: '104px',
    height: '56px',
    borderRadius: '10px',
    padding: '2px',
    position: 'relative',
    border: `2px solid ${divider}`,
    cursor: 'pointer',
    boxSizing: 'border-box',
    justifyContent: 'space-between',
    zIndex: '1',
    '&:before': {
      position: 'absolute',
      top: '2px',
      left: '2px',
      content: '""',
      display: 'block',
      background: primary.main,
      width: '48px',
      height: '48px',
      borderRadius: '7px',
      zIndex: '-1',
      transform: isActive ? 'translate(100%, 0)' : 'translate(0, 0)',
      transition: 'transform .25s ease'
    }
  };
});

const IconContainer = styled('div')(() => ({
  width: '48px',
  height: '48px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));

const SWITCHER_IDENTIFIER = 'theme-switcher';

export const ThemeSwitcherCmsName = 'ComponentPageComponentsThemeSwitcher';
export const ThemeSwitcher = () => {
  const { currentTheme, setTheme } = useContext(ThemeContext);
  const { isDoubleTheming } = useContext(ThemeContext);

  const handleThemeSwitch = () => {
    if (!currentTheme) {
      setTheme(THEMES.LIGHT);
      return;
    }

    const newTheme = getSwitchedThemeName(currentTheme);
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  if (!isDoubleTheming) return null;
  return (
    <Container
      data-testid="theme-switcher"
      htmlFor={SWITCHER_IDENTIFIER}
      isActive={currentTheme === THEMES.LIGHT}
    >
      <IconContainer>
        <Brightness3OutlinedIcon
          sx={{
            color: currentTheme === THEMES.DARK ? 'common.white' : 'primary.main',
            transition: 'fill .25s ease'
          }}
        />
      </IconContainer>
      <IconContainer>
        <WbSunnyOutlinedIcon
          sx={{
            color: currentTheme === THEMES.LIGHT ? 'common.white' : 'primary.main',
            transition: 'fill .25s ease'
          }}
        />
      </IconContainer>
      <Box
        checked={currentTheme === THEMES.DARK}
        component="input"
        id={SWITCHER_IDENTIFIER}
        sx={{
          display: 'none'
        }}
        type="checkbox"
        onChange={handleThemeSwitch}
      />
    </Container>
  );
};

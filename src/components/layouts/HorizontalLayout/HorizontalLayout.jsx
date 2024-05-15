import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';

import { SIDEBAR_TYPE } from '../../../constants/cms';
import useBodyScrollPreventing from '../../../hooks/useBodyScrollPreventing';
import { ActionButtonClickHandlersContext } from '../../cms-components/ActionButton/context/ActionButtonClickHandlersContext';
import Footer from '../blocks/Footer/Footer';
import Header from '../blocks/Header/Header';
import { Sidebar } from '../blocks/Sidebar';

const HorizontalLayout = ({ copyright, children }) => {
  console.log('HorizontalLayout');
  const router = useRouter();
  const { setHandleOpenSidebar, setHandleCloseSidebar } = useContext(
    ActionButtonClickHandlersContext
  );
  const [isMenuOpened, setIsMenuOpen] = useState(false);
  const smUp = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  useBodyScrollPreventing(!smUp && isMenuOpened);

  const handleMenuClick = () => {
    setIsMenuOpen((prevIsMenuOpened) => !prevIsMenuOpened);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [router.asPath]);

  useEffect(() => {
    setHandleOpenSidebar(() => handleMenuClick);
    setHandleCloseSidebar(() => handleMenuClose);
  }, [setHandleOpenSidebar, setHandleCloseSidebar]);

  if (!children) {
    return null;
  }

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        display: 'flex',
        position: 'relative',
        minHeight: '100vh'
      }}
    >
      <Sidebar
        handleMenuClose={handleMenuClose}
        isMenuOpened={isMenuOpened}
        type={SIDEBAR_TYPE.overlay}
      />
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box
          sx={{
            transition: '0.3s ease-in-out'
          }}
        >
          <Header />
        </Box>
        <Box
          component="main"
          sx={{
            height: '100%',
            padding: '16px 16px 0 16px',
            overflow: 'hidden',
            transition: '0.3s ease-in-out',
            p: {
              sm: '16px 24px 0 24px'
            }
          }}
        >
          {children}
        </Box>
        <Footer copyright={copyright} />
      </Box>
    </Box>
  );
};

HorizontalLayout.propTypes = {
  copyright: PropTypes.string,
  settings: PropTypes.shape(),
  children: PropTypes.node
};

HorizontalLayout.defaultProps = {
  settings: undefined,
  copyright: undefined,
  children: undefined
};

export default HorizontalLayout;

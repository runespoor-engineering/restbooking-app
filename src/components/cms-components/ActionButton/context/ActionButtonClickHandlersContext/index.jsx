// eslint-disable-next-line import/prefer-default-export
import PropTypes from 'prop-types';
import { createContext, useMemo, useState } from 'react';

import { BUTTON_ACTIONS } from '../../../../../constants/cms';
import {
  useLogoutClickHandler,
  useOpenLinkHandlerGetter,
  useReplaceLinkHandlerGetter
} from '../../hooks';

export const ActionButtonClickHandlersContext = createContext(null);
ActionButtonClickHandlersContext.displayName = 'ActionButtonClickHandlersContext';

export const ActionButtonClickHandlersProvider = ({ children }) => {
  const [handleOpenSidebar, setHandleOpenSidebar] = useState(() => {});
  const [handleCloseSidebar, setHandleCloseSidebar] = useState(() => {});
  const handleLogoutClick = useLogoutClickHandler();
  const getOpenLinkHandler = useOpenLinkHandlerGetter();
  const getReplaceLinkHandler = useReplaceLinkHandlerGetter();

  const contextValue = useMemo(
    () => ({
      buttonClickHandlers: {
        [BUTTON_ACTIONS.logout]: handleLogoutClick,
        [BUTTON_ACTIONS.openSidebar]: handleOpenSidebar,
        [BUTTON_ACTIONS.closeSidebar]: handleCloseSidebar,
        [BUTTON_ACTIONS.openLink]: getOpenLinkHandler,
        [BUTTON_ACTIONS.replaceLink]: getReplaceLinkHandler
      },
      setHandleOpenSidebar,
      setHandleCloseSidebar
    }),
    [
      handleLogoutClick,
      handleOpenSidebar,
      handleCloseSidebar,
      getOpenLinkHandler,
      getReplaceLinkHandler
    ]
  );
  return (
    <ActionButtonClickHandlersContext.Provider value={contextValue}>
      {children}
    </ActionButtonClickHandlersContext.Provider>
  );
};

ActionButtonClickHandlersProvider.propTypes = {
  children: PropTypes.node
};

ActionButtonClickHandlersProvider.defaultProps = {
  children: undefined
};

import { arrayOf, bool, shape, string } from 'prop-types';

import { DIRECTIONS } from '../../../constants/muiConstants';
import ActionButtonClickHandlerArgumentsContext from '../../cms-components/ActionButton/context/ActionButtonClickHandlerArgumentsContext';
import ActionButtonContext from '../../cms-components/ActionButton/context/ActionButtonContext';
import CmsComponentsGrid from '../../cms-components/СmsComponentsGrid/CmsComponentsGrid';
import GAME_PREVIEW_UI_COMPONENT_CMS_NAME_TO_COMPONENT_MAP from '../../cms-components/СmsComponentsGrid/cmsComponentsMaps/gameUiComponentCmsNameToComponentMap';

const GamePreviewDynamicZone = ({
  actionButtonContextValue,
  buttonClickHandlerArgumentsContextValue,
  cmsComponents,
  gridContainerSettings
}) => {
  if (!cmsComponents) return null;
  return (
    <ActionButtonContext.Provider value={actionButtonContextValue}>
      <ActionButtonClickHandlerArgumentsContext.Provider
        value={buttonClickHandlerArgumentsContextValue}
      >
        <CmsComponentsGrid
          cmsComponents={cmsComponents}
          cmsComponentsMap={GAME_PREVIEW_UI_COMPONENT_CMS_NAME_TO_COMPONENT_MAP}
          direction={DIRECTIONS.row}
          gridContainerSettings={gridContainerSettings}
        />
      </ActionButtonClickHandlerArgumentsContext.Provider>
    </ActionButtonContext.Provider>
  );
};

GamePreviewDynamicZone.propTypes = {
  actionButtonContextValue: shape({
    isDemoModeSupported: bool
  }),
  buttonClickHandlerArgumentsContextValue: shape({
    gameActionClickHandlerArguments: {
      gameRoute: string,
      gameSlug: string,
      gamesCatalogStateToSave: shape(),
      gameProvider: shape,
      isFavorite: bool
    }
  }),
  cmsComponents: arrayOf(shape()),
  gridContainerSettings: shape()
};

GamePreviewDynamicZone.defaultProps = {
  actionButtonContextValue: {
    isDemoModeSupported: false
  },
  buttonClickHandlerArgumentsContextValue: {
    gameRoute: '',
    gameSlug: '',
    gamesCatalogStateToSave: null,
    gameProvider: null,
    isFavorite: false
  },
  cmsComponents: null,
  gridContainerSettings: null
};

export default GamePreviewDynamicZone;

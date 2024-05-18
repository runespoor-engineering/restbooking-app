import { ActionButton } from '../../ActionButton';
import {
  GameTitlePlaceholderCmsComponent,
  GameTitlePlaceholderCmsName
} from '../../GameTitlePlaceholder/GameTitlePlaceholder';

export const GameAnonymousActionButtonCmsName = 'ComponentButtonsApartmentAnonymousActionButton';
export const GameAuthenticatedActionButtonCmsName =
  'ComponentButtonsApartmentAuthenticatedActionButton';

const GAME_PREVIEW_UI_COMPONENT_CMS_NAME_TO_COMPONENT_MAP = {
  [GameAnonymousActionButtonCmsName]: ActionButton,
  [GameAuthenticatedActionButtonCmsName]: ActionButton,
  [GameTitlePlaceholderCmsName]: GameTitlePlaceholderCmsComponent
};

export default GAME_PREVIEW_UI_COMPONENT_CMS_NAME_TO_COMPONENT_MAP;

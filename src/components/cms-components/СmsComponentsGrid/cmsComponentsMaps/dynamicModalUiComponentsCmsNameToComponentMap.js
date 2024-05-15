import {
  ActionButton,
  PromotionModalAnonymousActionButtonCmsName,
  PromotionModalAuthenticatedActionButtonCmsName
} from '../../ActionButton';
import GLOBAL_CMS_NAME_TO_COMPONENT_MAP from './globalCmsNameToComponentMap';

const DYNAMIC_MODAL_UI_COMPONENTS_CMS_NAME_TO_COMPONENT_MAP = {
  ...GLOBAL_CMS_NAME_TO_COMPONENT_MAP,
  [PromotionModalAnonymousActionButtonCmsName]: ActionButton,
  [PromotionModalAuthenticatedActionButtonCmsName]: ActionButton
};

export default DYNAMIC_MODAL_UI_COMPONENTS_CMS_NAME_TO_COMPONENT_MAP;

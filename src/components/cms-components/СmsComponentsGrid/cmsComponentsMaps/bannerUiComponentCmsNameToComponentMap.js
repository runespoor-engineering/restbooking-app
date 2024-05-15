import {
  ActionButton,
  BannerAnonymousActionButtonCmsName,
  BannerAuthenticatedActionButtonCmsName
} from '../../ActionButton';

const BANNER_UI_COMPONENT_CMS_NAME_TO_COMPONENT_MAP = {
  [BannerAnonymousActionButtonCmsName]: ActionButton,
  [BannerAuthenticatedActionButtonCmsName]: ActionButton
};

export default BANNER_UI_COMPONENT_CMS_NAME_TO_COMPONENT_MAP;

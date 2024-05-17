import PlayerAccountContentNavigation, {
  PlayerAccountContentNavigationCmsName
} from '../../../layouts/blocks/Navigation/PlayerAccountContentNavigation';
import {
  ActionButton,
  GlobalAnonymousActionButtonCmsName,
  GlobalAuthenticatedActionButtonCmsName,
  GlobalGenericActionButtonCmsName
} from '../../ActionButton';
import { AuxiliaryNavigation, AuxiliaryNavigationCmsName } from '../../AuxiliaryNavigation';
import { BannersSlider, componentCmsName as BannersSliderCmsName } from '../../BannersSlider';
import { componentCmsName as FaqCatalogCmsName, FaqCatalog } from '../../faq/FaqCatalog';
import { FaqCatalogManualCmsComponent, FaqCatalogManualCmsName } from '../../faq/FaqCatalogManual';
import { componentCmsName as FormCmsName, Form } from '../../Form';
import { IframeCmsComponent, IframeCmsName } from '../../Iframe';
import { LanguageSwitcher, LanguageSwitcherCmsName } from '../../LanguageSwitcher';
import { Logo, LogoCmsName } from '../../Logo';
import {
  PlayerAccountMenuButton,
  PlayerAccountMenuButtonCmsName
} from '../../PlayerAccountMenuButton';
import { PrimaryNavigation, PrimaryNavigationCmsName } from '../../PrimaryNavigation';
import { componentCmsName as RichTextCmsName, RichText } from '../../RichText';
import { SecondaryNavigation, SecondaryNavigationCmsName } from '../../SecondaryNavigation';
import { ThemeSwitcher, ThemeSwitcherCmsName } from '../../ThemeSwitcher';

const GLOBAL_CMS_NAME_TO_COMPONENT_MAP = {
  [RichTextCmsName]: RichText,
  [FormCmsName]: Form,
  [BannersSliderCmsName]: BannersSlider,
  [FaqCatalogCmsName]: FaqCatalog,
  [IframeCmsName]: IframeCmsComponent,
  [LogoCmsName]: Logo,
  [PlayerAccountMenuButtonCmsName]: PlayerAccountMenuButton,
  [ThemeSwitcherCmsName]: ThemeSwitcher,
  [LanguageSwitcherCmsName]: LanguageSwitcher,
  [PrimaryNavigationCmsName]: PrimaryNavigation,
  [SecondaryNavigationCmsName]: SecondaryNavigation,
  [PlayerAccountContentNavigationCmsName]: PlayerAccountContentNavigation,
  [GlobalGenericActionButtonCmsName]: ActionButton,
  [GlobalAnonymousActionButtonCmsName]: ActionButton,
  [GlobalAuthenticatedActionButtonCmsName]: ActionButton,
  [FaqCatalogManualCmsName]: FaqCatalogManualCmsComponent,
  [AuxiliaryNavigationCmsName]: AuxiliaryNavigation,
};

export default GLOBAL_CMS_NAME_TO_COMPONENT_MAP;

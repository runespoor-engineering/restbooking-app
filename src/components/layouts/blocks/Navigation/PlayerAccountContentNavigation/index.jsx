import { shape } from 'prop-types';

import { NAVIGATION_TYPES } from '../../../../../constants/cms';
import useActiveNavigation from '../../../../../hooks/useActiveNavigation';
import useNavigation from '../../../../../hooks/useNavigation';
import useNavigationFilteringByCountry from '../../../../../hooks/useNavigationFilteringByCountry';
import selectSettings from '../../../../../utils/componentSettings/selectSettings';
import DropdownContentNavigation from './components/DropdownContentNavigation';
import TabContentNavigation from './components/TabContentNavigation';

export const PlayerAccountContentNavigationCmsName = 'ComponentNavigationsPlayerAccountNavigation';

const PLAYER_ACCOUNT_CONTENT_NAVIGATION_TYPE_TO_COMPONENT_MAP = {
  dropdown: DropdownContentNavigation,
  tabs: TabContentNavigation
};

const PlayerAccountContentNavigation = ({ staticData }) => {
  const selectedSettings = selectSettings(staticData.settings);
  const navigation = useNavigation(NAVIGATION_TYPES.playerAccount);
  const filteredByCountryNavigationAttributes = useNavigationFilteringByCountry(
    navigation?.attributes
  );
  const [activeMenuItem, activeMenuSubItem] = useActiveNavigation(
    filteredByCountryNavigationAttributes?.menuGroups
  );

  const NavigationComponent =
    PLAYER_ACCOUNT_CONTENT_NAVIGATION_TYPE_TO_COMPONENT_MAP[staticData.menuType];

  return (
    <NavigationComponent
      activeMenuItem={activeMenuItem}
      activeMenuSubItem={activeMenuSubItem}
      playerAccountNavigationAttributes={filteredByCountryNavigationAttributes}
      selectedSettings={selectedSettings}
      useTopLevelNavigation={staticData.useTopLevelNavigation}
    />
  );
};

PlayerAccountContentNavigation.propTypes = {
  staticData: shape().isRequired
};

export default PlayerAccountContentNavigation;

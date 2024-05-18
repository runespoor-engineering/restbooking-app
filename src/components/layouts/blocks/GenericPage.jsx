import Box from '@mui/material/Box';
import { memo } from 'react';

import CmsComponentsGrid from '../../cms-components/СmsComponentsGrid/CmsComponentsGrid';
import { GLOBAL_CMS_NAME_TO_COMPONENT_MAP } from '../../cms-components/СmsComponentsGrid/cmsComponentsMaps';
import Seo from '../../common/Seo';

const GenericPage = ({
  slug,
  uiComponents,
  cmsComponentsMap,
  seo,
  componentsGridContainerSettings,
  globalUiConfigs
}) => {
  if (slug === undefined) {
    return null;
  }

  return (
    <Box>
      {/* Add meta tags for SEO */}
      {seo && <Seo metadata={seo} />}
      {/* Display content sections */}
      {uiComponents && (
        <CmsComponentsGrid
          cmsComponents={uiComponents}
          cmsComponentsMap={GLOBAL_CMS_NAME_TO_COMPONENT_MAP}
          globalUiConfigs={globalUiConfigs}
          gridContainerSettings={componentsGridContainerSettings}
        />
      )}
    </Box>
  );
};

GenericPage.defaultProps = {
  cmsComponentsMap: GLOBAL_CMS_NAME_TO_COMPONENT_MAP,
  uiComponents: null,
  seo: null,
  componentsGridContainerSettings: null
};

export default memo(GenericPage);

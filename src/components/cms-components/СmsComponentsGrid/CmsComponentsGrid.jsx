import Grid from '@mui/material/Grid';
import { memo } from 'react';

import selectSettings from '../../../utils/componentSettings/selectSettings';
import { getGridContainerProps } from '../../../utils/componentSettings/specialComponentProps';
import CmsComponentGridItem from './CmsComponentGridItem';
import { useCmsComponentsFiltering } from './hooks';

const CmsComponentsGrid = ({
  cmsComponentsMap,
  cmsComponents,
  gridContainerSettings,
  globalUiConfigs,
  direction
}) => {
  const filteredSections = useCmsComponentsFiltering(cmsComponents);

  // Iterate over sections and render each
  return (
    <Grid container {...getGridContainerProps(selectSettings(gridContainerSettings))}>
      {/* Show the actual sections */}
      {filteredSections.map((sectionData, index) => (
        <CmsComponentGridItem
          key={`${sectionData.__typename}${sectionData.id}`}
          cmsComponentIndex={index}
          cmsComponentsMap={cmsComponentsMap}
          direction={direction}
          globalUiConfigs={globalUiConfigs}
          sectionData={sectionData}
        />
      ))}
    </Grid>
  );
};

CmsComponentsGrid.defaultProps = {
  gridContainerSettings: null,
  globalUiConfigs: null
};

export default memo(CmsComponentsGrid);

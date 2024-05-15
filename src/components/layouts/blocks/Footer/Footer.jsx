import Box from '@mui/material/Box';

import { DIRECTIONS } from '../../../../constants/muiConstants';
import { useCmsStaticDataContext } from '../../../../context/CmsStaticDataContext';
import selectSettings from '../../../../utils/componentSettings/selectSettings';
import CmsComponentsGrid from '../../../cms-components/СmsComponentsGrid/CmsComponentsGrid';
import { GLOBAL_CMS_NAME_TO_COMPONENT_MAP } from '../../../cms-components/СmsComponentsGrid/cmsComponentsMaps';

const Footer = () => {
  const { layout } = useCmsStaticDataContext();

  const { footerUiComponents, footerSettings, footerGridContainerSettings } =
    layout?.attributes || {};

  const footerSelectedSettings = selectSettings(footerSettings);
  const { footerBoxSx } = footerSelectedSettings;

  if (!footerUiComponents?.length) return null;

  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: {
          xs: '32px 16px',
          sm: '32px 32px',
          md: '56px 48px',
          xl: '56px 96px'
        },
        ...footerBoxSx
      }}
    >
      {footerUiComponents && (
        <CmsComponentsGrid
          cmsComponents={footerUiComponents}
          cmsComponentsMap={GLOBAL_CMS_NAME_TO_COMPONENT_MAP}
          direction={DIRECTIONS.row}
          gridContainerSettings={footerGridContainerSettings}
        />
      )}
    </Box>
  );
};

export default Footer;

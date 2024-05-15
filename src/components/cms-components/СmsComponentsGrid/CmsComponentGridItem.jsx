import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { arrayOf, number, oneOf, oneOfType, shape } from 'prop-types';
import { memo } from 'react';

import { DIRECTIONS } from '../../../constants/muiConstants';
import {
  formFieldDataType,
  gamesCatalogType,
  gameType,
  richTextType,
  seoType
} from '../../../types';
import selectSettings from '../../../utils/componentSettings/selectSettings';
import { getGridItemProps } from '../../../utils/componentSettings/specialComponentProps';
import { AspectRatioKeeper, PositionedContainer } from '../../common/AspectRatioKeeper';

const RelativeContainer = styled(Box)({
  position: 'relative',
  overflow: 'hidden',
  height: '100%'
});

const CmsComponentGridItem = ({
  cmsComponentsMap,
  sectionData,
  globalUiConfigs,
  direction,
  cmsComponentIndex = null
}) => {
  const SectionComponent = cmsComponentsMap[sectionData.__typename];

  const { componentGridItemSettings, settings } = sectionData;
  const gridItemSettings = getGridItemProps(
    selectSettings(componentGridItemSettings),
    direction === DIRECTIONS.row ? { xs: null } : {}
  );
  const componentSetting = selectSettings(settings);
  const { aspectRatioKeeper } = componentSetting;

  if (!SectionComponent) {
    return null;
  }

  // Display the section
  return (
    <Grid item {...gridItemSettings}>
      <RelativeContainer>
        <AspectRatioKeeper aspectRatioKeeper={aspectRatioKeeper} />
        <PositionedContainer aspectRatioKeeper={aspectRatioKeeper}>
          <SectionComponent
            cmsComponentIndex={cmsComponentIndex}
            globalData={globalUiConfigs}
            staticData={sectionData}
          />
        </PositionedContainer>
      </RelativeContainer>
    </Grid>
  );
};

CmsComponentGridItem.propTypes = {
  cmsComponentsMap: shape().isRequired,
  sectionData: oneOfType([
    gamesCatalogType,
    arrayOf(formFieldDataType),
    seoType,
    gameType,
    richTextType
  ]).isRequired,
  globalUiConfigs: shape(),
  direction: oneOf([DIRECTIONS.row, DIRECTIONS.column]),
  cmsComponentIndex: number
};

CmsComponentGridItem.defaultProps = {
  globalUiConfigs: null,
  direction: DIRECTIONS.column,
  cmsComponentIndex: null
};

export default memo(CmsComponentGridItem);

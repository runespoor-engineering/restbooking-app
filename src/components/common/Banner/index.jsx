import Box from '@mui/material/Box';
import { arrayOf, bool, number, shape, string } from 'prop-types';
import { useMemo } from 'react';

import { DIRECTIONS } from '../../../constants/muiConstants';
import ActionButtonClickHandlerArgumentsContext from '../../cms-components/ActionButton/context/ActionButtonClickHandlerArgumentsContext';
import CmsComponentsGrid from '../../cms-components/СmsComponentsGrid/CmsComponentsGrid';
import BANNER_UI_COMPONENT_CMS_NAME_TO_COMPONENT_MAP from '../../cms-components/СmsComponentsGrid/cmsComponentsMaps/bannerUiComponentCmsNameToComponentMap';
import CountdownTimer from '../CountdownTimer/CountdownTimer';
import Image from '../Image';
import NextLinkComposed from '../NextLinkComposed';
import RichText from '../RichText';

const Banner = ({
  image,
  description,
  link,
  promoCode,
  bmsBonusId,
  termsAndConditions,
  termsAndConditionsPopover,
  buttons,
  buttonsGridContainerSettings,
  settings,
  countdownTimer,
  imagePriority = false
}) => {
  const imageAttributes = image?.data?.attributes;
  const buttonClickHandlerArgumentsContextValue = useMemo(
    () => ({
      bonusActionClickHandlerArguments: { promoCode, bmsBonusId },
      openRichTextPopoverClickHandlerArguments: {
        richText: termsAndConditions,
        popoverConfig: termsAndConditionsPopover
      }
    }),
    [promoCode, bmsBonusId, termsAndConditions, termsAndConditionsPopover]
  );

  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
      <Box
        component={link ? NextLinkComposed : undefined}
        sx={{ width: '100%', height: '100%' }}
        to={link}
      >
        {imageAttributes && (
          <span style={{ position: 'absolute', inset: '0px', overflow: 'hidden' }}>
            <Image
              fill
              alt={imageAttributes.alternativeText}
              priority={imagePriority}
              src={imageAttributes.url}
              style={{ objectFit: 'cover' }}
            />
          </span>
        )}
      </Box>
      {countdownTimer && <CountdownTimer countdownData={countdownTimer} />}
      <Box
        sx={{
          position: 'absolute',
          ...settings?.content?.sx
        }}
      >
        {description && <RichText css={{ marginBottom: '16px' }} markdown={description} />}
        {buttons && (
          <ActionButtonClickHandlerArgumentsContext.Provider
            value={buttonClickHandlerArgumentsContextValue}
          >
            <CmsComponentsGrid
              cmsComponents={buttons}
              cmsComponentsMap={BANNER_UI_COMPONENT_CMS_NAME_TO_COMPONENT_MAP}
              direction={DIRECTIONS.row}
              gridContainerSettings={buttonsGridContainerSettings}
            />
          </ActionButtonClickHandlerArgumentsContext.Provider>
        )}
      </Box>
    </Box>
  );
};

Banner.propTypes = {
  image: shape(),
  description: string,
  link: string,
  promoCode: string,
  termsAndConditions: string,
  bmsBonusId: number,
  termsAndConditionsPopover: shape(),
  buttons: arrayOf(shape().isRequired),
  buttonsGridContainerSettings: shape(),
  settings: shape(),
  countdownTimer: shape(),
  imagePriority: bool
};

Banner.defaultProps = {
  description: '',
  image: null,
  bmsBonusId: null,
  link: '',
  promoCode: '',
  termsAndConditions: '',
  termsAndConditionsPopover: null,
  buttons: null,
  buttonsGridContainerSettings: null,
  settings: null,
  countdownTimer: null,
  imagePriority: false
};

export default Banner;

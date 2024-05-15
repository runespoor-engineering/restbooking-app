import { arrayOf, bool, number, shape } from 'prop-types';
import { useContext, useMemo } from 'react';
// eslint-disable-next-line import/no-unresolved
import { SwiperSlide } from 'swiper/react';

import { UserContext } from '../../../context/UserContext/UserContext';
import useCurrentBreakpoint from '../../../hooks/useCurrentBreakpoint';
import { useFilteredContentByDate } from '../../../hooks/useFilteredContentByDate';
import { bannersSliderSettingsType } from '../../../types';
import selectSettings from '../../../utils/componentSettings/selectSettings';
import { getResponsiveValue } from '../../../utils/mediaQueryBreakpoints';
import Banner from '../../common/Banner';
import Slider from '../../common/Slider';

const IMAGE_TYPE_TO_PROP_NAME_MAPPER = {
  small: 'smallImage',
  large: 'largeImage'
};

const BannersSlider = ({ staticData, cmsComponentIndex = null }) => {
  const { title, banners, termsAndConditionsPopover, settings, sliderSettings } = staticData;
  const selectedSettings = selectSettings(settings);
  const { slideImageTypeBreakpoints, navigationPosition, complexStyle } = selectedSettings;

  const { isLoggedIn } = useContext(UserContext);
  const currentBreakpoint = useCurrentBreakpoint();
  const filteredBannersBySegmentsAndDate = useFilteredContentByDate(
    banners,
    'banner.data.attributes'
  );

  const slideImageType = useMemo(() => {
    if (slideImageTypeBreakpoints)
      return getResponsiveValue(slideImageTypeBreakpoints, currentBreakpoint);
    return 'large';
  }, [currentBreakpoint, slideImageTypeBreakpoints]);

  return (
    <Slider
      complexStyle={complexStyle}
      navigationPosition={navigationPosition}
      sliderSettings={sliderSettings}
      title={title}
    >
      {filteredBannersBySegmentsAndDate.map(({ banner, id }, index) => {
        const bannerAttributes = banner.data.attributes;

        return (
          <SwiperSlide key={id}>
            <Banner
              bmsBonusId={bannerAttributes.bmsBonusId}
              buttons={
                isLoggedIn
                  ? bannerAttributes.authenticatedButtons
                  : bannerAttributes.anonymousButtons
              }
              buttonsGridContainerSettings={bannerAttributes.buttonsGridContainerSettings}
              countdownTimer={bannerAttributes.countdownTimer}
              description={bannerAttributes.description}
              image={bannerAttributes[IMAGE_TYPE_TO_PROP_NAME_MAPPER[slideImageType]]}
              imagePriority={cmsComponentIndex === 0 && index === 0}
              link={bannerAttributes.link}
              promoCode={bannerAttributes.promoCode}
              settings={selectSettings(bannerAttributes.settings)}
              termsAndConditions={bannerAttributes.termsAndConditions}
              termsAndConditionsPopover={termsAndConditionsPopover}
            />
          </SwiperSlide>
        );
      })}
    </Slider>
  );
};

BannersSlider.propTypes = {
  staticData: shape({
    banners: arrayOf(shape()).isRequired,
    settings: shape({
      defaultSettings: bannersSliderSettingsType,
      customSettings: bannersSliderSettingsType,
      useCustomSettings: bool.isRequired
    })
  }).isRequired,
  cmsComponentIndex: number
};

BannersSlider.defaultProps = {
  cmsComponentIndex: null
};
export default BannersSlider;

import { gql } from '@apollo/client';

export default gql`
  fragment bannersSliderComponentFragment on ComponentSliderBannersSlider {
    id
    title
    banners {
      id
      banner {
        data {
          id
          attributes {
            ...bannerFragment
          }
        }
      }
    }
    termsAndConditionsPopover {
      ...popoverComponentFragment
    }
    settings {
      ...settingsJsonComponentFragment
    }
    sliderSettings {
      ...sliderSettingsJsonComponentFragment
    }
    componentGridItemSettings {
      ...settingsJsonComponentFragment
    }
  }
`;

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
    settings {
      ...settingsJsonComponentFragment
    }
    sliderSettings {
      ...settingsJsonComponentFragment
    }
    componentGridItemSettings {
      ...settingsJsonComponentFragment
    }
  }
`;

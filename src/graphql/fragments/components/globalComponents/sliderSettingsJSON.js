import { gql } from '@apollo/client';

export default gql`
  fragment sliderSettingsJsonComponentFragment on ComponentGlobalComponentsSliderSettingsJson {
    defaultSettings
    customSettings
    useCustomSettings
  }
`;

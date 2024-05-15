import { gql } from '@apollo/client';

export default gql`
  fragment settingsJsonComponentFragment on ComponentGlobalComponentsSettingsJson {
    id
    defaultSettings
    customSettings
    useCustomSettings
  }
`;

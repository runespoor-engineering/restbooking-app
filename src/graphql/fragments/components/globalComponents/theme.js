import { gql } from '@apollo/client';

export default gql`
  fragment themeComponentFragment on ComponentGlobalComponentsTheme {
    defaultDarkTheme
    defaultLightTheme
    customDarkTheme
    customLightTheme
    useCustomTheme
  }
`;

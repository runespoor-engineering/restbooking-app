import { gql } from '@apollo/client';

export default gql`
  fragment navigationFragment on Navigation {
    type
    channel
    authenticationState
    menuGroups {
      id
      title
      menuItems {
        id
        text
        link
        linkOpeningType
        restrictFor
        icon {
          data {
            attributes {
              ...imageFragment
            }
          }
        }
        menuSubItems {
          id
          text
          link
          icon {
            data {
              attributes {
                ...imageFragment
              }
            }
          }
        }
      }
    }
  }
`;

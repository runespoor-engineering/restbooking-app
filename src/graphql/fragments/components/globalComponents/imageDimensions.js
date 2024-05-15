import { gql } from '@apollo/client';

export default gql`
  fragment imageDimensionsComponentFragment on ComponentGlobalComponentsImageDimensions {
    id
    width
    height
  }
`;

import { gql } from '@apollo/client';

export default gql`
  fragment imageFragment on UploadFile {
    url
  }
`;

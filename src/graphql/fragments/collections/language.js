import { gql } from '@apollo/client';

export default gql`
  fragment languageFragment on Language {
    name
    value
  }
`;

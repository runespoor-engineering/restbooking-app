import { gql } from '@apollo/client';

export default gql`
  fragment useBreakpointComponentFragment on ComponentGlobalComponentsUseBreakpoint {
    breakpoint
  }
`;

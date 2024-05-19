import { gql } from '@apollo/client';

export const APARTMENT_BOOKING_ORDERS = gql`
  query ApartmentBookingsQuery($apartmentSlug: String!) {
    bookingOrders(
      filters: { apartment: { slug: { eq: $apartmentSlug } } }
      publicationState: PREVIEW
    ) {
      data {
        attributes {
          bookingInfo
        }
      }
    }
  }
`;

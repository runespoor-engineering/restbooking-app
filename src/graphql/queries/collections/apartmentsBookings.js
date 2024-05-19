import { gql } from '@apollo/client';

export const USER_APARTMENTS_BOOKING_ORDERS = gql`
  query ApartmentsBookingsQuery($userId: ID!) {
    bookingOrders(
      filters: { users_permissions_user: { id: { eq: $userId } } }
      publicationState: PREVIEW
    ) {
      data {
        id
        attributes {
          bookingInfo
          apartment {
            data {
              id
              attributes {
                title
                price
                slug
              }
            }
          }
        }
      }
    }
  }
`;

import { gql } from '@apollo/client';

export const CREATE_BOOKING_ORDER_MUTATION = gql`
  mutation CreateBookingOrderMutation($input: BookingOrderInput!) {
    createBookingOrder(data: $input) {
      data {
        id
      }
    }
  }
`;

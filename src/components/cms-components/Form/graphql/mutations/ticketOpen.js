import { gql } from '@apollo/client';

export default gql`
  mutation TicketOpen($bmsPartnerId: Int!, $input: TicketOpenInput!) {
    ticketOpen(bmsPartnerId: $bmsPartnerId, input: $input) {
      recordId
      record {
        id
        createdAt
        statusTranslationId
        typeTranslationId
        subject
        lastMessageText
        lastMessageAt
        unreadMessagesCount
      }
      status
      problems {
        message
        problemCode
      }
    }
  }
`;

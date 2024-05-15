import { gql } from '@apollo/client';

export default gql`
  fragment bannerFragment on Banner {
    description
    startDate
    endDate
    link
    bmsBonusId
    promoCode
    termsAndConditions
    countdownTimer {
      useFlipAnimation
      timerFormat
      timerDaysTitle
      timerHoursTitle
      timerMinutesTitle
      timerSecondsTitle
      targetDate
      title
      settings {
        ...settingsJsonComponentFragment
      }
    }
    largeImage {
      data {
        attributes {
          ...imageFragment
        }
      }
    }
    smallImage {
      data {
        attributes {
          ...imageFragment
        }
      }
    }
    anonymousButtons {
      ...bannerAnonymousActionButtonComponentFragment
    }
    authenticatedButtons {
      ...bannerAuthenticatedActionButtonComponentFragment
    }
    buttonsGridContainerSettings {
      ...settingsJsonComponentFragment
    }
    settings {
      ...settingsJsonComponentFragment
    }
  }
`;

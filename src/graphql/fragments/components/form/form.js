import { gql } from '@apollo/client';

export default gql`
  fragment formComponentFragment on ComponentFormsForm {
    id
    form {
      data {
        attributes {
          title
          header
          footer
          type
          onSubmitLinkToOpen
          readonly
          disabled
          steps {
            ...formStepComponentFragment
          }
          formSettings {
            ...settingsJsonComponentFragment
          }
          prevStepButton {
            ...specialtyButtonComponentFragment
          }
          nextStepButton {
            ...specialtyButtonComponentFragment
          }
          submitButton {
            ...specialtyButtonComponentFragment
          }
          useStepConnector
          anonymousFallbackLink
          useResetOnSuccessSubmit
        }
      }
    }
    settings {
      ...settingsJsonComponentFragment
    }
    componentGridItemSettings {
      ...settingsJsonComponentFragment
    }
  }
`;

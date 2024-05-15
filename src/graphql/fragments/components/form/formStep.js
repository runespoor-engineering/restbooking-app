import { gql } from '@apollo/client';

export default gql`
  fragment formStepComponentFragment on ComponentFormsFormStep {
    id
    title
    fieldsColor
    fieldsVariant
    description
    defaultStepIcon {
      data {
        attributes {
          ...imageFragment
        }
      }
    }
    activeStepIcon {
      data {
        attributes {
          ...imageFragment
        }
      }
    }
    completedStepIcon {
      data {
        attributes {
          ...imageFragment
        }
      }
    }
    formGroups {
      id
      title
      fieldsGridContainerSettings
      formFields {
        __typename
        id
        name
        identifier
        kind
        options
        label
        muiHelperText
        required
        maxlength
        minlength
        max
        min
        pattern
        readonly
        disabled
        accept
        gridItemSettings
        autocomplete
        useThisField
        inputmode
        placeholder
        title
        step
        multiple
        checked
        patternErrorMessage
        nameForErrorMessage
        typeErrorMessage
        defaultUploadIcon {
          data {
            attributes {
              ...imageFragment
            }
          }
        }
        interactedUploadIcon {
          data {
            attributes {
              ...imageFragment
            }
          }
        }
        muiInputAdornmentVisibility
        settings {
          ...settingsJsonComponentFragment
        }
      }
    }
  }
`;

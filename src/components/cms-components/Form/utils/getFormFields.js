export default (form) =>
  form.steps.reduce((acc, step) => {
    return [
      ...acc,
      ...step.formGroups
        .map((formGroup) => formGroup.formFields?.filter((formField) => !!formField.useThisField))
        .flat()
    ];
  }, []);

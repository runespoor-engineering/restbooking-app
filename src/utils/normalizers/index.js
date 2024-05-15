// eslint-disable-next-line import/prefer-default-export
export const normalizeDataIntoEntities = (data) => ({
  data: data?.reduce(
    (entitiesAcc, dataObject) => [
      ...entitiesAcc,
      {
        attributes: dataObject
      }
    ],
    []
  )
});

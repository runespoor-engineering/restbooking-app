import getEntityDataByPath from '../getEntityDataByPath';

const normalizeEntitiesData = (entities, entityPropertiesToNormalize, entityDataPath) =>
  entities?.map((entity) => {
    const entityData = getEntityDataByPath(entity, entityDataPath);
    if (!entityData) return null;
    const propertiesTypeToNormalizer = {
      string: () => entityData[entityPropertiesToNormalize],
      object: () => {
        const normalizedEntityData = {};
        entityPropertiesToNormalize?.forEach((prop) => {
          normalizedEntityData[prop] = entityData[prop];
        });
        return normalizedEntityData;
      }
    };
    const normalizer = propertiesTypeToNormalizer[typeof entityPropertiesToNormalize];
    return normalizer && normalizer();
  });

export default normalizeEntitiesData;

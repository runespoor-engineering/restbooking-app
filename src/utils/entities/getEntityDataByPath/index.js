import get from 'lodash/get';

const getEntityDataByPath = (entity, entityDataPath) =>
  entityDataPath ? get(entity, entityDataPath) : entity;

export default getEntityDataByPath;

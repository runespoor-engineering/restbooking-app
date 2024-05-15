const isObject = (entity) =>
  typeof entity === 'object' && entity !== null && !Array.isArray(entity);

export default isObject;

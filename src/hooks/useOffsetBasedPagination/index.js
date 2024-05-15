import { useMemo } from 'react';

const useOffsetBasedPagination = (entities, offset, limit) => {
  return useMemo(
    () => entities?.slice(offset * limit, offset * limit + limit) || [],
    [entities, limit, offset]
  );
};

export default useOffsetBasedPagination;

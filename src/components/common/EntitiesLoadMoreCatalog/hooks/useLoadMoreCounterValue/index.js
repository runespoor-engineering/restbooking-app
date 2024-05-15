import { useMemo } from 'react';

import { LOAD_MORE_COUNTER_VARIANTS } from '../../../../../constants/cms';

const useLoadMoreCounterValue = (totalElements, elementsLeft, variant) => {
  return useMemo(() => {
    const VARIANT_TO_VALUE_MAP = {
      [LOAD_MORE_COUNTER_VARIANTS.static]: totalElements,
      [LOAD_MORE_COUNTER_VARIANTS.dynamic]: elementsLeft
    };
    return Number.isInteger(VARIANT_TO_VALUE_MAP[variant])
      ? VARIANT_TO_VALUE_MAP[variant]
      : totalElements;
  }, [elementsLeft, totalElements, variant]);
};

export default useLoadMoreCounterValue;

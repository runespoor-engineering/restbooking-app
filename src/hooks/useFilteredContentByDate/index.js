import { useMemo } from 'react';

import { getEntityDataByPath } from '../../utils/entities';

const minDateValue = -8640000000000000;
const maxDateValue = 8640000000000000;

export const isCurrentDateInRange = (startDateValue, endDateValue) => {
  const currentDate = new Date();
  return (
    currentDate >= new Date(startDateValue || minDateValue) &&
    currentDate <= new Date(endDateValue || maxDateValue)
  );
};

export const useFilteredContentByDate = (content, contentAttributesPath) => {
  const filteredContentByDate = useMemo(
    () =>
      content.filter((contentItem) => {
        const contentAttributes = getEntityDataByPath(contentItem, contentAttributesPath);
        return isCurrentDateInRange(contentAttributes.startDate, contentAttributes.endDate);
      }),
    [content, contentAttributesPath]
  );

  return filteredContentByDate;
};

import { useMemo } from 'react';

import useOffsetBasedPagination from '../../../hooks/useOffsetBasedPagination';
import usePagination from '../../../hooks/usePagination';
import useResponsiveValue from '../../../hooks/useResponsiveValue';
import EntitiesCatalog from '../EntitiesCatalog';
import { useLoadMoreCounterValue } from './hooks';

const DEFAULT_ENTITIES_COUNT_TO_SHOW = 8;

const EntitiesLoadMoreCatalog = ({
  title,
  description,
  entities,
  loadMoreButton,
  settings,
  normalizeEntityAttributes,
  counterConfig,
  EntityComponent,
  InjectionZoneComponent
}) => {
  const { entitiesCountToShowBreakpoints } = settings || {};

  const entitiesCountToShow = useResponsiveValue(
    entitiesCountToShowBreakpoints || {},
    DEFAULT_ENTITIES_COUNT_TO_SHOW
  );
  const { setNextPage, isCurrentPageLast, lastElementIndex, elementsLeft } = usePagination(
    entities?.data?.length,
    entitiesCountToShow
  );
  const counterValue = useLoadMoreCounterValue(
    entities?.data?.length,
    elementsLeft,
    counterConfig?.variant
  );

  const entitiesToShow = useOffsetBasedPagination(entities?.data, 0, lastElementIndex + 1);

  const normalizedEntitiesToShow = useMemo(() => ({ data: entitiesToShow }), [entitiesToShow]);

  return (
    <EntitiesCatalog
      EntityComponent={EntityComponent}
      InjectionZoneComponent={InjectionZoneComponent}
      button={loadMoreButton}
      counterConfig={counterConfig}
      counterValue={counterValue}
      description={description}
      entities={normalizedEntitiesToShow}
      handleButtonClick={setNextPage}
      normalizeEntityAttributes={normalizeEntityAttributes}
      settings={settings}
      shouldRenderButton={!isCurrentPageLast}
      title={title}
    />
  );
};

EntitiesLoadMoreCatalog.defaultProps = {
  title: '',
  description: '',
  entities: null,
  loadMoreButton: null,
  counterConfig: null,
  settings: null,
  InjectionZoneComponent: null
};

export default EntitiesLoadMoreCatalog;

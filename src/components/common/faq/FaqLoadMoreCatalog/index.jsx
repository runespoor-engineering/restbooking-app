import { useCallback, useMemo } from 'react';

import selectSettings from '../../../../utils/componentSettings/selectSettings';
import { normalizeDataIntoEntities } from '../../../../utils/normalizers';
import EntitiesLoadMoreCatalog from '../../EntitiesLoadMoreCatalog';
import FaqAccordion from '../FaqAccordion';

const FaqLoadMoreCatalog = ({ title, faqs, expandIcon, showMoreButton, settings }) => {
  const faqEntities = useMemo(() => normalizeDataIntoEntities(faqs), [faqs]);
  const normalizeFaqAttributes = useCallback(
    ({ summary, details, summaryIcon }) => ({
      summary,
      details,
      summaryIcon,
      expandIcon
    }),
    [expandIcon]
  );
  const selectedSettings = selectSettings(settings);
  const {
    mainGridItemContainerProps,
    titleGridItemProps,
    titleTypographyProps,
    entityGridItemProps,
    entitiesGridItemContainerProps,
    faqSettings
  } = selectedSettings;

  return (
    <EntitiesLoadMoreCatalog
      EntityComponent={FaqAccordion}
      entities={faqEntities}
      loadMoreButton={showMoreButton}
      normalizeEntityAttributes={normalizeFaqAttributes}
      settings={{
        entitiesGridSettings: {
          mainGridItemContainerProps,
          entitiesGridItemContainerProps,
          entityGridItemProps,
          titleGridItemProps,
          titleTypographyProps,
          entitySettings: faqSettings
        }
      }}
      title={title}
    />
  );
};

FaqLoadMoreCatalog.defaultProps = {
  title: '',
  faqs: [],
  expandIcon: null,
  showMoreButton: null,
  settings: null
};

export default FaqLoadMoreCatalog;

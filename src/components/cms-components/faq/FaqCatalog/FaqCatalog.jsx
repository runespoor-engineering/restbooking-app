/* eslint-disable camelcase */
import Grid from '@mui/material/Grid';
import { useState } from 'react';

import selectSettings from '../../../../utils/componentSettings/selectSettings';
import {
  getGridContainerProps,
  getGridItemProps
} from '../../../../utils/componentSettings/specialComponentProps';
import FaqAccordion from '../../../common/faq/FaqAccordion';
import FaqCategoryButton from './components/FaqCategoryButton';

const FaqCatalog = ({ staticData }) => {
  const { faqCategories, settings, expandIcon } = staticData;
  const selectedSettings = selectSettings(settings);

  const faqCategorySettings = selectedSettings.faqCategory;

  const faqCatalogGridContainerSettings = getGridContainerProps(
    selectedSettings.faqCatalogGridContainer
  );
  const faqCategoryGridContainerSettings = getGridContainerProps(
    selectedSettings.faqCategoryGridContainer
  );
  const faqCategoryGridItemSettings = getGridItemProps(selectedSettings.faqCategoryGridItem);
  const faqGridContainerSettings = getGridContainerProps(selectedSettings.faqGridContainer);
  const faqGridItemSettings = getGridItemProps(selectedSettings.faqGridItem);

  const [activeFaqCategoryIndex, setActiveFaqCategoryIndex] = useState(0);

  const getFaqCategoryClickHandler = (categoryIndex) => () => {
    setActiveFaqCategoryIndex(categoryIndex);
  };

  return (
    <Grid container spacing={1} {...faqCatalogGridContainerSettings}>
      <Grid container item spacing={1} xs={12} {...faqCategoryGridContainerSettings}>
        {faqCategories.map(({ faq_category }, index) => {
          const { title, icon } = faq_category.data.attributes;
          return (
            <Grid key={faq_category.data.id} item {...faqCategoryGridItemSettings}>
              <FaqCategoryButton
                handleClick={getFaqCategoryClickHandler(index)}
                icon={icon}
                isActive={index === activeFaqCategoryIndex}
                settings={faqCategorySettings}
                title={title}
              />
            </Grid>
          );
        })}
      </Grid>
      <Grid container item xs={12} spacing={1} {...faqGridContainerSettings}>
        {faqCategories[activeFaqCategoryIndex].faq_category.data.attributes.faqs.map(({ faq }) => {
          if (!faq?.data?.attributes) return null;
          const { summary, details, summaryIcon } = faq.data.attributes;
          const { id } = faq.data;
          return (
            <Grid item {...faqGridItemSettings} key={id}>
              <FaqAccordion
                details={details}
                expandIcon={expandIcon}
                summary={summary}
                summaryIcon={summaryIcon}
              />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default FaqCatalog;

import { shape } from 'prop-types';

export default shape({
  faqCategory: shape({
    button: shape()
  }),
  faqCatalogGridContainer: shape(),
  faqCategoryGridContainer: shape(),
  faqCategoryGridItem: shape(),
  faqGridContainer: shape(),
  faqGridItem: shape()
});

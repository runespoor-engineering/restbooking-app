import dynamic from 'next/dynamic';

import { withStaticDataProp } from '../../../../hocs';

export const FaqCatalogManualCmsName = 'ComponentFaqFaqCatalogManual';
export const FaqCatalogManual = dynamic(() => import('../../../common/faq/FaqLoadMoreCatalog'));
export const FaqCatalogManualCmsComponent = withStaticDataProp(FaqCatalogManual);

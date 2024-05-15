import dynamic from 'next/dynamic';

export const componentCmsName = 'ComponentFaqFaqCatalog';
export const FaqCatalog = dynamic(() => import('./FaqCatalog'));

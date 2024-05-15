import dynamic from 'next/dynamic';

export const componentCmsName = 'ComponentPageComponentsRichText';

export const RichText = dynamic(() => import('./RichText'));

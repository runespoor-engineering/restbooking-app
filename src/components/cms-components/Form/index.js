import dynamic from 'next/dynamic';

export const componentCmsName = 'ComponentFormsForm';
export const Form = dynamic(() => import('./Form'));

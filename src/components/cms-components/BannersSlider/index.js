import dynamic from 'next/dynamic';

export const componentCmsName = 'ComponentSliderBannersSlider';
export const BannersSlider = dynamic(() => import('./BannersSlider'));

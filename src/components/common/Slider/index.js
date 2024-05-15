import dynamic from 'next/dynamic';

const Slider = dynamic(() => import('./Slider'));
export default Slider;

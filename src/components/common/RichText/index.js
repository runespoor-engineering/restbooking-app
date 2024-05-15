import dynamic from 'next/dynamic';

const RichText = dynamic(() => import('./RichText'));

export default RichText;

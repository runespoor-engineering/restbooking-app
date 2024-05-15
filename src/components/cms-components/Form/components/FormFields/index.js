import dynamic from 'next/dynamic';

export const InputCheckbox = dynamic(() => import('./InputCheckbox/InputCheckbox'));
export const InputDate = dynamic(() => import('./InputDate'));
export const InputEmail = dynamic(() => import('./InputEmail/InputEmail'));
export const InputFile = dynamic(() => import('./InputFile'));
export const InputNumber = dynamic(() => import('./InputNumber/InputNumber'));
export const InputPassword = dynamic(() => import('./InputPassword/InputPassword'));
export const InputPhone = dynamic(() => import('./InputPhone/InputPhone'));
export const InputSelect = dynamic(() => import('./InputSelect/InputSelect'));
export const InputText = dynamic(() => import('./InputText/InputText'));

import { createContext, useContext } from 'react';

export const CmsStaticDataContext = createContext({});
CmsStaticDataContext.displayName = 'CmsStaticDataContext';

export const useCmsStaticDataContext = () => useContext(CmsStaticDataContext);

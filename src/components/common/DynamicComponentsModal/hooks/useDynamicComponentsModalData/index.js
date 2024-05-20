import { useRouter } from 'next/router';
import {  useMemo } from 'react';

import { useCmsStaticDataContext } from '../../../../../context/CmsStaticDataContext';
import { getModalDataByName } from '../../utils';

const useDynamicComponentsModalData = () => {
  const router = useRouter();
  const { modal } = router.query;
  const { modalContents } = useCmsStaticDataContext();

  return useMemo(() => {
    const modals = [...(modalContents?.data || [])];
    if (modal) return getModalDataByName(modal, modals);

    return null;
  }, [modal, modalContents?.data]);
};

export default useDynamicComponentsModalData;

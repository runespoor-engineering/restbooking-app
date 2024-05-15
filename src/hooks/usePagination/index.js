import { useCallback, useMemo, useState } from 'react';

const usePagination = (elementsCount, elementsCountPerPage, defaultPage = 1) => {
  if (elementsCount < 0) {
    throw new Error('elementsCount should be greater or equal 0');
  }
  if (elementsCountPerPage < 0) {
    throw new Error('elementsCountPerPage should be greater 0');
  }

  const shouldPaginate = useMemo(
    () => elementsCountPerPage < elementsCount,
    [elementsCount, elementsCountPerPage]
  );
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const pagesCount = useMemo(
    () => (shouldPaginate ? Math.ceil(elementsCount / elementsCountPerPage) : 1),
    [elementsCount, elementsCountPerPage, shouldPaginate]
  );
  const firstElementIndex = useMemo(
    () => (currentPage - 1) * elementsCountPerPage,
    [currentPage, elementsCountPerPage]
  );
  const lastElementIndex = useMemo(
    () => (shouldPaginate ? firstElementIndex + elementsCountPerPage - 1 : elementsCount - 1),
    [elementsCount, elementsCountPerPage, firstElementIndex, shouldPaginate]
  );
  const isCurrentPageFirst = useMemo(() => currentPage === 1, [currentPage]);
  const isCurrentPageLast = useMemo(() => currentPage === pagesCount, [currentPage, pagesCount]);
  const elementsLeft = useMemo(
    () => (isCurrentPageLast ? 0 : elementsCount - currentPage * elementsCountPerPage),
    [currentPage, elementsCount, elementsCountPerPage, isCurrentPageLast]
  );

  const setNextPage = useCallback(() => {
    if (!isCurrentPageLast) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, isCurrentPageLast]);

  const setPrevPage = useCallback(() => {
    if (!isCurrentPageFirst) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage, isCurrentPageFirst]);

  const setPage = useCallback(
    (pageNumber) => {
      if (pageNumber > 0 && pageNumber <= pagesCount) {
        setCurrentPage(pageNumber);
      }
    },
    [pagesCount]
  );

  return {
    pagesCount,
    setNextPage,
    setPrevPage,
    setPage,
    firstElementIndex,
    lastElementIndex,
    currentPage,
    isCurrentPageFirst,
    isCurrentPageLast,
    elementsLeft
  };
};

export default usePagination;

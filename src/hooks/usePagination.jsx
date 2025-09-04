import { useState, useEffect, useMemo } from 'react';

const usePagination = (data, initialRowsPerPage = 10) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  useEffect(() => {
    setPage(0);
  }, [data]);

  const paginatedData = useMemo(() => {
    if (!data) return null;
    
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    
    return data.slice(startIndex, endIndex);
  }, [data, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const totalCount = data ? data.length : 0;

  return {
    page,
    rowsPerPage,
    paginatedData,
    totalCount,
    handleChangePage,
    handleChangeRowsPerPage,
    setPage,
    setRowsPerPage
  };
};

export default usePagination;
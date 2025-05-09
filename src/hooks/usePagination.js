import { useState } from "react";


export const usePagination = (datos = [], tipoBusqueda, rowsPerPa = 5) => {
  //?estados
  const [searchName, setSearchName] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(rowsPerPa);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const filteredEmployees = datos.filter((dato) =>
    dato[tipoBusqueda].toLowerCase().includes(searchName.toLowerCase())
  );
  const paginatedData = filteredEmployees.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return {
    rowsPerPage,
    setSearchName,
    searchName,
    page,
    handleChangePage,
    filteredEmployees,
    paginatedData
  }
}

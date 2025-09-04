import { TablePagination } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const Pagination = ({
  totalCount,
  page,
  handleChangePage,
  rowsPerPage,
  handleChangeRowsPerPage,
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <TablePagination
      component="div"
      color="danger"
      count={totalCount}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      sx={{
        color: theme === "dark" ? "white" : "black",
        "& .MuiTablePagination-actions .MuiIconButton-root": {
          color: theme === "dark" ? "white" : "black",
        },
        "& .MuiTablePagination-actions .MuiIconButton-root.Mui-disabled": {
          color: "gray",
        },
        "& .MuiSelect-icon": {
          color: theme === "dark" ? "white" : "black",
        },
      }}
    />
  );
};

export default Pagination;

import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function BasicPagination({
  totalPages,
  onPageChange,
  currentPage,
}) {
  const handleChange = (event, value) => {
    onPageChange(value - 1); //start with 0
  };
  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        color="primary"
        onChange={handleChange}
        page={currentPage + 1}
      />
    </Stack>
  );
}

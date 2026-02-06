'use client';

import { Pagination, Stack, Box } from '@mui/material';
import './PaginationMUI.css';

interface PaginationMUIProps {
  count: number;
  current: number;
  onPageChange: (page: number) => void;
}

export default function PaginationMUI({
  count,
  current,
  onPageChange,
}: PaginationMUIProps) {
  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
  };

  return (
    <Box
      className="paginationContainer"
      sx={{ display: 'flex', justifyContent: 'center', my: 3 }}
    >
      <Stack spacing={2}>
        <Pagination
          count={count}
          page={current}
          onChange={handleChange}
          color="primary"
          size="large"
          showFirstButton
          showLastButton
        />
      </Stack>
    </Box>
  );
}

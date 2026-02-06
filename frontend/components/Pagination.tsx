'use client';

import { Pagination as AntPagination, Select } from 'antd';
import './Pagination.css';

interface PaginationProps {
  current: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export default function Pagination({
  current,
  total,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  return (
    <div className="paginationContainer">
      <AntPagination
        current={current}
        total={total}
        pageSize={pageSize}
        onChange={onPageChange}
        showSizeChanger
        onShowSizeChange={(_, size) => onPageSizeChange(size)}
        pageSizeOptions={['5', '10', '15', '20']}
        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
        locale={{
          items_per_page: '/ page',
          jump_to: 'Go to',
          jump_to_confirm: 'confirm',
          page: '',
          prev_page: 'Previous Page',
          next_page: 'Next Page',
          prev_5: 'Previous 5 Pages',
          next_5: 'Next 5 Pages',
          prev_3: 'Previous 3 Pages',
          next_3: 'Next 3 Pages',
        }}
      />
    </div>
  );
}

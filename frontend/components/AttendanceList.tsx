'use client';

import { useState, useEffect } from 'react';
import { Attendance, attendanceAPI } from '@/lib/api';
import PaginationMUI from './PaginationMUI';
import './AttendanceList.css';

interface AttendanceListProps {
  employeeId?: string;
}

export default function AttendanceList({ employeeId }: AttendanceListProps) {
  const [records, setRecords] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    const fetchAttendance = async (page: number, size: number) => {
      try {
        setLoading(true);
        const response = employeeId
          ? await attendanceAPI.getByEmployeeId(employeeId, page, size)
          : await attendanceAPI.getAll(page, size);
        setRecords(response.data);
        setTotal(response.total);
        setTotalPage(response.totalPage || Math.ceil(response.total / size));
        setError('');
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load attendance',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance(currentPage, pageSize);
  }, [employeeId, currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading)
    return <div className="loading">Loading attendance records...</div>;

  return (
    <div className="container">
      <h2 className="attendance-title">
        Attendance Records {employeeId && `- ${employeeId}`}
      </h2>

      {error && <div className="error">{error}</div>}

      {records.length === 0 ? (
        <p className="empty">No attendance records found</p>
      ) : (
        <>
          <div className="AttendanceWrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Employee Name</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, idx) => {
                  const key =
                    record.id ?? `${record.employee_id}-${record.date}-${idx}`;
                  return (
                    <tr
                      key={key}
                      className={`row ${record.status.toLowerCase()}`}
                    >
                      <td>{record.employee_id}</td>
                      <td>{record.employee_name ?? '-'}</td>
                      <td>{new Date(record.date).toLocaleDateString()}</td>
                      <td>
                        <span
                          className={`badge ${record.status.toLowerCase()}`}
                        >
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {total > 5 && (
            <PaginationMUI
              count={totalPage}
              current={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}

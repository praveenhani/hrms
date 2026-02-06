'use client';

import { useState, useEffect } from 'react';
import { Employee, employeeAPI } from '@/lib/api';
import PaginationMUI from './PaginationMUI';
import './EmployeeList.css';

export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    fetchEmployees(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const fetchEmployees = async (page: number, size: number) => {
    try {
      setLoading(true);
      const response = await employeeAPI.getAll(page, size);
      setEmployees(response.data);
      setTotal(response.total);
      setTotalPage(response.totalPage || Math.ceil(response.total / size));
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;
    try {
      await employeeAPI.delete(id);
      setEmployees(employees.filter(emp => emp.employee_id !== id));
      // Refetch if no items left on current page
      if (employees.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        fetchEmployees(currentPage, pageSize);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete employee');
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) return <div className="loading">Loading employees...</div>;

  return (
    <div className="container">
      <h2 className="title">Employee List</h2>
      
      {error && <div className="error">{error}</div>}

      {employees.length === 0 ? (
        <p className="empty">No employees found</p>
      ) : (
        <>
          <div className="tableWrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(emp => (
                  <tr key={emp.employee_id}>
                    <td>{emp.employee_id}</td>
                    <td>{emp.full_name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.department}</td>
                    <td>
                      <button
                        className="deleteBtn"
                        onClick={() => handleDelete(emp.employee_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
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

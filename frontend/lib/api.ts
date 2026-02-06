const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface Employee {
  employee_id: string;
  full_name: string;
  email: string;
  department: string;
  total?: number;
  totalPage?: number;
}

export interface Attendance {
  id: string;
  employee_id: string;
  employee_name?: string;
  date: string;
  status: 'Present' | 'Absent';
  totalPage?: number;
}

// Employee API calls
export const employeeAPI = {
  getAll: async (page: number = 1, pageSize: number = 10): Promise<{ data: Employee[]; total: number; page: number; totalPage: number }> => {
    const res = await fetch(`${API_BASE_URL}/employees/?page=${page}&page_size=${pageSize}`);
    if (!res.ok) throw new Error('Failed to fetch employees');
    return res.json();
  },

  getById: async (id: string): Promise<Employee> => {
    const res = await fetch(`${API_BASE_URL}/employees/${id}`);
    if (!res.ok) throw new Error('Employee not found');
    return res.json();
  },

  create: async (employee: Omit<Employee, 'id'>): Promise<{ message: string; employee_id: string; totalPage: number }> => {
    const res = await fetch(`${API_BASE_URL}/employees/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employee),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || 'Failed to create employee');
    }
    return res.json();
  },

  delete: async (id: string): Promise<{ message: string }> => {
    const res = await fetch(`${API_BASE_URL}/employees/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete employee');
    return res.json();
  },
};

// Attendance API calls
export const attendanceAPI = {
  getAll: async (page: number = 1, pageSize: number = 10): Promise<{ data: Attendance[]; total: number; page: number; totalPage: number }> => {
    const res = await fetch(`${API_BASE_URL}/attendance/?page=${page}&page_size=${pageSize}`);
    if (!res.ok) throw new Error('Failed to fetch attendance');
    return res.json();
  },

  getByEmployeeId: async (employeeId: string, page: number = 1, pageSize: number = 10): Promise<{ data: Attendance[]; total: number; page: number; totalPage: number }> => {
    const res = await fetch(`${API_BASE_URL}/attendance/${employeeId}?page=${page}&page_size=${pageSize}`);
    if (!res.ok) throw new Error('Failed to fetch attendance');
    return res.json();
  },

  mark: async (data: Omit<Attendance, 'id'>): Promise<{ message: string; id: string }> => {
    const res = await fetch(`${API_BASE_URL}/attendance/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || 'Failed to mark attendance');
    }
    return res.json();
  },
};

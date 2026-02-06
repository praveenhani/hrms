'use client';

import { useState } from 'react';
import { employeeAPI } from '@/lib/api';
import './EmployeeForm.css';

interface EmployeeFormProps {
  onSuccess: () => void;
}

export default function EmployeeForm({ onSuccess }: EmployeeFormProps) {
  const [formData, setFormData] = useState({
    employee_id: '',
    full_name: '',
    email: '',
    department: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [emailError, setEmailError] = useState('');
  const [idError, setIdError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'email') setEmailError('');
    if (name === 'employee_id') setIdError('');
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateEmployeeId = (id: string) => {
    // Accepts EMP followed by exactly 3 digits, e.g. EMP001
    return /^EMP\d{3}$/.test(id);
  };

  const handleEmailBlur = () => {
    if (formData.email && !validateEmail(formData.email)) {
      setEmailError('Please enter a valid email (e.g. name@example.com)');
    }
  };

  const handleIdBlur = () => {
    if (formData.employee_id && !validateEmployeeId(formData.employee_id)) {
      setIdError('Employee ID must be in format EMP001');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (
      !formData.employee_id ||
      !formData.full_name ||
      !formData.email ||
      !formData.department
    ) {
      setError('All fields are required');
      return;
    }

    if (!validateEmail(formData.email)) {
      setEmailError('Please enter a valid email (e.g. name@example.com)');
      return;
    }
    if (!validateEmployeeId(formData.employee_id)) {
      setIdError('Employee ID must be in format EMP001');
      return;
    }
    try {
      setLoading(true);
      await employeeAPI.create(formData);
      setSuccess('Employee added successfully!');
      setFormData({
        employee_id: '',
        full_name: '',
        email: '',
        department: '',
      });
      setTimeout(onSuccess, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add employee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="title">Add New Employee</h2>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <div className="formGroup">
        <label htmlFor="employee_id">Employee ID</label>
        <input
          type="text"
          id="employee_id"
          name="employee_id"
          value={formData.employee_id}
          onChange={handleChange}
          placeholder="Enter Employee ID (e.g., EMP001)"
          onBlur={handleIdBlur}
          aria-invalid={!!idError}
          required
        />
        {idError && <div className="fieldError">{idError}</div>}
      </div>

      <div className="formGroup">
        <label htmlFor="full_name">Full Name</label>
        <input
          type="text"
          id="full_name"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          placeholder="Enter Full Name"
          required
        />
      </div>

      <div className="formGroup">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter Email Address"
          onBlur={handleEmailBlur}
          aria-invalid={!!emailError}
          required
        />
        {emailError && <div className="fieldError">{emailError}</div>}
      </div>

      <div className="formGroup">
        <label htmlFor="department">Department</label>
        <select
          id="department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
        >
          <option value="">Select Department</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="Finance">Finance</option>
          <option value="Operations">Operations</option>
        </select>
      </div>

      <button type="submit" className="submitBtn" disabled={loading}>
        {loading ? 'Adding...' : 'Add Employee'}
      </button>
    </form>
  );
}

'use client';

import { useState } from 'react';
import { attendanceAPI } from '@/lib/api';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import './AttendanceForm.css';

interface AttendanceFormProps {
  onSuccess: () => void;
}

interface AttendanceFormData {
  employee_id: string;
  date: string;
  status: 'Present' | 'Absent';
}

export default function AttendanceForm({ onSuccess }: AttendanceFormProps) {
  const [formData, setFormData] = useState<AttendanceFormData>({
    employee_id: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Present',
  });
  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (newDate: any) => {
    if (newDate) {
      // Format date as dd/mm/yyyy
      const formattedDate = newDate.format('DD/MM/YYYY');
      const isoDate = newDate.format('YYYY-MM-DD');
      setSelectedDate(newDate);
      setFormData((prev) => ({ ...prev, date: isoDate }));
    }
  };

  const shouldDisableDate = (date: dayjs.Dayjs) => {
    const today = dayjs();
    return !date.isSame(today, 'day');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.employee_id || !formData.date) {
      setError('All fields are required');
      return;
    }

    try {
      setLoading(true);
      await attendanceAPI.mark(formData);
      setSuccess('Attendance marked successfully!');
      setFormData({
        employee_id: '',
        date: new Date().toISOString().split('T')[0],
        status: 'Present',
      });
      setTimeout(onSuccess, 1000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to mark attendance',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form className="formAttendance" onSubmit={handleSubmit}>
        <h2 className="attendance-title">Mark Attendance</h2>

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
            required
          />
        </div>

        <div className="formGroup">
          <label htmlFor="date">Date</label>
          <DatePicker
            value={selectedDate}
            onChange={handleDateChange}
            shouldDisableDate={shouldDisableDate}
            format="DD/MM/YYYY"
            slotProps={{
              textField: {
                fullWidth: true,
                id: 'date',
                variant: 'filled',
                InputProps: {
                  disableUnderline: true,
                },
                sx: {
                  backgroundColor: '#f5f5f5',
                  borderRadius: '8px',
                  '& .MuiFilledInput-root': {
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px',
                  },
                  '& input': {
                    padding: '12px',
                    color: '#333',
                  },
                },
              },
            }}
          />
        </div>

        <div className="formGroup">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>

        <button
          type="submit"
          className="submitBtnAttendance"
          disabled={loading}
        >
          {loading ? 'Marking...' : 'Mark Attendance'}
        </button>
      </form>
    </LocalizationProvider>
  );
}

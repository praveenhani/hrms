'use client';

import { useState } from 'react';
import AttendanceForm from '@/components/AttendanceForm';
import AttendanceList from '@/components/AttendanceList';
import styles from './page.module.css';

export default function AttendancePage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Attendance Management</h1>
        <p>Track employee attendance</p>
      </header>

      <main className={styles.main}>
        <section className={styles.section}>
          <AttendanceForm onSuccess={handleSuccess} />
        </section>

        <section className={styles.section}>
          <AttendanceList key={refreshKey} />
        </section>
      </main>
    </div>
  );
}

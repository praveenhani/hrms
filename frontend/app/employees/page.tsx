'use client';

import { useState } from 'react';
import EmployeeForm from '@/components/EmployeeForm';
import EmployeeList from '@/components/EmployeeList';
import styles from './page.module.css';

export default function EmployeesPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Employee Management</h1>
        <p>Manage your employees effectively</p>
      </header>

      <main className={styles.main}>
        <section className={styles.section}>
          <EmployeeForm onSuccess={handleSuccess} />
        </section>

        <section className={styles.section}>
          <EmployeeList key={refreshKey} />
        </section>
      </main>
    </div>
  );
}

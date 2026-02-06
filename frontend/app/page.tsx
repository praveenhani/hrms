'use client';

import Link from 'next/link';
import './page.css';

export default function Home() {
  return (
    <div className="main-container">
      <header className="home-header">
        <div className="headerContent">
          <h1 className="home-title">HRMS</h1>
          <p className="subtitle">Human Resource Management System</p>
        </div>
      </header>

      <main className="main">
        <div className="cardsGrid">
          <Link href="/employees" className="card">
            <div className="cardContent employeeCard">
              <div className="cardIcon">👥</div>
              <h2>Employee Management</h2>
              <p>Add, view, and manage employees</p>
              <button className="cardBtn">Manage Employees</button>
            </div>
          </Link>

          <Link href="/attendance" className="card">
            <div className="cardContent attendanceCard">
              <div className="cardIcon">📋</div>
              <h2>Attendance Tracking</h2>
              <p>Track and monitor attendance</p>
              <button className="cardBtn">Track Attendance</button>
            </div>
          </Link>
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2026 HRMS. All rights reserved.</p>
      </footer>
    </div>
  );
}

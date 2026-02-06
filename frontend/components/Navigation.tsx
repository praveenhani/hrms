'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Navigation.css';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="nav">
      <div className="navContainer">
        <Link href="/" className="logo">
          HRMS
        </Link>

        <ul className="navLinks">
          <li>
            <Link
              href="/"
              className={pathname === '/' ? 'active' : ''}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/employees"
              className={pathname.startsWith('/employees') ? 'active' : ''}
            >
              Employees
            </Link>
          </li>
          <li>
            <Link
              href="/attendance"
              className={pathname.startsWith('/attendance') ? 'active' : ''}
            >
              Attendance
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

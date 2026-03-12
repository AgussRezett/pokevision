import { Outlet } from 'react-router-dom';
import Navbar from '@/components/layout/components/Navbar/Navbar';
import Footer from '@/components/layout/components/Footer/Footer';
import styles from './Layout.module.scss';

export default function Layout() {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

import type { ReactNode } from 'react';
import AppNavbar from '../Navbar';
import Footer from '../Footer';

type Props = {
    children: ReactNode;
  };

export default function Layout({children}: Props) {
  return (
    <>
      <AppNavbar />
      {children}
      <Footer />
    </>
  );
}



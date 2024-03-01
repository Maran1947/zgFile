"use client";

import { usePathname } from "next/navigation";
import Footer from "./footer/Footer";
import Navbar from "./navbar/Navbar";

export default function Layout({ children }) {
  const pathname = usePathname();
  return (
    <>
      {!["/signup", "/signin"].includes(pathname) && <Navbar />}
      <main>{children}</main>
      {!["/signup", "/signin"].includes(pathname) && <Footer />}
    </>
  );
}

import React, { ReactNode } from "react";
import Link from "next/link";
import HeaderNav from "./HeaderNav";
import Footer from "./Footer";

export default function FullWidthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="text-center font-bold text-xs w-full bg-volt py-2 hover:underline uppercase">
        <Link href="/signin">
          Welcome to Basketball Pick&apos;em Powered by TENAMINT! Play for FREE now!
        </Link>
      </div>
      <HeaderNav />
      <main className="mx-auto sm:px-6 lg:px-8">{children}</main>
      <Footer />
    </>
  );
}

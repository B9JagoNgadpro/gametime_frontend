"use client";
import { ReactNode } from 'react';
import Head from 'next/head';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <title>GameTime</title>
      </Head>
      <div className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        {children}
      </div>
    </>
  );
}

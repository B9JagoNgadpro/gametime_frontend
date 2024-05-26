// src/components/layout.tsx
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import Link from 'next/link';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const router = useRouter();
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <header className="bg-blue-600 text-white p-4">
                <Link href="/">
                    <h1 className="text-2xl font-bold">Ulasan App</h1>
                </Link>
            </header>
            <main className="p-4 flex-grow">
                {children}
            </main>
            <footer className="bg-blue-600 text-white p-4">
                <p className="text-center">&copy; 2024 Ulasan App</p>
            </footer>
        </div>
    );
};

export default Layout;


import Link from 'next/link';

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-100 p-8 dark:bg-gray-900 dark:text-white">
            <h2 className="text-4xl font-bold mb-4">Welcome to GameTime</h2>
            <p className="mb-4">Find your favorite games</p>
            <Link href="/search" className="link">
                Search Games
            </Link>
        </div>
    );
}
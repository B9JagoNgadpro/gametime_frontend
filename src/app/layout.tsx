import './globals.css';

export const metadata = {
    title: 'GameTime',
    description: 'Search and view game details',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="bg-gray-100 dark:bg-gray-900 dark:text-white">
                <header className="header">
                    <h1>GameTime</h1>
                </header>
                <main className="main">{children}</main>
                <footer className="footer">
                    <p>&copy; 2024 GameTime</p>
                </footer>
            </body>
        </html>
    );
}
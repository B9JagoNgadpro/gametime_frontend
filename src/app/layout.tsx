export const metadata = {
  title: 'GameTime',
  description: 'Find and explore games',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <h1>GameTime</h1>
        </header>
        <main className="main">{children}</main>
        <footer className="footer">
          <p>&copy; 2024 GameTime</p>
        </footer>
      </body>
    </html>
  )
}
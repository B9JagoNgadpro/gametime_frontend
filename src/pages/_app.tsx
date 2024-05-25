import '../styles/globals.css';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <header className="header">
        <h1>GameTime</h1>
      </header>
      <main className="main">
        <Component {...pageProps} />
      </main>
      <footer className="footer">
        <p>&copy; 2024 GameTime</p>
      </footer>
    </>
  );
}

export default MyApp;
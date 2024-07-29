import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <header>
        <h1>React Blog</h1>
      </header>
      <main>
        <Component {...pageProps} />
      </main>
      <footer>
        <p>© 2024 React Blog</p>
      </footer>
    </div>
  );
}

export default MyApp;

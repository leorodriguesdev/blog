// src/app/layout.js

export default function Layout({ children }) {
  return (
    <div>
      <header>
        <h1>React Blog</h1>
      </header>
      <main>{children}</main>
      <footer>
        <p>© 2024 React Blog</p>
      </footer>
    </div>
  );
}

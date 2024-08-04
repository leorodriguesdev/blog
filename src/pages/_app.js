import '../styles/globals.css';
import Link from 'next/link';
import 'prismjs/themes/prism-tomorrow.css'; // Estilo PrismJS
import Image from 'next/image'; // Importar componente Image do Next.js
import Head from 'next/head'; // Importar o componente Head
import logoBlog from '../assets/logo.webp'; // Importar a imagem do logo
import styles from '../styles/MyApp.module.css'; // Importar o novo arquivo de estilos
import { Analytics } from "@vercel/analytics/react"

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Blog</title>
        <link rel="icon" href="../assets/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/" legacyBehavior>
            <a className={styles.link}>
              <Image src={logoBlog} alt="React Blog Logo" width={60} height={60} />
              <h3 className={styles.headerTitle}>leorodrigues.dev</h3>

            </a>
          </Link>
          <h3 className={styles.headerTitle}>Blog</h3>
        </div>
      </header>
      <main className={styles.main}>
        <Component {...pageProps} />
        <Analytics />
      </main>
      <footer className={styles.footer}>
        <p>© 2024 React Blog</p>
      </footer>
    </div>
  );
}

export default MyApp;

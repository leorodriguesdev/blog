import '../styles/globals.css';
import Link from 'next/link';
import 'prismjs/themes/prism-tomorrow.css';
import Image from 'next/image';
import Head from 'next/head';
import logoBlog from '../assets/foto.jpeg';
import styles from '../styles/MyApp.module.css';
import { GrInstagram } from "react-icons/gr";
import { IoLogoLinkedin } from "react-icons/io5";
import { RxGithubLogo } from "react-icons/rx";


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
              <Image src={logoBlog} alt="React Blog Logo" className={styles.imageProfile} />
              <h1 className={styles.headerTitle}>leorodrigues.dev</h1>
            </a>
          </Link>
          <nav className={styles.nav}>
            <Link href="https://bio.link/leorodriguesdev" legacyBehavior><a>Contato</a></Link>
          </nav>
        </div>
      </header>
      <main className={styles.main}>
        <Component {...pageProps} />
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.footerText}>© 2024 Feito com ☕ + <Link href="https://reactjs.org" legacyBehavior>React</Link> & <Link href="https://nextjs.org" legacyBehavior>Next.js</Link></p>
          <div className={styles.socialIcons}>
            <Link href="https://www.instagram.com/leorodriguesdev/" legacyBehavior><a><GrInstagram size={20} /></a></Link>
            <Link href="https://github.com/leorodriguesdev" legacyBehavior><a><RxGithubLogo size={20} /></a></Link>
            <Link href="https://www.linkedin.com/in/leorodriguesdev/" legacyBehavior><a><IoLogoLinkedin size={20} /></a></Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MyApp;

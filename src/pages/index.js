import { fetchPosts } from '../lib/fetchContent';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Image from 'next/image'; // Importar o componente Image do Next.js

export default function Home({ posts }) {

  const [filter, setFilter] = useState(''); // Estado para armazenar o filtro

  // Função para atualizar o filtro com base na pasta clicada
  const handleFilterChange = (folder) => {
    setFilter(folder);
  };

  useEffect(() => {
    handleFilterChange('')
  }, []);

  const filteredPosts = filter
  ? posts.filter((post) => post.folder === filter)
  : posts; // Se nenhum filtro estiver ativo, mostra todos os posts

  function correctSpelling(text) {
    const corrections = {
      '1-o-que-e-react': 'O que é React e por que usá-lo? ⚛️',
      '2-jsx-componentes-estado-props': 'Conceitos Básicos - JSX, Componentes, Estado, e Props',
      '3-ciclo-de-vida': 'Ciclo de Vida dos Componentes',
      '1-instalando-node-npm': 'Instalando Node.js e npm',
      '1-Hooks-useState-useEffect-useContext': 'Hooks: useState, useEffect, useContext',
      '1-diferencas-react-reactnative': 'Diferenças entre React e React Native',
      '1-introducao-react': 'Introdução ao React',
      '2-configurando-ambiente-desenvolvimento': 'Configurando o Ambiente de Desenvolvimento',
      '3-conceitos-avancados-react': 'Conceitos Avançados de React',
      '4-introducao-react-native': 'Introdução ao React Native',
    };

    // Verifica se o texto corresponde a alguma chave e retorna o valor corrigido
    if (corrections.hasOwnProperty(text)) {
      return corrections[text];
    }

    // Se não houver correspondência, retorna o texto original
    return text;
  }


  // 1-introducao-react
  // 2-configurando-ambiente-desenvolvimento
  // 3-conceitos-avancados-react
  // 4-introducao-react-native


  // 1-introducao-react
  // 2-configurando-ambiente-desenvolvimento
  // 3-conceitos-avancados-react
  // 4-introducao-react-native

  return (
    <>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <h1 className={styles.post}>Tópicos➡️</h1>
          <nav className={styles.nav}>
            <button className={styles.sidebarItem} onClick={() => handleFilterChange('')}>
              🔹Todos
            </button>
            <button className={styles.sidebarItem} onClick={() => handleFilterChange('1-introducao-react')}>
              🔹Introdução ao React
            </button>
            <button className={styles.sidebarItem} onClick={() => handleFilterChange('2-configurando-ambiente-desenvolvimento')}>
            🔹Configurando o Ambiente de Desenvolvimento
            </button>
            <button className={styles.sidebarItem} onClick={() => handleFilterChange('3-conceitos-avancados-react')}>
            🔹Conceitos Avançados de React
            </button>
            <button className={styles.sidebarItem} onClick={() => handleFilterChange('4-introducao-react-native')}>
            🔹Introdução ao React Native
            </button>
          </nav>
        </div>
        <ul className={styles.list}>
          {filteredPosts.map((post) => (
            <li key={post.id} className={styles.listItem}>
              <Link href={`/posts/${post.id}`} legacyBehavior>
                <a>
                  <Image
                    src={`https://raw.githubusercontent.com/leorodriguesdev/artigos-react-react-native/main/images/${post.id}.webp`}
                    alt={post.title || post.id}
                    width={300}
                    height={180}
                    className={styles.postImage}
                  />
                  <p className={styles.postName}>
                    {correctSpelling(post.title) || correctSpelling(post.id)}
                  </p>
                  <p className={styles.folderName}>
                    {correctSpelling(post.folder)}
                  </p>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const posts = await fetchPosts();
  return {
    props: {
      posts,
    },
  };
}

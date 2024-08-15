import { fetchPosts } from '../lib/fetchContent';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Image from 'next/image'; // Importar o componente Image do Next.js

export default function Home({ posts }) {

  function formatString(input) {
    if (!input) return ''; // Retorna uma string vazia se input estiver indefinido

    // Substitui traços por espaços
    let result = input.replace(/-/g, ' ').replace(/\d/g, '');

    // Ajusta a ortografia para deixar as iniciais das palavras maiúsculas
    result = result.replace(/\w\S*/g, function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });

    // Corrige palavras específicas
    result = correctSpelling(result);

    return result;
  }

  function correctSpelling(text) {
    const corrections = {
      'Reativo': 'Reativo',
      'Introducao': 'Introdução',
      'Integracao': 'Integração',
      'Componente': 'Componente',
      'Estado': 'Estado',
      'Props': 'Props',
      'E': 'é',
      'Reactnative': 'para o React native',
      'Diferencas': 'Diferenças',
      'Useeffect': ', useEffect',
      'Usecontext': ', useContext',
      'Usestate': 'useState',
      // Adicione mais correções conforme necessário
    };

    return text.split(' ').map(word => corrections[word] || word).join(' ');
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.post}>Posts</h1>
      <ul className={styles.list}>
        {posts.map((post) => (
          <li key={post.id} className={styles.listItem}>
            <Link href={`/posts/${post.id}`} legacyBehavior>
              <a>
                {/* Renderizando a imagem junto com o link */}
                <Image
                  src={`https://raw.githubusercontent.com/leorodriguesdev/artigos-react-react-native/main/images/${post.id}.webp`}
                  alt={post.title || post.id}
                  width={300} // Definir a largura desejada
                  height={180} // Definir a altura desejada
                  className={styles.postImage}
                />
                <p className={styles.postName}>{formatString(post.title) || formatString(post.id)}</p>
                <p className={styles.folderName}>{formatString(post.folder)}</p> {/* Renderizando o nome da pasta */}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
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

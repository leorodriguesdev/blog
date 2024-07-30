import { fetchPosts } from '../../lib/fetchContent';
import styles from '../../styles/Post.module.css';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // Adicione o tema PrismJS aqui

const CodeBlock = dynamic(() => import('../../components/CodeBlock'), { ssr: false });

export default function Post({ post }) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.postTitle}>{post.title}</h1>
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </div>
  );
}

export async function getStaticPaths() {
  const posts = await fetchPosts();
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const posts = await fetchPosts();
  const post = posts.find((post) => post.id === params.id);
  return {
    props: {
      post,
    },
  };
}

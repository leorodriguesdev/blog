import { fetchPosts } from '../lib/fetchContent';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <h1>Blog Posts</h1>
      <ul className={styles.list}>
        {posts.map((post) => (
          <li key={post.id} className={styles.listItem}>
            <Link href={`/posts/${post.id}`} legacyBehavior>
              <a>{post.title || post.id}</a>
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

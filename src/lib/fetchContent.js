import fetch from 'node-fetch';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const GITHUB_REPO = 'leorodriguesdev/artigos-react-react-native';
const BASE_URL = `https://api.github.com/repos/${GITHUB_REPO}/contents`;
const TOKEN = process.env.GITHUB_TOKEN; // Adicione seu token aqui diretamente ou configure uma variável de ambiente

async function fetchMarkdownFiles(path = '') {
  const res = await fetch(`${BASE_URL}/${path}`, {
    headers: {
      Authorization: `token ${TOKEN}`,
    },
  });
  const files = await res.json();
  
  return files.filter(file => file.name.endsWith('.md'));
}

export async function fetchPosts() {
  const res = await fetch(BASE_URL, {
    headers: {
      Authorization: `token ${TOKEN}`,
    },
  });
  const folderList = await res.json();

  const allPosts = [];

  for (const folder of folderList) {
    if (folder.type === 'dir') {
      const posts = await fetchMarkdownFiles(folder.path);
      for (const post of posts) {
        const postRes = await fetch(post.download_url);
        const markdown = await postRes.text();
        const { data, content } = matter(markdown);

        const processedContent = await remark().use(html).process(content);
        let contentHtml = processedContent.toString();

        // Adiciona a classe "image" a todas as tags <img>
        contentHtml = contentHtml.replace(/<img /g, '<img style="max-width: 100%; height: auto;" ');

        allPosts.push({
          id: post.name.replace(/\.md$/, ''),
          folder: folder.name, // Adiciona o nome da pasta
          contentHtml,
          ...data,
        });
      }
    }
  }

  return allPosts;
}

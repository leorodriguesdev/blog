import fetch from 'node-fetch';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import prism from 'remark-prism';
import gfm from 'remark-gfm';
import externalLinks from 'remark-external-links';

const GITHUB_REPO = 'leorodriguesdev/artigos-react-react-native';
const BASE_URL = `https://api.github.com/repos/${GITHUB_REPO}/contents`;
const TOKEN = process.env.GITHUB_TOKEN;

if (!TOKEN) {
  console.error('GITHUB_TOKEN is not set');
}

async function fetchMarkdownFiles(path = '') {
  try {
    console.log(`Fetching Markdown files from path: ${path}`);
    const res = await fetch(`${BASE_URL}/${path}`, {
      headers: {
        Authorization: `token ${TOKEN}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch markdown files: ${res.status} ${res.statusText}`);
    }

    const files = await res.json();
    console.log(`Fetched files: ${JSON.stringify(files)}`);

    if (!Array.isArray(files)) {
      throw new Error('Expected files to be an array');
    }

    return files.filter(file => file.name.endsWith('.md'));
  } catch (error) {
    console.error(`Error in fetchMarkdownFiles: ${error.message}`);
    return [];
  }
}

export async function fetchPosts() {
  try {
    console.log('Fetching folder list');
    const res = await fetch(BASE_URL, {
      headers: {
        Authorization: `token ${TOKEN}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch folder list: ${res.status} ${res.statusText}`);
    }

    const folderList = await res.json();
    console.log(`Fetched folder list: ${JSON.stringify(folderList)}`);

    if (!Array.isArray(folderList)) {
      throw new Error('Expected folder list to be an array');
    }

    const allPosts = [];

    for (const folder of folderList) {
      if (folder.type === 'dir') {
        const posts = await fetchMarkdownFiles(folder.path);
        for (const post of posts) {
          const postRes = await fetch(post.download_url);

          if (!postRes.ok) {
            throw new Error(`Failed to fetch post content: ${postRes.status} ${postRes.statusText}`);
          }

          const markdown = await postRes.text();
          const { data, content } = matter(markdown);

          const processedContent = await remark()
            .use(html, { sanitize: false })
            .use(gfm)
            .use(prism)
            .use(externalLinks, { target: '_blank', rel: ['nofollow'] })
            .process(content);

          let contentHtml = processedContent.toString();

          // Adiciona a classe "image" a todas as tags <img>
          contentHtml = contentHtml.replace(/<img /g, '<img style="max-width: 100%; height: auto;" ');

          allPosts.push({
            id: post.name.replace(/\.md$/, ''),
            folder: folder.name, // Adiciona o nome da pasta
            contentHtml,
            ...data,
          });

          console.log(`Processed post: ${JSON.stringify(allPosts[allPosts.length - 1])}`);
        }
      }
    }

    console.log(`All posts: ${JSON.stringify(allPosts)}`);
    return allPosts;
  } catch (error) {
    console.error(`Error in fetchPosts: ${error.message}`);
    return [];
  }
}

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import rehypeVideo from 'rehype-video';
import { remarkExtendedTable, extendedTableHandlers } from 'remark-extended-table';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkSlug from 'remark-slug';
import { unified } from 'unified';

const postsDirectory = path.join(process.cwd(), 'posts');
type PostData = { [key: string]: string };

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData: PostData[] = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });

  return allPostsData.sort((a, b) => {
    if (a.createdDate < b.createdDate) {
      return 1;
    } else if (a.createdDate > b.createdDate) {
      return -1;
    } else {
      return 0;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkSlug)
    .use(remarkGfm)
    .use(remarkExtendedTable)
    .use(remarkRehype)
    .use(rehypeCodeTitles)
    .use(rehypeVideo, { details: false })
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  const data: PostData = {
    id,
    contentHtml,
    ...matterResult.data,
  };

  return data;
}

import { glob } from 'fast-glob';

export const getPosts = async () => {
  const fileNames = await glob('**/*.mdx', { cwd: 'app' });
  const promises = fileNames.map(async (fileName) => {
    const { metadata } = await import(`/app/${fileName}`);
    return { url: '/' + fileName.replace(/(^|\/)page\.mdx$/, ''), ...metadata };
  });

  return await Promise.all(promises);
};
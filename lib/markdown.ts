import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';

const postsDirectory = path.join(process.cwd(), '.');

export interface PostMetadata {
  slug: string[];
  title: string;
  content: string;
  path: string;
  lastModified?: Date;
}

export function getAllPosts(): PostMetadata[] {
  const posts: PostMetadata[] = [];
  
  function traverseDirectory(dir: string, basePath: string[] = []): void {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      // Skip node_modules, .next, and other build directories
      if (entry.name.startsWith('.') || 
          entry.name === 'node_modules' || 
          entry.name === '.next' ||
          entry.name === 'out' ||
          entry.name === 'app' ||
          entry.name === 'lib' ||
          entry.name === 'components' ||
          entry.name === 'public') {
        continue;
      }
      
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        traverseDirectory(fullPath, [...basePath, entry.name]);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        
        const relativePath = path.relative(postsDirectory, fullPath);
        // Handle index.md files - they should map to the directory path
        const fileName = entry.name.replace(/\.md$/, '');
        const slug = fileName === 'index' 
          ? basePath.length > 0 ? basePath : ['index']
          : [...basePath, fileName];
        
        const stats = fs.statSync(fullPath);
        
        posts.push({
          slug,
          title: data.title || fileName,
          content,
          path: relativePath,
          lastModified: stats.mtime,
        });
      }
    }
  }
  
  traverseDirectory(postsDirectory);
  return posts.sort((a, b) => {
    // Sort by path for consistent ordering
    return a.path.localeCompare(b.path);
  });
}

export function getPostBySlug(slug: string[]): PostMetadata | null {
  const allPosts = getAllPosts();
  return allPosts.find(post => 
    post.slug.join('/') === slug.join('/')
  ) || null;
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const processor = remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeHighlight)
    .use(rehypeSanitize)
    .use(rehypeStringify);
  
  const result = await processor.process(markdown);
  return String(result);
}

export function getDirectoryStructure(): DirectoryNode {
  const root: DirectoryNode = {
    name: 'root',
    type: 'directory',
    children: [],
    files: [],
    path: [],
  };
  
  function buildTree(dir: string, parentPath: string[] = []): DirectoryNode {
    const node: DirectoryNode = {
      name: path.basename(dir) || 'root',
      type: 'directory',
      children: [],
      files: [],
      path: parentPath,
    };
    
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        // Skip hidden files and build directories
        if (entry.name.startsWith('.') || 
            entry.name === 'node_modules' || 
            entry.name === '.next' ||
            entry.name === 'out' ||
            entry.name === 'app' ||
            entry.name === 'lib' ||
            entry.name === 'components' ||
            entry.name === 'public') {
          continue;
        }
        
        const fullPath = path.join(dir, entry.name);
        const currentPath = [...parentPath, entry.name];
        
        if (entry.isDirectory()) {
          const childNode = buildTree(fullPath, currentPath);
          if (childNode.children.length > 0 || childNode.files.length > 0) {
            node.children.push(childNode);
          }
        } else if (entry.isFile() && entry.name.endsWith('.md')) {
          node.files.push({
            name: entry.name.replace(/\.md$/, ''),
            type: 'file',
            path: currentPath,
          });
        }
      }
    } catch (error) {
      // Directory might not exist or be inaccessible
      console.error(`Error reading directory ${dir}:`, error);
    }
    
    return node;
  }
  
  const tree = buildTree(postsDirectory);
  return tree;
}

export interface DirectoryNode {
  name: string;
  type: 'directory' | 'file';
  children: DirectoryNode[];
  files: FileNode[];
  path: string[];
}

export interface FileNode {
  name: string;
  type: 'file';
  path: string[];
}


import { notFound } from 'next/navigation'
import { getPostBySlug, markdownToHtml, getAllPosts } from '@/lib/markdown'
import MarkdownContent from '@/components/MarkdownContent'

interface PageProps {
  params: Promise<{
    slug: string | string[]
  }>
}

export default async function PostPage({ params }: PageProps) {
  const resolvedParams = await params
  const slugArray = Array.isArray(resolvedParams.slug) 
    ? resolvedParams.slug 
    : resolvedParams.slug.split('/').filter(Boolean)
  
  const post = getPostBySlug(slugArray)
  
  if (!post) {
    notFound()
  }

  const htmlContent = await markdownToHtml(post.content)

  return (
    <article className="prose prose-slate dark:prose-invert max-w-none">
      <header className="mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span>Path: {post.path}</span>
          {post.lastModified && (
            <span>Updated: {new Date(post.lastModified).toLocaleDateString()}</span>
          )}
        </div>
      </header>
      <MarkdownContent content={htmlContent} />
    </article>
  )
}

export function generateStaticParams() {
  const posts = getAllPosts()
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}


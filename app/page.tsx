import Link from 'next/link'
import { getAllPosts } from '@/lib/markdown'

export default function Home() {
  const posts = getAllPosts()
  
  // Group posts by top-level directory
  const groupedPosts = posts.reduce((acc, post) => {
    const category = post.slug[0] || 'Other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(post)
    return acc
  }, {} as Record<string, typeof posts>)

  return (
    <div className="space-y-8">
      <div className="text-center py-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Web Development Knowledge Base
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Your comprehensive guide to web development
        </p>
      </div>

      <div className="grid gap-6">
        {Object.entries(groupedPosts).map(([category, categoryPosts]) => (
          <div key={category} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              {category}
            </h2>
            <div className="space-y-2">
              {categoryPosts.slice(0, 10).map((post) => (
                <Link
                  key={post.path}
                  href={`/${post.slug.join('/')}`}
                  className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900 dark:text-gray-100 font-medium">
                      {post.title}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {post.slug.join(' / ')}
                    </span>
                  </div>
                </Link>
              ))}
              {categoryPosts.length > 10 && (
                <p className="text-sm text-gray-500 dark:text-gray-400 pt-2">
                  +{categoryPosts.length - 10} more articles
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center py-8 text-gray-600 dark:text-gray-400">
        <p>Total articles: {posts.length}</p>
      </div>
    </div>
  )
}


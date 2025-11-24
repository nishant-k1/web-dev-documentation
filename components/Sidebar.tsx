'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getAllPosts, PostMetadata } from '@/lib/markdown'

export default function Sidebar() {
  const [posts, setPosts] = useState<PostMetadata[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Load posts on client side
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(() => {
        setPosts([])
      })
  }, [])
  
  // Build tree structure from posts
  const buildTree = () => {
    const tree: Record<string, any> = {}
    
    posts.forEach(post => {
      let current = tree
      post.slug.forEach((segment, index) => {
        if (index === post.slug.length - 1) {
          // Last segment is the file
          if (!current._files) current._files = []
          current._files.push(post)
        } else {
          // Directory segment
          if (!current[segment]) {
            current[segment] = {}
          }
          current = current[segment]
        }
      })
    })
    
    return tree
  }
  
  const renderTree = (node: any, level: number = 0, path: string[] = []): JSX.Element[] => {
    const elements: JSX.Element[] = []
    const indent = level * 16
    
    // Render files first
    if (node._files) {
      node._files.forEach((post: PostMetadata) => {
        const filePath = `/${post.slug.join('/')}`
        const isActive = pathname === filePath
        
        elements.push(
          <Link
            key={filePath}
            href={filePath}
            className={`block text-sm py-1.5 px-2 rounded-md transition-colors ${
              isActive
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 font-medium'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            style={{ paddingLeft: `${indent + 24}px` }}
          >
            {post.title}
          </Link>
        )
      })
    }
    
    // Then render directories
    Object.keys(node).forEach(key => {
      if (key !== '_files') {
        elements.push(
          <div key={key}>
            <div 
              className="text-sm font-semibold text-gray-700 dark:text-gray-300 py-1 px-2 mt-2"
              style={{ paddingLeft: `${indent + 8}px` }}
            >
              {key}
            </div>
            {renderTree(node[key], level + 1, [...path, key])}
          </div>
        )
      }
    })
    
    return elements
  }
  
  const tree = buildTree()
  const treeElements = renderTree(tree)

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-md shadow-lg"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 overflow-y-auto`}
      >
        <div className="p-4 pt-16 lg:pt-4">
          <Link href="/" className="block mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Web Dev Blog
            </h2>
          </Link>
          
          <nav className="space-y-1">
            {posts.length > 0 ? (
              <>{treeElements}</>
            ) : (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Loading...
              </div>
            )}
          </nav>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}


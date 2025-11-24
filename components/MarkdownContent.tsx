'use client'

import { useEffect } from 'react'

interface MarkdownContentProps {
  content: string
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  useEffect(() => {
    // Load highlight.js styles if not already loaded
    if (!document.querySelector('link[href*="highlight"]')) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css'
      document.head.appendChild(link)
    }
  }, [])

  return (
    <div
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}


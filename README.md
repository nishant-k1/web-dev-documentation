# Web Dev Knowledge Base Blog

A modern, automatically updating blog built with Next.js that converts your markdown knowledge base into a beautiful website.

## Features

- 📝 **Automatic Markdown Processing** - All `.md` files are automatically converted to blog posts
- 🎨 **Modern UI** - Clean, responsive design with dark mode support
- 🔍 **Navigation** - Sidebar with directory structure for easy browsing
- 🚀 **Auto-Deploy** - Automatically updates when you push to GitHub (via Vercel)
- 💻 **Syntax Highlighting** - Code blocks with syntax highlighting
- 📱 **Mobile Responsive** - Works great on all devices

## Getting Started

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel will automatically detect Next.js and configure everything
5. Every push to your main branch will automatically deploy!

### Manual Deployment

You can also deploy to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Your own server

## Project Structure

```
.
├── app/                    # Next.js app directory
│   ├── [...slug]/         # Dynamic routes for blog posts
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── Sidebar.tsx        # Navigation sidebar
│   └── MarkdownContent.tsx # Markdown renderer
├── lib/                   # Utilities
│   └── markdown.ts        # Markdown processing
└── [your markdown files]  # Your content
```

## How It Works

1. The `lib/markdown.ts` file scans your directory for all `.md` files
2. Each markdown file becomes a blog post with a URL based on its path
3. The sidebar component displays your directory structure
4. Markdown is processed with syntax highlighting and converted to HTML
5. Pages are generated statically for fast loading

## Customization

- **Styling**: Edit `app/globals.css` and `tailwind.config.js`
- **Layout**: Modify `app/layout.tsx`
- **Homepage**: Edit `app/page.tsx`
- **Markdown Processing**: Customize `lib/markdown.ts`

## Notes

- Files starting with `.` or in `node_modules`, `.next`, etc. are ignored
- The sidebar loads dynamically to show your directory structure
- All markdown files are processed, including nested directories


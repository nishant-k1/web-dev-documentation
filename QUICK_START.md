# Quick Start Guide

Get your blog up and running in 5 minutes!

## 1. Install Dependencies

```bash
npm install
```

## 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your blog!

## 3. How It Works

- **All `.md` files** in your directory structure automatically become blog posts
- **URLs are generated** based on file paths (e.g., `folder/file.md` → `/folder/file`)
- **Sidebar navigation** shows your directory structure
- **Syntax highlighting** is automatically applied to code blocks

## 4. Test It Out

1. Create a new markdown file anywhere in your project:
   ```bash
   echo "# My First Post\n\nThis is awesome!" > test-post.md
   ```

2. Refresh your browser - the new post should appear!

3. Click on it to see it rendered

## 5. Deploy to Vercel

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

**TL;DR:**
1. Push to GitHub
2. Import to Vercel
3. Done! Auto-deploys on every push 🚀

## File Structure

```
your-project/
├── app/              # Next.js app (don't modify unless customizing)
├── components/       # React components (don't modify unless customizing)
├── lib/              # Utilities (don't modify unless customizing)
├── [your content]/   # Your markdown files go here!
└── package.json      # Dependencies
```

## Customization

- **Styling**: Edit `app/globals.css`
- **Homepage**: Edit `app/page.tsx`
- **Layout**: Edit `app/layout.tsx`
- **Colors**: Edit `tailwind.config.js`

## Tips

- Use `index.md` in folders to create directory landing pages
- Code blocks automatically get syntax highlighting
- Images in markdown work with relative paths
- Frontmatter in markdown files is supported (YAML format)

Example frontmatter:
```markdown
---
title: My Awesome Post
date: 2024-01-01
---

# Content here
```

---

**Ready to deploy?** Check out [DEPLOYMENT.md](./DEPLOYMENT.md)!


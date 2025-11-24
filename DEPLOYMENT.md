# Deployment Guide

This guide will help you deploy your blog to Vercel so it automatically updates whenever you push changes to GitHub.

## Step 1: Push to GitHub

1. If you haven't already, initialize a git repository:
```bash
git init
git add .
git commit -m "Initial commit: Next.js blog setup"
```

2. Create a new repository on GitHub (if you don't have one)

3. Push your code:
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: Via Vercel Website (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account

2. Click "Add New Project"

3. Import your GitHub repository

4. Vercel will automatically detect Next.js and configure:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

5. Click "Deploy"

6. Wait for the build to complete (usually 1-2 minutes)

7. Your site will be live at `https://your-project-name.vercel.app`

### Option B: Via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Run deployment:
```bash
vercel
```

3. Follow the prompts to link your project

## Step 3: Automatic Deployments

Once deployed, Vercel will automatically:
- ✅ Deploy every push to your main branch
- ✅ Create preview deployments for pull requests
- ✅ Rebuild when you update dependencies

## Step 4: Custom Domain (Optional)

1. Go to your project settings on Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Troubleshooting

### Build Fails

If your build fails, check:
- All dependencies are in `package.json`
- Node version compatibility (Vercel uses Node 18+ by default)
- Check build logs in Vercel dashboard

### Markdown Files Not Showing

- Ensure `.md` files are in the repository (not in `.gitignore`)
- Check that file paths don't contain special characters
- Verify the markdown processing in build logs

### Images Not Loading

- Ensure image files are committed to git
- Use relative paths in markdown: `![alt](./path/to/image.png)`
- For images in subdirectories, paths are relative to the markdown file

## Environment Variables

If you need environment variables:
1. Go to Project Settings → Environment Variables
2. Add your variables
3. Redeploy

## Performance Tips

- Vercel automatically optimizes Next.js builds
- Static pages are pre-rendered for fast loading
- Images are optimized automatically with Next.js Image component

## Monitoring

- Check deployment status in Vercel dashboard
- View analytics and performance metrics
- Monitor build logs for errors

---

**That's it!** Your blog will now automatically update every time you push changes to GitHub. 🚀


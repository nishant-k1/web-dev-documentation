# Git Basics

Core Git concepts and essential commands for daily use. Understanding the fundamentals of version control.

---

## What is Git?

**Git** is a distributed version control system that tracks changes in your code. It allows you to:

- ✅ Track changes to files over time
- ✅ Collaborate with others
- ✅ Revert to previous versions
- ✅ Work on different features simultaneously
- ✅ Merge code from multiple developers

---

## Key Concepts

### Repository (Repo)

A **repository** is a directory that contains your project files and Git's history.

```bash
# Initialize a new repository
git init

# Clone an existing repository
git clone https://github.com/user/repo.git
```

### Working Directory

The **working directory** is your project folder where you make changes to files.

### Staging Area (Index)

The **staging area** is where you prepare changes before committing them.

```bash
# Add file to staging area
git add filename.js

# Add all files
git add .

# Add specific file types
git add *.js
```

### Commit

A **commit** is a snapshot of your code at a specific point in time.

```bash
# Create a commit
git commit -m "Add user authentication"

# Commit with description
git commit -m "Add user authentication" -m "Implemented login and logout functionality"
```

---

## Essential Commands

### 1. Check Status

```bash
# See what files have changed
git status

# Short status
git status -s
```

**Output:**

```text
On branch main
Changes not staged for commit:
  modified:   src/App.js
  modified:   src/components/Button.js

Untracked files:
  src/components/Modal.js
```

### 2. View Changes

```bash
# See changes in working directory
git diff

# See staged changes
git diff --staged

# See changes for specific file
git diff src/App.js
```

### 3. Add Files

```bash
# Add specific file
git add src/App.js

# Add all files
git add .

# Add all files in directory
git add src/

# Add files matching pattern
git add *.js
```

### 4. Commit Changes

```bash
# Commit with message
git commit -m "Fix button styling"

# Commit all tracked files (skip staging)
git commit -am "Update components"

# Commit with detailed message
git commit -m "Fix button styling" -m "Changed button color and padding"
```

### 5. View History

```bash
# View commit history
git log

# One-line format
git log --oneline

# Graph view
git log --oneline --graph

# Last 5 commits
git log -5

# With file changes
git log --stat
```

**Output:**

```text
commit abc123 (HEAD -> main)
Author: Your Name <email@example.com>
Date:   Mon Jan 15 10:30:00 2024

    Fix button styling

commit def456
Author: Your Name <email@example.com>
Date:   Mon Jan 14 09:15:00 2024

    Add user authentication
```

---

## Undoing Changes

### 1. Unstage Files

```bash
# Unstage specific file
git reset HEAD filename.js

# Unstage all files
git reset HEAD
```

### 2. Discard Changes

```bash
# Discard changes in working directory
git checkout -- filename.js

# Discard all changes
git checkout -- .

# Modern way (Git 2.23+)
git restore filename.js
git restore .
```

### 3. Amend Last Commit

```bash
# Change last commit message
git commit --amend -m "New message"

# Add files to last commit
git add forgotten-file.js
git commit --amend --no-edit
```

### 4. Revert Commit

```bash
# Create new commit that undoes changes
git revert abc123

# Revert last commit
git revert HEAD
```

---

## Remote Repositories

### Add Remote

```bash
# Add remote repository
git remote add origin https://github.com/user/repo.git

# View remotes
git remote -v
```

### Push to Remote

```bash
# Push to remote
git push origin main

# Push and set upstream
git push -u origin main

# Push all branches
git push --all origin
```

### Pull from Remote

```bash
# Pull latest changes
git pull origin main

# Fetch without merging
git fetch origin

# Merge fetched changes
git merge origin/main
```

---

## Common Workflows

### Daily Workflow

```bash
# 1. Check status
git status

# 2. Add changes
git add .

# 3. Commit
git commit -m "Your message"

# 4. Pull latest changes
git pull origin main

# 5. Push your changes
git push origin main
```

### First Time Setup

```bash
# 1. Configure Git
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 2. Initialize repository
git init

# 3. Add remote
git remote add origin https://github.com/user/repo.git

# 4. Add and commit files
git add .
git commit -m "Initial commit"

# 5. Push to remote
git push -u origin main
```

---

## Configuration

### Global Configuration

```bash
# Set user name
git config --global user.name "Your Name"

# Set user email
git config --global user.email "your.email@example.com"

# Set default branch name
git config --global init.defaultBranch main

# Set default editor
git config --global core.editor "code --wait"

# View all config
git config --list
```

### Repository-Specific Configuration

```bash
# Set config for current repo only
git config user.name "Project Name"
git config user.email "project@example.com"
```

---

## File States

Git tracks files in three states:

1. **Modified** - File changed but not staged
2. **Staged** - File added to staging area
3. **Committed** - File saved in repository

```text
Working Directory → Staging Area → Repository
   (Modified)    →   (Staged)   →  (Committed)
```

---

## .gitignore

Create a `.gitignore` file to exclude files from Git:

```bash
# .gitignore

# Dependencies
node_modules/
package-lock.json

# Build outputs
dist/
build/
.next/

# Environment variables
.env
.env.local

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
```

---

## Quick Reference

| Command               | Description           |
| --------------------- | --------------------- |
| `git init`            | Initialize repository |
| `git clone <url>`     | Clone repository      |
| `git status`          | Check status          |
| `git add <file>`      | Stage file            |
| `git commit -m "msg"` | Commit changes        |
| `git log`             | View history          |
| `git push`            | Push to remote        |
| `git pull`            | Pull from remote      |
| `git diff`            | View changes          |

---

## Key Takeaways

1. ✅ **Git tracks changes** in your code over time
2. ✅ **Three areas**: Working directory, staging area, repository
3. ✅ **Commit often** with clear messages
4. ✅ **Use .gitignore** to exclude files
5. ✅ **Pull before push** to avoid conflicts

---

## Related Topics

- [Branching & Merging](./2.%20Branching%20%26%20Merging.md) - Working with branches
- [Git Commands Reference](./5.%20Git%20Commands%20Reference.md) - Complete command list
- [Git Best Practices](./6.%20Git%20Best%20Practices.md) - Best practices

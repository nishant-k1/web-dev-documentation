# Git Commands Reference

Quick reference guide for all Git commands. Essential commands for daily use.

---

## Repository Commands

### Initialize Repository

```bash
# Initialize new repository
git init

# Initialize with branch name
git init -b main

# Clone existing repository
git clone https://github.com/user/repo.git

# Clone specific branch
git clone -b branch-name https://github.com/user/repo.git

# Clone shallow (faster)
git clone --depth 1 https://github.com/user/repo.git
```

### Repository Information

```bash
# Show repository info
git remote -v

# Show repository URL
git config --get remote.origin.url

# Show all config
git config --list
```

---

## Status & Log Commands

### Check Status

```bash
# Detailed status
git status

# Short status
git status -s

# Show ignored files
git status --ignored
```

### View History

```bash
# Full log
git log

# One line per commit
git log --oneline

# Graph view
git log --oneline --graph

# Last N commits
git log -5

# With file changes
git log --stat

# With patch
git log -p

# Filter by author
git log --author="Name"

# Filter by date
git log --since="2024-01-01"

# Search in messages
git log --grep="keyword"
```

### View Changes

```bash
# Working directory changes
git diff

# Staged changes
git diff --staged
git diff --cached

# Specific file
git diff filename.js

# Between commits
git diff abc123 def456

# Between branches
git diff main..feature-branch

# File names only
git diff --name-only
```

---

## Staging Commands

### Add Files

```bash
# Add specific file
git add filename.js

# Add all files
git add .

# Add all in directory
git add src/

# Add by pattern
git add *.js
git add src/**/*.js

# Interactive add
git add -i

# Patch mode (select hunks)
git add -p
```

### Unstage Files

```bash
# Unstage specific file
git reset HEAD filename.js
git restore --staged filename.js

# Unstage all
git reset HEAD
git restore --staged .
```

---

## Commit Commands

### Create Commit

```bash
# Commit with message
git commit -m "Message"

# Commit with description
git commit -m "Title" -m "Description"

# Commit all tracked files (skip staging)
git commit -am "Message"

# Open editor for message
git commit

# Amend last commit
git commit --amend

# Amend without changing message
git commit --amend --no-edit
```

### View Commits

```bash
# Show commit
git show abc123

# Show last commit
git show HEAD

# Show file at commit
git show abc123:filename.js
```

---

## Branch Commands

### List Branches

```bash
# Local branches
git branch

# All branches
git branch -a

# Remote branches
git branch -r

# With last commit
git branch -v

# Merged branches
git branch --merged

# Not merged branches
git branch --no-merged
```

### Create Branch

```bash
# Create branch
git branch branch-name

# Create and switch
git checkout -b branch-name
git switch -c branch-name

# From specific commit
git branch branch-name abc123

# From remote branch
git branch branch-name origin/remote-branch
```

### Switch Branch

```bash
# Switch to branch
git checkout branch-name
git switch branch-name

# Switch to previous branch
git switch -

# Create and switch
git checkout -b branch-name
git switch -c branch-name
```

### Delete Branch

```bash
# Delete local branch
git branch -d branch-name

# Force delete
git branch -D branch-name

# Delete remote branch
git push origin --delete branch-name
git push origin :branch-name
```

### Rename Branch

```bash
# Rename current branch
git branch -m new-name

# Rename other branch
git branch -m old-name new-name
```

---

## Merge Commands

### Merge

```bash
# Merge branch
git merge branch-name

# No fast-forward (always create merge commit)
git merge --no-ff branch-name

# Fast-forward only
git merge --ff-only branch-name

# Squash merge
git merge --squash branch-name

# Abort merge
git merge --abort
```

### Rebase

```bash
# Rebase onto branch
git rebase main

# Interactive rebase
git rebase -i HEAD~3

# Continue rebase
git rebase --continue

# Abort rebase
git rebase --abort

# Skip commit
git rebase --skip
```

---

## Remote Commands

### Add Remote

```bash
# Add remote
git remote add origin https://github.com/user/repo.git

# Add with name
git remote add upstream https://github.com/original/repo.git

# Show remotes
git remote -v

# Show remote URL
git remote get-url origin

# Set remote URL
git remote set-url origin https://new-url.git
```

### Fetch & Pull

```bash
# Fetch from remote
git fetch origin

# Fetch all remotes
git fetch --all

# Fetch specific branch
git fetch origin branch-name

# Pull (fetch + merge)
git pull origin main

# Pull with rebase
git pull --rebase origin main
```

### Push

```bash
# Push to remote
git push origin main

# Push and set upstream
git push -u origin main

# Push all branches
git push --all origin

# Push tags
git push origin --tags

# Force push (dangerous!)
git push --force origin main

# Force push with lease (safer)
git push --force-with-lease origin main
```

---

## Undo Commands

### Undo Changes

```bash
# Discard working directory changes
git checkout -- filename.js
git restore filename.js

# Discard all changes
git checkout -- .
git restore .

# Unstage file
git reset HEAD filename.js
git restore --staged filename.js
```

### Undo Commits

```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (unstage changes)
git reset --mixed HEAD~1
git reset HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Revert commit (create new commit)
git revert abc123

# Revert last commit
git revert HEAD
```

---

## Tag Commands

### Create Tags

```bash
# Lightweight tag
git tag v1.0.0

# Annotated tag
git tag -a v1.0.0 -m "Release v1.0.0"

# Tag specific commit
git tag v1.0.0 abc123
```

### List Tags

```bash
# List tags
git tag

# List with messages
git tag -n

# Search tags
git tag -l "v1.*"
```

### Delete Tags

```bash
# Delete local tag
git tag -d v1.0.0

# Delete remote tag
git push origin --delete v1.0.0
git push origin :refs/tags/v1.0.0
```

---

## Stash Commands

### Stash Changes

```bash
# Stash changes
git stash

# Stash with message
git stash save "Work in progress"

# Stash including untracked files
git stash -u

# Stash including ignored files
git stash -a
```

### List & Apply Stash

```bash
# List stashes
git stash list

# Apply stash (keep stash)
git stash apply

# Apply specific stash
git stash apply stash@{0}

# Pop stash (remove stash)
git stash pop

# Drop stash
git stash drop stash@{0}

# Clear all stashes
git stash clear
```

---

## Advanced Commands

### Cherry-Pick

```bash
# Apply commit to current branch
git cherry-pick abc123

# Cherry-pick range
git cherry-pick abc123..def456

# Cherry-pick without commit
git cherry-pick -n abc123
```

### Submodule

```bash
# Add submodule
git submodule add https://github.com/user/repo.git path

# Initialize submodules
git submodule init

# Update submodules
git submodule update

# Clone with submodules
git clone --recursive https://github.com/user/repo.git
```

### Clean

```bash
# Show what would be removed
git clean -n

# Remove untracked files
git clean -f

# Remove untracked directories
git clean -fd

# Interactive clean
git clean -i
```

---

## Quick Reference Table

| Category | Command | Description |
|----------|---------|-------------|
| **Init** | `git init` | Initialize repository |
| **Clone** | `git clone <url>` | Clone repository |
| **Status** | `git status` | Check status |
| **Add** | `git add <file>` | Stage file |
| **Commit** | `git commit -m "msg"` | Commit changes |
| **Log** | `git log` | View history |
| **Branch** | `git branch` | List branches |
| **Checkout** | `git checkout <branch>` | Switch branch |
| **Merge** | `git merge <branch>` | Merge branch |
| **Pull** | `git pull` | Pull changes |
| **Push** | `git push` | Push changes |
| **Stash** | `git stash` | Stash changes |
| **Tag** | `git tag v1.0.0` | Create tag |

---

## Command Aliases

Create shortcuts for common commands:

```bash
# Add aliases
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'

# Use aliases
git st
git co main
git br
git ci -m "Message"
```

---

## Key Takeaways

1. ✅ **Learn essential commands** first
2. ✅ **Use aliases** for common commands
3. ✅ **Check status** before operations
4. ✅ **Use help** - `git help <command>`
5. ✅ **Practice** - commands become muscle memory

---

## Related Topics

- [Git Basics](./1.%20Git%20Basics.md) - Core concepts
- [Branching & Merging](./2.%20Branching%20%26%20Merging.md) - Branch commands
- [Git Best Practices](./6.%20Git%20Best%20Practices.md) - Best practices


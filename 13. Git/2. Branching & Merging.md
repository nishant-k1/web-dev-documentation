# Branching & Merging

Working with branches, creating feature branches, and merging code. Essential for collaborative development.

---

## What is a Branch?

A **branch** is a parallel version of your code. It allows you to:

- ✅ Work on features without affecting main code
- ✅ Experiment safely
- ✅ Collaborate without conflicts
- ✅ Keep main branch stable

---

## Branch Basics

### View Branches

```bash
# List local branches
git branch

# List all branches (local + remote)
git branch -a

# List remote branches
git branch -r
```

### Create Branch

```bash
# Create new branch
git branch feature-name

# Create and switch to branch
git checkout -b feature-name

# Modern way (Git 2.23+)
git switch -c feature-name
```

### Switch Branches

```bash
# Switch to branch
git checkout branch-name

# Modern way
git switch branch-name

# Switch to previous branch
git switch -
```

### Delete Branch

```bash
# Delete local branch
git branch -d branch-name

# Force delete
git branch -D branch-name

# Delete remote branch
git push origin --delete branch-name
```

---

## Branch Naming Conventions

### Common Patterns

```bash
# Feature branches
feature/user-authentication
feature/add-search

# Bug fixes
bugfix/login-error
fix/button-styling

# Hotfixes
hotfix/security-patch

# Releases
release/v1.2.0

# Experiments
experiment/new-design
```

### Best Practices

- ✅ Use lowercase and hyphens
- ✅ Be descriptive
- ✅ Include issue number if applicable: `feature/123-user-auth`
- ✅ Keep names short but clear

---

## Merging

### Merge Types

#### 1. Fast-Forward Merge

When the branch is directly ahead of main:

```bash
# Switch to main
git checkout main

# Merge feature branch
git merge feature-name
```

**Result:** Linear history, no merge commit

#### 2. Merge Commit

When branches have diverged:

```bash
git checkout main
git merge feature-name
```

**Result:** Creates merge commit combining both branches

#### 3. Squash Merge

Combine all commits into one:

```bash
git checkout main
git merge --squash feature-name
git commit -m "Add feature-name"
```

**Result:** Single commit with all changes

---

## Merge Strategies

### No Fast-Forward (Always Create Merge Commit)

```bash
git merge --no-ff feature-name
```

**Use when:** You want to preserve branch history

### Fast-Forward Only

```bash
git merge --ff-only feature-name
```

**Use when:** You want to ensure linear history

### Squash Merge

```bash
git merge --squash feature-name
```

**Use when:** Feature branch has many small commits

---

## Common Branching Workflows

### Feature Branch Workflow

```bash
# 1. Create feature branch from main
git checkout main
git pull origin main
git checkout -b feature/new-feature

# 2. Work on feature
git add .
git commit -m "Implement new feature"

# 3. Push feature branch
git push -u origin feature/new-feature

# 4. Merge to main (via PR or locally)
git checkout main
git merge feature/new-feature
git push origin main

# 5. Delete feature branch
git branch -d feature/new-feature
git push origin --delete feature/new-feature
```

---

## Handling Merge Conflicts

### When Conflicts Occur

Conflicts happen when:
- Same file changed in both branches
- Different changes to same lines

### Resolve Conflicts

```bash
# 1. Attempt merge
git merge feature-branch

# 2. Git shows conflict markers
<<<<<<< HEAD
// Code from current branch
=======
// Code from feature-branch
>>>>>>> feature-branch

# 3. Edit file to resolve conflict
# Remove markers and keep desired code

# 4. Stage resolved file
git add conflicted-file.js

# 5. Complete merge
git commit
```

### Conflict Resolution Tools

```bash
# Use merge tool
git mergetool

# Abort merge
git merge --abort
```

---

## Best Practices

### ✅ DO

1. **Create branches for features**
   ```bash
   git checkout -b feature/user-login
   ```

2. **Keep main branch stable**
   - Never commit directly to main
   - Always use feature branches

3. **Merge frequently**
   - Don't let branches diverge too much
   - Merge main into feature branch regularly

4. **Delete merged branches**
   ```bash
   git branch -d feature-name
   ```

5. **Use descriptive branch names**
   ```bash
   feature/user-authentication  # ✅ Good
   feature/new-stuff           # ❌ Bad
   ```

### ❌ DON'T

1. ❌ **Don't commit directly to main**
2. ❌ **Don't merge without testing**
3. ❌ **Don't delete branches before merging**
4. ❌ **Don't use vague branch names**

---

## Advanced Branching

### Rename Branch

```bash
# Rename current branch
git branch -m new-name

# Rename other branch
git branch -m old-name new-name

# Update remote
git push origin -u new-name
git push origin --delete old-name
```

### Compare Branches

```bash
# See differences between branches
git diff main..feature-branch

# See commits in feature not in main
git log main..feature-branch

# See files changed
git diff --name-only main..feature-branch
```

### Update Branch from Main

```bash
# Switch to feature branch
git checkout feature-branch

# Merge latest main into feature
git merge main

# Or rebase (see Rebasing section)
git rebase main
```

---

## Quick Reference

| Command | Description |
|---------|-------------|
| `git branch` | List branches |
| `git branch -a` | List all branches |
| `git checkout -b name` | Create and switch |
| `git switch -c name` | Create and switch (new) |
| `git merge branch` | Merge branch |
| `git branch -d name` | Delete branch |
| `git branch -m new-name` | Rename branch |

---

## Key Takeaways

1. ✅ **Use branches** for all features
2. ✅ **Merge frequently** to avoid conflicts
3. ✅ **Delete merged branches** to keep clean
4. ✅ **Use descriptive names** for branches
5. ✅ **Keep main stable** - never commit directly

---

## Related Topics

- [Git Workflows](./3.%20Git%20Workflows.md) - Common workflows
- [Resolving Conflicts](./4.%20Resolving%20Conflicts.md) - Conflict resolution
- [Git Best Practices](./6.%20Git%20Best%20Practices.md) - Best practices


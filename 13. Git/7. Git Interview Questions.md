# Git Interview Questions

Common Git interview questions and answers. Essential for technical interviews.

---

## Basic Questions

### 1. What is Git?

**Answer:**
Git is a distributed version control system that tracks changes in code. It allows multiple developers to work on the same project simultaneously, track history, and collaborate effectively.

**Key Points:**
- Distributed (each developer has full history)
- Tracks changes over time
- Enables collaboration
- Supports branching and merging

---

### 2. What is the difference between Git and GitHub?

**Answer:**
- **Git** - Version control system (tool)
- **GitHub** - Cloud hosting service for Git repositories (platform)

**Analogy:**
- Git = Word processor
- GitHub = Google Docs (cloud storage)

---

### 3. What is a repository?

**Answer:**
A repository (repo) is a directory that contains your project files and Git's version history. It tracks all changes to files over time.

```bash
# Initialize repository
git init

# Repository contains:
# - Your project files
# - .git/ folder (history)
```

---

### 4. What is the difference between `git pull` and `git fetch`?

**Answer:**

**`git fetch`:**
- Downloads changes from remote
- Does NOT merge
- Updates remote-tracking branches
- Safe operation

**`git pull`:**
- Downloads changes AND merges
- Equivalent to `git fetch` + `git merge`
- Can cause conflicts

```bash
# Fetch only
git fetch origin
git merge origin/main

# Pull (fetch + merge)
git pull origin main
```

---

### 5. What is the staging area?

**Answer:**
The staging area (index) is where you prepare changes before committing. It's an intermediate step between working directory and repository.

```
Working Directory → Staging Area → Repository
   (Modified)    →   (Staged)   →  (Committed)
```

```bash
# Add to staging
git add filename.js

# Commit from staging
git commit -m "Message"
```

---

## Branching Questions

### 6. What is a branch?

**Answer:**
A branch is a parallel version of your code. It allows you to work on features without affecting the main codebase.

```bash
# Create branch
git branch feature-name

# Switch to branch
git checkout feature-name
```

---

### 7. What is the difference between `git merge` and `git rebase`?

**Answer:**

**`git merge`:**
- Creates merge commit
- Preserves branch history
- Non-destructive
- Shows when branches diverged

**`git rebase`:**
- Replays commits on top of base
- Linear history
- Rewrites commit history
- Cleaner history

```bash
# Merge (creates merge commit)
git merge feature-branch

# Rebase (linear history)
git rebase main
```

**When to use:**
- **Merge:** Shared branches, preserving history
- **Rebase:** Local branches, clean history

---

### 8. What is a fast-forward merge?

**Answer:**
A fast-forward merge occurs when the branch being merged is directly ahead of the current branch. Git simply moves the pointer forward.

```bash
# Before merge
main:     A---B---C
                \
feature:         D---E

# After fast-forward merge
main:     A---B---C---D---E
```

**Prevent fast-forward:**
```bash
git merge --no-ff feature-branch
```

---

### 9. How do you delete a branch?

**Answer:**

```bash
# Delete local branch
git branch -d branch-name

# Force delete (if not merged)
git branch -D branch-name

# Delete remote branch
git push origin --delete branch-name
```

---

## Conflict Questions

### 10. What is a merge conflict?

**Answer:**
A merge conflict occurs when Git cannot automatically merge changes because the same file was modified differently in both branches.

**Conflict markers:**
```javascript
<<<<<<< HEAD
// Code from current branch
=======
// Code from incoming branch
>>>>>>> feature-branch
```

**Resolution:**
1. Edit file to resolve conflict
2. Remove conflict markers
3. Stage file: `git add filename.js`
4. Complete merge: `git commit`

---

### 11. How do you resolve a merge conflict?

**Answer:**

```bash
# 1. Identify conflicted files
git status

# 2. Open file and resolve conflict
# Remove markers, keep desired code

# 3. Stage resolved file
git add filename.js

# 4. Complete merge
git commit

# Or abort merge
git merge --abort
```

---

## Advanced Questions

### 12. What is `git stash`?

**Answer:**
`git stash` temporarily saves uncommitted changes so you can switch branches or pull updates.

```bash
# Stash changes
git stash

# Apply stash
git stash apply

# List stashes
git stash list

# Drop stash
git stash drop
```

**Use case:** Working on feature, need to switch branches quickly.

---

### 13. What is the difference between `git reset` and `git revert`?

**Answer:**

**`git reset`:**
- Moves HEAD pointer
- Rewrites history
- Can lose commits
- Use on local branches only

**`git revert`:**
- Creates new commit
- Undoes changes
- Preserves history
- Safe for shared branches

```bash
# Reset (rewrites history)
git reset --soft HEAD~1  # Keep changes staged
git reset HEAD~1         # Unstage changes
git reset --hard HEAD~1  # Discard changes

# Revert (creates new commit)
git revert abc123
```

---

### 14. What is `HEAD` in Git?

**Answer:**
`HEAD` is a pointer to the current commit/branch you're on. It points to the latest commit in your current branch.

```bash
# Show HEAD
git log HEAD

# Show HEAD~1 (one commit before)
git log HEAD~1

# Show HEAD~2 (two commits before)
git log HEAD~2
```

---

### 15. What is `.gitignore`?

**Answer:**
`.gitignore` is a file that tells Git which files to ignore (not track).

```bash
# .gitignore
node_modules/
.env
*.log
dist/
```

**Common patterns:**
- `node_modules/` - Dependencies
- `.env` - Environment variables
- `*.log` - Log files
- `dist/` - Build outputs

---

## Workflow Questions

### 16. Explain your Git workflow.

**Answer:**
"I use a feature branch workflow:

1. Create feature branch from main
2. Work on feature, commit frequently
3. Push feature branch
4. Create pull request
5. Get code review
6. Merge to main after approval
7. Delete feature branch

This keeps main stable and allows for code review."

---

### 17. How do you handle a situation where you committed to the wrong branch?

**Answer:**

```bash
# Option 1: Move commit to correct branch
git log                    # Note commit hash
git reset HEAD~1          # Remove from wrong branch
git checkout correct-branch
git cherry-pick abc123     # Apply commit here

# Option 2: Create new branch from current
git branch correct-branch
git reset HEAD~1 main     # Reset main branch
```

---

### 18. What is a pull request?

**Answer:**
A pull request (PR) is a request to merge changes from one branch into another. It allows:

- Code review
- Discussion
- Testing
- CI/CD checks

**Process:**
1. Push feature branch
2. Create PR on GitHub/GitLab
3. Team reviews
4. Address feedback
5. Merge after approval

---

## Scenario-Based Questions

### 19. You accidentally committed sensitive data. How do you fix it?

**Answer:**

```bash
# 1. Remove from history (if not pushed)
git reset HEAD~1
git commit --amend

# 2. If already pushed, use git filter-branch or BFG
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch file-with-secret" \
  --prune-empty --tag-name-filter cat -- --all

# 3. Force push (coordinate with team!)
git push --force

# 4. Rotate secrets immediately
```

**Prevention:** Use `.gitignore` and environment variables.

---

### 20. How do you update a feature branch with latest main?

**Answer:**

```bash
# Option 1: Merge main into feature
git checkout feature-branch
git merge main

# Option 2: Rebase feature onto main
git checkout feature-branch
git rebase main

# Option 3: Pull with rebase
git pull --rebase origin main
```

**Preference:** Merge for shared branches, rebase for local branches.

---

### 21. How do you find which commit introduced a bug?

**Answer:**

```bash
# Use git bisect
git bisect start
git bisect bad              # Current commit is bad
git bisect good abc123      # Known good commit
# Git checks out middle commit
# Test and mark good/bad
git bisect good             # If this commit is good
git bisect bad              # If this commit is bad
# Repeat until found
git bisect reset
```

---

## Command Questions

### 22. What does `git push -u origin main` do?

**Answer:**
- `git push` - Push commits to remote
- `-u` - Set upstream tracking
- `origin` - Remote name
- `main` - Branch name

After this, you can use `git push` without specifying remote/branch.

---

### 23. What is `git cherry-pick`?

**Answer:**
`git cherry-pick` applies a specific commit from one branch to another.

```bash
# Apply commit to current branch
git cherry-pick abc123

# Cherry-pick range
git cherry-pick abc123..def456
```

**Use case:** Apply bug fix from main to release branch.

---

### 24. What is the difference between `git add .` and `git add -A`?

**Answer:**

**`git add .`:**
- Adds files in current directory and subdirectories
- Respects `.gitignore`

**`git add -A`:**
- Adds all changes (including deletions)
- Works from repository root

**Modern Git:** Both behave similarly, `git add .` is preferred.

---

## Best Practices Questions

### 25. What makes a good commit message?

**Answer:**
A good commit message:
- Uses conventional format: `type(scope): subject`
- Present tense: "add" not "added"
- Specific: "fix login bug" not "fix bug"
- Under 50 characters for subject
- Explains why in body if needed

```bash
# ✅ Good
git commit -m "feat(auth): add user login functionality"

# ❌ Bad
git commit -m "update"
```

---

## Quick Reference

### Common Interview Scenarios

1. **"How do you resolve conflicts?"**
   - Identify conflicted files
   - Edit to resolve
   - Stage and commit

2. **"How do you undo a commit?"**
   - `git reset` (local)
   - `git revert` (shared)

3. **"How do you update feature branch?"**
   - Merge main into feature
   - Or rebase feature onto main

4. **"What's your Git workflow?"**
   - Feature branch workflow
   - Pull requests
   - Code review

---

## Key Takeaways

1. ✅ **Understand core concepts** - repository, branch, commit
2. ✅ **Know common commands** - add, commit, push, pull
3. ✅ **Understand workflows** - feature branches, PRs
4. ✅ **Know conflict resolution** - common interview topic
5. ✅ **Practice scenarios** - undo commits, update branches

---

## Related Topics

- [Git Basics](./1.%20Git%20Basics.md) - Core concepts
- [Branching & Merging](./2.%20Branching%20%26%20Merging.md) - Branch operations
- [Git Best Practices](./6.%20Git%20Best%20Practices.md) - Best practices


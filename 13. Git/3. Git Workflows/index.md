# Git Workflows

Common Git workflows used in team environments. Understanding different collaboration patterns.

---

## What is a Git Workflow?

A **Git workflow** is a branching strategy that defines how team members collaborate. It establishes:

- ✅ How branches are created
- ✅ When branches are merged
- ✅ How releases are handled
- ✅ How conflicts are resolved

---

## Common Workflows

### 1. Git Flow

**Best for:** Projects with scheduled releases

**Branches:**
- `main` - Production code
- `develop` - Development branch
- `feature/*` - Feature branches
- `release/*` - Release preparation
- `hotfix/*` - Production fixes

**Workflow:**

```bash
# 1. Create feature from develop
git checkout develop
git pull origin develop
git checkout -b feature/new-feature

# 2. Work on feature
git add .
git commit -m "Add feature"

# 3. Merge to develop
git checkout develop
git merge feature/new-feature
git push origin develop

# 4. Create release branch
git checkout -b release/v1.2.0 develop

# 5. Merge to main and tag
git checkout main
git merge release/v1.2.0
git tag -a v1.2.0 -m "Release v1.2.0"
git push origin main --tags

# 6. Merge back to develop
git checkout develop
git merge release/v1.2.0
```

**Pros:**
- ✅ Clear release process
- ✅ Stable main branch
- ✅ Good for versioned releases

**Cons:**
- ❌ More complex
- ❌ Can be overkill for small teams

---

### 2. GitHub Flow

**Best for:** Continuous deployment, web applications

**Branches:**
- `main` - Always deployable
- `feature/*` - Feature branches

**Workflow:**

```bash
# 1. Create feature branch
git checkout -b feature/new-feature main

# 2. Work and commit
git add .
git commit -m "Add feature"

# 3. Push and create PR
git push -u origin feature/new-feature
# Create Pull Request on GitHub

# 4. After review, merge via PR
# 5. Deploy main automatically
```

**Pros:**
- ✅ Simple and fast
- ✅ Good for continuous deployment
- ✅ Easy to understand

**Cons:**
- ❌ No release branches
- ❌ Less structure for complex releases

---

### 3. GitLab Flow

**Best for:** GitLab projects, environments-based deployment

**Branches:**
- `main` - Development
- `production` - Production code
- `feature/*` - Feature branches
- `pre-production` - Staging

**Workflow:**

```bash
# 1. Create feature from main
git checkout -b feature/new-feature main

# 2. Merge to main (via MR)
# 3. Deploy main to staging
# 4. Merge main to pre-production
# 5. Test in pre-production
# 6. Merge pre-production to production
```

**Pros:**
- ✅ Environment-based
- ✅ Clear deployment path
- ✅ Good for GitLab CI/CD

**Cons:**
- ❌ More branches to manage
- ❌ Can be complex

---

### 4. Feature Branch Workflow

**Best for:** Small teams, simple projects

**Branches:**
- `main` - Main codebase
- `feature/*` - Feature branches

**Workflow:**

```bash
# 1. Create feature branch
git checkout -b feature/new-feature main

# 2. Work on feature
git add .
git commit -m "Add feature"

# 3. Push feature branch
git push -u origin feature/new-feature

# 4. Merge to main (via PR or locally)
git checkout main
git merge feature/new-feature
git push origin main
```

**Pros:**
- ✅ Simple
- ✅ Easy to understand
- ✅ Good for small teams

**Cons:**
- ❌ No release branches
- ❌ Less structure

---

### 5. Forking Workflow

**Best for:** Open source projects, external contributors

**Workflow:**

```bash
# 1. Fork repository on GitHub
# 2. Clone your fork
git clone https://github.com/your-username/repo.git

# 3. Add upstream remote
git remote add upstream https://github.com/original/repo.git

# 4. Create feature branch
git checkout -b feature/new-feature

# 5. Work and commit
git add .
git commit -m "Add feature"

# 6. Push to your fork
git push origin feature/new-feature

# 7. Create Pull Request to upstream
# 8. Sync with upstream
git fetch upstream
git merge upstream/main
```

**Pros:**
- ✅ Good for open source
- ✅ Maintainer controls merges
- ✅ Isolated contributions

**Cons:**
- ❌ More complex setup
- ❌ Requires fork management

---

## Choosing a Workflow

### Use Git Flow if:
- ✅ You have scheduled releases
- ✅ You need version numbers
- ✅ You have a release process

### Use GitHub Flow if:
- ✅ You deploy continuously
- ✅ You're a small team
- ✅ You want simplicity

### Use GitLab Flow if:
- ✅ You use GitLab
- ✅ You have multiple environments
- ✅ You need environment-based deployment

### Use Feature Branch if:
- ✅ Small team
- ✅ Simple project
- ✅ Quick iterations

---

## Pull Request / Merge Request Process

### Creating a PR/MR

1. **Push feature branch:**
   ```bash
   git push -u origin feature/new-feature
   ```

2. **Create PR on GitHub/GitLab:**
   - Go to repository
   - Click "New Pull Request"
   - Select branches
   - Add description

3. **Review process:**
   - Team reviews code
   - Address feedback
   - Update branch if needed

4. **Merge:**
   - Approve PR
   - Merge (squash, merge, or rebase)
   - Delete branch

---

## Best Practices

### ✅ DO

1. **Follow team workflow**
   - Use the workflow your team agreed on
   - Be consistent

2. **Keep branches short-lived**
   - Merge quickly
   - Don't let branches diverge

3. **Use descriptive PR descriptions**
   - What changed
   - Why it changed
   - How to test

4. **Review before merging**
   - Always get code review
   - Address feedback

5. **Test before merging**
   - Ensure code works
   - Run tests

### ❌ DON'T

1. ❌ **Don't merge without review**
2. ❌ **Don't skip tests**
3. ❌ **Don't merge broken code**
4. ❌ **Don't ignore feedback**

---

## Workflow Comparison

| Workflow | Complexity | Best For | Release Strategy |
|----------|------------|----------|------------------|
| **Git Flow** | High | Scheduled releases | Release branches |
| **GitHub Flow** | Low | Continuous deployment | Direct to main |
| **GitLab Flow** | Medium | Multiple environments | Environment branches |
| **Feature Branch** | Low | Small teams | Direct to main |
| **Forking** | Medium | Open source | PR to upstream |

---

## Quick Reference

### Git Flow Commands

```bash
# Feature
git checkout -b feature/name develop
git checkout develop && git merge feature/name

# Release
git checkout -b release/v1.0.0 develop
git checkout main && git merge release/v1.0.0
git tag v1.0.0

# Hotfix
git checkout -b hotfix/bug main
git checkout main && git merge hotfix/bug
git checkout develop && git merge hotfix/bug
```

### GitHub Flow Commands

```bash
# Feature
git checkout -b feature/name main
git push origin feature/name
# Create PR, merge via GitHub
```

---

## Key Takeaways

1. ✅ **Choose workflow** based on team size and needs
2. ✅ **Be consistent** - follow team conventions
3. ✅ **Use PRs/MRs** for code review
4. ✅ **Keep branches short-lived**
5. ✅ **Test before merging**

---

## Related Topics

- [Branching & Merging](./2.%20Branching%20%26%20Merging.md) - Branch basics
- [Resolving Conflicts](./4.%20Resolving%20Conflicts.md) - Handling conflicts
- [Git Best Practices](./6.%20Git%20Best%20Practices.md) - Best practices


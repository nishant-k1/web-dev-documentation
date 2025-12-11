# Git Best Practices

Best practices for using Git in team environments. Guidelines for effective collaboration.

---

## Commit Message Best Practices

### Conventional Commits Format

```bash
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting
- `refactor` - Code refactoring
- `test` - Tests
- `chore` - Maintenance

### Examples

```bash
# Good commit messages
git commit -m "feat(auth): add user login functionality"
git commit -m "fix(button): correct button color on hover"
git commit -m "docs(readme): update installation instructions"
git commit -m "refactor(api): simplify error handling"

# Bad commit messages
git commit -m "fix"
git commit -m "update"
git commit -m "changes"
git commit -m "WIP"
```

### Best Practices

1. ✅ **Use present tense** - "add" not "added"
2. ✅ **Be specific** - "fix login bug" not "fix bug"
3. ✅ **Keep first line short** - Under 50 characters
4. ✅ **Explain why** - In body if needed
5. ✅ **Reference issues** - "fixes #123"

---

## Branch Naming Conventions

### Recommended Patterns

```bash
# Features
feature/user-authentication
feature/add-search-functionality

# Bug fixes
bugfix/login-error
fix/button-styling-issue

# Hotfixes
hotfix/security-patch
hotfix/critical-bug

# Releases
release/v1.2.0
release/2024-01-15

# Experiments
experiment/new-design
experiment/performance-optimization

# Documentation
docs/update-readme
docs/api-documentation
```

### Best Practices

- ✅ Use lowercase
- ✅ Use hyphens, not underscores
- ✅ Be descriptive but concise
- ✅ Include issue number: `feature/123-user-auth`
- ✅ Use consistent prefixes

---

## When to Commit

### ✅ DO Commit

1. **After completing a logical unit**
   - Feature implemented
   - Bug fixed
   - Test added

2. **When code works**
   - Tests pass
   - No syntax errors
   - Functionality verified

3. **Small, focused changes**
   - One feature per commit
   - Related changes together

4. **Frequently**
   - Don't wait too long
   - Easier to review
   - Easier to revert

### ❌ DON'T Commit

1. ❌ **Broken code**
   - Code doesn't compile
   - Tests failing

2. ❌ **Large unrelated changes**
   - Multiple features
   - Unrelated fixes

3. ❌ **Commented-out code**
   - Remove, don't comment

4. ❌ **Sensitive information**
   - Passwords, API keys
   - Personal data

---

## Code Review Practices

### Before Creating PR

- ✅ Code works and tests pass
- ✅ Follows team conventions
- ✅ No console.logs or debug code
- ✅ Documentation updated if needed
- ✅ Self-review your code first

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How to test these changes

## Screenshots (if applicable)
```

### Review Checklist

- ✅ Code follows style guide
- ✅ No obvious bugs
- ✅ Tests added/updated
- ✅ Documentation updated
- ✅ No security issues
- ✅ Performance considered

---

## Security Best Practices

### ✅ DO

1. **Use .gitignore**
   ```bash
   # .gitignore
   .env
   .env.local
   *.key
   node_modules/
   ```

2. **Never commit secrets**
   - API keys
   - Passwords
   - Tokens
   - Private keys

3. **Use environment variables**
   ```bash
   # ✅ Good
   const apiKey = process.env.API_KEY;
   
   # ❌ Bad
   const apiKey = "sk_live_123456";
   ```

4. **Review before committing**
   ```bash
   git diff
   git status
   ```

### ❌ DON'T

1. ❌ Commit `.env` files
2. ❌ Commit `node_modules/`
3. ❌ Commit API keys or secrets
4. ❌ Commit large binary files
5. ❌ Commit personal information

---

## File Management

### .gitignore Best Practices

```bash
# Dependencies
node_modules/
package-lock.json
yarn.lock

# Build outputs
dist/
build/
.next/
out/

# Environment variables
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
desktop.ini

# Logs
*.log
npm-debug.log*
yarn-debug.log*

# Testing
coverage/
.nyc_output/

# Temporary files
*.tmp
*.temp
.cache/
```

### Large Files

```bash
# Use Git LFS for large files
git lfs install
git lfs track "*.psd"
git lfs track "*.mp4"

# Or exclude from Git
# Use cloud storage instead
```

---

## Collaboration Best Practices

### ✅ DO

1. **Pull before push**
   ```bash
   git pull origin main
   git push origin main
   ```

2. **Keep branches up to date**
   ```bash
   git checkout feature-branch
   git merge main
   ```

3. **Communicate with team**
   - Tell team what you're working on
   - Coordinate on shared files
   - Discuss major changes

4. **Use feature branches**
   - Never commit directly to main
   - One feature per branch

5. **Review before merging**
   - Use pull requests
   - Get approval
   - Address feedback

### ❌ DON'T

1. ❌ Commit directly to main
2. ❌ Force push to shared branches
3. ❌ Ignore conflicts
4. ❌ Merge without review
5. ❌ Delete shared branches

---

## Commit Frequency

### Recommended Approach

**Commit Often:**
- ✅ After each logical change
- ✅ When code works
- ✅ Before leaving work
- ✅ Before risky changes

**Benefits:**
- Easier to review
- Easier to revert
- Better history
- Less conflict risk

### Example Workflow

```bash
# Morning: Start feature
git checkout -b feature/new-feature

# After implementing login form
git add src/components/LoginForm.js
git commit -m "feat(auth): add login form component"

# After adding validation
git add src/utils/validation.js
git commit -m "feat(auth): add form validation"

# After fixing bug
git add src/components/LoginForm.js
git commit -m "fix(auth): correct email validation regex"

# End of day: Push
git push origin feature/new-feature
```

---

## Branch Management

### Keep Branches Clean

```bash
# Delete merged branches
git branch -d feature-name

# Delete remote branches
git push origin --delete feature-name

# Prune remote references
git remote prune origin
```

### Keep Main Stable

- ✅ Never commit directly to main
- ✅ Always use feature branches
- ✅ Test before merging
- ✅ Use protected branches

---

## Git Configuration

### Recommended Settings

```bash
# User info
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Default branch
git config --global init.defaultBranch main

# Editor
git config --global core.editor "code --wait"

# Pull strategy
git config --global pull.rebase false

# Push default
git config --global push.default simple

# Aliases
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
```

---

## Common Mistakes to Avoid

### 1. Committing to Wrong Branch

```bash
# Check current branch first
git branch

# Or use status
git status
```

### 2. Forgetting to Pull

```bash
# Always pull before push
git pull origin main
git push origin main
```

### 3. Force Pushing to Shared Branch

```bash
# ❌ Never do this on main
git push --force origin main

# ✅ Use force-with-lease if needed
git push --force-with-lease origin main
```

### 4. Large Commits

```bash
# ❌ Bad: One large commit
git add .
git commit -m "Add entire feature"

# ✅ Good: Multiple small commits
git add LoginForm.js
git commit -m "feat(auth): add login form"
git add validation.js
git commit -m "feat(auth): add validation"
```

---

## Quick Reference

### Daily Workflow

```bash
# 1. Check status
git status

# 2. Pull latest
git pull origin main

# 3. Create feature branch
git checkout -b feature/new-feature

# 4. Make changes and commit
git add .
git commit -m "feat: add feature"

# 5. Push branch
git push -u origin feature/new-feature

# 6. Create PR
# 7. After merge, delete branch
git branch -d feature/new-feature
```

---

## Key Takeaways

1. ✅ **Write clear commit messages** - Use conventional format
2. ✅ **Commit often** - Small, logical commits
3. ✅ **Use feature branches** - Never commit to main directly
4. ✅ **Pull before push** - Always sync first
5. ✅ **Review before merging** - Use pull requests
6. ✅ **Never commit secrets** - Use environment variables
7. ✅ **Keep branches clean** - Delete merged branches

---

## Related Topics

- [Git Basics](./1.%20Git%20Basics.md) - Core concepts
- [Branching & Merging](./2.%20Branching%20%26%20Merging.md) - Branch practices
- [Git Workflows](./3.%20Git%20Workflows.md) - Workflow strategies


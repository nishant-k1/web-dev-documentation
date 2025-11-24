# Resolving Conflicts

Handling and resolving merge conflicts. Essential skill for collaborative development.

---

## What is a Conflict?

A **conflict** occurs when Git cannot automatically merge changes because:

- ✅ Same file changed in both branches
- ✅ Different changes to same lines
- ✅ One branch deleted file, other modified it

---

## When Conflicts Happen

### Common Scenarios

1. **Two people edit same file**
   - Developer A changes line 10
   - Developer B changes line 10
   - Git can't decide which to keep

2. **Diverged branches**
   - Feature branch created from main
   - Main branch changed
   - Feature branch changed same files

3. **Rebase conflicts**
   - Rebasing feature branch onto main
   - Conflicts occur during rebase

---

## Understanding Conflict Markers

Git marks conflicts with special markers:

```javascript
<<<<<<< HEAD
// Code from current branch (the branch you're merging INTO)
const apiUrl = "https://api.production.com";
=======
// Code from incoming branch (the branch you're merging FROM)
const apiUrl = "https://api.staging.com";
>>>>>>> feature-branch
```

**Markers:**
- `<<<<<<< HEAD` - Start of current branch code
- `=======` - Separator
- `>>>>>>> branch-name` - End of incoming branch code

---

## Resolving Conflicts

### Step-by-Step Process

#### 1. Identify Conflicts

```bash
# Attempt merge
git merge feature-branch

# Git will show:
Auto-merging src/App.js
CONFLICT (content): Merge conflict in src/App.js
Automatic merge failed; fix conflicts and then commit the result.
```

#### 2. Check Status

```bash
git status

# Shows conflicted files:
Unmerged paths:
  (use "git add <file>..." to mark resolution)
        both modified:   src/App.js
```

#### 3. Open Conflicted File

```javascript
// src/App.js
import React from 'react';

<<<<<<< HEAD
const API_URL = "https://api.production.com";
=======
const API_URL = "https://api.staging.com";
>>>>>>> feature-branch

function App() {
  return <div>App</div>;
}
```

#### 4. Resolve Conflict

**Option A: Keep Current Branch Code**
```javascript
const API_URL = "https://api.production.com";
```

**Option B: Keep Incoming Branch Code**
```javascript
const API_URL = "https://api.staging.com";
```

**Option C: Combine Both**
```javascript
const API_URL = process.env.REACT_APP_API_URL || "https://api.production.com";
```

**Option D: Write New Code**
```javascript
const API_URL = "https://api.new-domain.com";
```

#### 5. Remove Conflict Markers

After resolving, remove all markers:
```javascript
// ✅ Correct - no markers
const API_URL = "https://api.production.com";
```

#### 6. Stage Resolved File

```bash
# Mark conflict as resolved
git add src/App.js

# Or add all resolved files
git add .
```

#### 7. Complete Merge

```bash
# Commit the merge
git commit

# Or with message
git commit -m "Merge feature-branch and resolve conflicts"
```

---

## Conflict Resolution Strategies

### 1. Accept Current (Ours)

Keep code from current branch:

```bash
# For entire file
git checkout --ours src/App.js
git add src/App.js

# For specific file during merge
git merge -X ours feature-branch
```

### 2. Accept Incoming (Theirs)

Keep code from incoming branch:

```bash
# For entire file
git checkout --theirs src/App.js
git add src/App.js

# For specific file during merge
git merge -X theirs feature-branch
```

### 3. Manual Resolution

Edit file manually to combine or rewrite:

```javascript
// Before
<<<<<<< HEAD
const user = { name: "John", age: 30 };
=======
const user = { name: "John", email: "john@example.com" };
>>>>>>> feature-branch

// After (combining)
const user = { 
  name: "John", 
  age: 30, 
  email: "john@example.com" 
};
```

---

## Using Merge Tools

### Visual Merge Tools

```bash
# Open merge tool
git mergetool

# Configure tool
git config --global merge.tool vimdiff
git config --global merge.tool vscode
```

### VS Code Merge Tool

1. Open conflicted file in VS Code
2. VS Code shows conflict UI
3. Click "Accept Current Change" or "Accept Incoming Change"
4. Or edit manually
5. Save file

---

## Preventing Conflicts

### 1. Pull Before Push

```bash
# Always pull latest before pushing
git pull origin main
git push origin main
```

### 2. Merge Main into Feature Regularly

```bash
# Update feature branch with main
git checkout feature-branch
git merge main
# Resolve conflicts early
```

### 3. Communicate with Team

- ✅ Tell team what files you're working on
- ✅ Coordinate on shared files
- ✅ Use feature branches

### 4. Keep Branches Short-Lived

- ✅ Merge quickly
- ✅ Don't let branches diverge too much
- ✅ Small, focused changes

---

## Rebase Conflicts

### During Rebase

```bash
# Start rebase
git rebase main

# Conflict occurs
CONFLICT (content): Merge conflict in src/App.js

# Resolve conflict
# Edit file, remove markers

# Stage resolved file
git add src/App.js

# Continue rebase
git rebase --continue

# Or abort rebase
git rebase --abort
```

### Interactive Rebase Conflicts

```bash
# Interactive rebase
git rebase -i HEAD~3

# If conflicts occur:
# 1. Resolve conflicts
# 2. git add .
# 3. git rebase --continue
```

---

## Common Conflict Scenarios

### Scenario 1: Same Line Changed

```javascript
// Branch A
const count = 10;

// Branch B
const count = 20;

// Conflict
<<<<<<< HEAD
const count = 10;
=======
const count = 20;
>>>>>>> branch-b
```

**Resolution:** Choose correct value or combine logic

### Scenario 2: Different Sections

```javascript
// Branch A added function at top
function helper() { }

// Branch B added function at bottom
function anotherHelper() { }

// Usually no conflict - Git merges both
```

### Scenario 3: File Deleted vs Modified

```bash
# Branch A deleted file
# Branch B modified file

# Git shows:
CONFLICT (modify/delete): file.js deleted in HEAD and modified in branch-b
```

**Resolution:**
```bash
# Keep deletion
git rm file.js

# Keep modification
git add file.js
```

---

## Best Practices

### ✅ DO

1. **Resolve conflicts immediately**
   - Don't leave conflicts unresolved
   - Complete merge or abort

2. **Test after resolution**
   - Ensure code works
   - Run tests

3. **Communicate with team**
   - Discuss major conflicts
   - Understand both changes

4. **Use meaningful commit messages**
   ```bash
   git commit -m "Resolve merge conflict in App.js - keep production API URL"
   ```

### ❌ DON'T

1. ❌ **Don't ignore conflicts**
2. ❌ **Don't randomly choose code**
3. ❌ **Don't commit without testing**
4. ❌ **Don't delete conflict markers without resolving**

---

## Quick Reference

| Command | Description |
|---------|-------------|
| `git merge branch` | Merge branch (may cause conflicts) |
| `git status` | See conflicted files |
| `git add file` | Mark conflict resolved |
| `git merge --abort` | Abort merge |
| `git checkout --ours file` | Accept current branch |
| `git checkout --theirs file` | Accept incoming branch |
| `git mergetool` | Open merge tool |

---

## Key Takeaways

1. ✅ **Conflicts are normal** - part of collaboration
2. ✅ **Resolve carefully** - understand both changes
3. ✅ **Test after resolution** - ensure code works
4. ✅ **Prevent conflicts** - pull regularly, communicate
5. ✅ **Use merge tools** - easier visualization

---

## Related Topics

- [Branching & Merging](./2.%20Branching%20%26%20Merging.md) - Merge basics
- [Git Workflows](./3.%20Git%20Workflows.md) - Workflow strategies
- [Git Best Practices](./6.%20Git%20Best%20Practices.md) - Best practices


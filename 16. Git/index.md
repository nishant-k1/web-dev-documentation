# Git & Version Control

Complete guide to Git version control for frontend development. Essential for managing code, collaborating in teams, and deploying applications.

---

## Overview

This section covers everything you need to know about Git:

1. **Git Basics** - Core concepts and essential commands
2. **Branching & Merging** - Working with branches and merging code
3. **Git Workflows** - Common workflows (Git Flow, GitHub Flow)
4. **Resolving Conflicts** - Handling merge conflicts
5. **Git Commands Reference** - Quick reference for all commands
6. **Git Best Practices** - Best practices for team collaboration
7. **Git Interview Questions** - Common Git interview questions

---

## Quick Start

### Initial Setup

```bash
# Configure Git
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Initialize repository
git init

# Clone existing repository
git clone https://github.com/user/repo.git
```

### Basic Workflow

```bash
# Check status
git status

# Add files
git add .

# Commit changes
git commit -m "Your commit message"

# Push to remote
git push origin main
```

---

## Topics

### 1. [Git Basics](./1.%20Git%20Basics.md)

Core Git concepts and essential commands for daily use.

**Key Concepts:**
- Repository initialization
- Staging and committing
- Viewing history
- Undoing changes
- Remote repositories

---

### 2. [Branching & Merging](./2.%20Branching%20%26%20Merging.md)

Working with branches, creating feature branches, and merging code.

**Key Concepts:**
- Creating and switching branches
- Branch naming conventions
- Merging strategies
- Fast-forward vs merge commits
- Deleting branches

---

### 3. [Git Workflows](./3.%20Git%20Workflows.md)

Common Git workflows used in team environments.

**Key Concepts:**
- Git Flow
- GitHub Flow
- GitLab Flow
- Feature branch workflow
- Forking workflow

---

### 4. [Resolving Conflicts](./4.%20Resolving%20Conflicts.md)

Handling and resolving merge conflicts.

**Key Concepts:**
- Understanding conflicts
- Conflict resolution strategies
- Using merge tools
- Preventing conflicts
- Best practices

---

### 5. [Git Commands Reference](./5.%20Git%20Commands%20Reference.md)

Quick reference guide for all Git commands.

**Key Concepts:**
- Repository commands
- Branch commands
- Commit commands
- Remote commands
- Advanced commands

---

### 6. [Git Best Practices](./6.%20Git%20Best%20Practices.md)

Best practices for using Git in team environments.

**Key Concepts:**
- Commit message conventions
- Branch naming
- When to commit
- Code review practices
- Security considerations

---

### 7. [Git Interview Questions](./7.%20Git%20Interview%20Questions.md)

Common Git interview questions and answers.

**Key Concepts:**
- Conceptual questions
- Command questions
- Workflow questions
- Troubleshooting scenarios
- Advanced topics

---

## Best Practices

1. ✅ **Write clear commit messages** - Use conventional commit format
2. ✅ **Commit often** - Small, logical commits
3. ✅ **Use branches** - Never commit directly to main
4. ✅ **Pull before push** - Always sync before pushing
5. ✅ **Review before merge** - Use pull requests for code review

---

## Related Topics

- [CI/CD Pipelines](../7.%20Deployment%20%26%20DevOps/3.%20CI%20CD%20Pipelines/index.md) - Git integration in CI/CD
- [Deployment Strategies](../7.%20Deployment%20%26%20DevOps/2.%20Deployment%20Strategies/index.md) - Git-based deployments


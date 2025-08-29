# Git Instructions for Capstone Project Team

## 📚 Table of Contents
1. [Getting Started](#getting-started)
2. [Daily Workflow](#daily-workflow)
3. [Collaboration Workflow](#collaboration-workflow)
4. [Common Git Commands](#common-git-commands)
5. [Branch Management](#branch-management)
6. [Troubleshooting](#troubleshooting)
7. [Best Practices](#best-practices)

## 🚀 Getting Started

### First Time Setup
```bash
# Clone the repository (only do this once)
git clone https://github.com/SP-CET-Capstone/ay2526s1-capstone-assignment-group-one.git

# Navigate to the project directory
cd ay2526s1-capstone-assignment-group-one

# Check which branch you're on
git branch

# Switch to your feature branch (replace 'your_name' with your actual name)
git checkout -b feature/anatoli_v1 origin/feature/anatoli_v1
```

### Configure Git (if not done already)
```bash
# Set your name and email
git config --global user.name "Your Full Name"
git config --global user.email "your.email@example.com"

# Verify your configuration
git config --list
```

## 🔄 Daily Workflow

### Every Time You Start Coding
```bash
# 1. Pull latest changes from your branch
git pull origin feature/anatoli_v1

# 2. Check status to see if everything is clean
git status
```

### After Making Changes
```bash
# 1. See what files you've changed
git status

# 2. Add your changes to staging
git add .                    # Add all changes
# OR add specific files:
git add filename.py          # Add specific file
git add src/                 # Add entire directory

# 3. Commit with a descriptive message
git commit -m "Add user authentication feature"

# 4. Push to GitHub
git push origin feature/anatoli_v1
```

## 👥 Collaboration Workflow

### Working with Team Members
```bash
# 1. Always pull before starting work
git pull origin feature/anatoli_v1

# 2. Make your changes and commit them
git add .
git commit -m "Implement login validation"
git push origin feature/anatoli_v1

# 3. When ready to merge, create a Pull Request on GitHub
# Go to: https://github.com/SP-CET-Capstone/ay2526s1-capstone-assignment-group-one
# Click "Compare & pull request" for your branch
```

### Merging Changes from Main/Develop
```bash
# 1. Switch to main branch
git checkout main

# 2. Pull latest changes
git pull origin main

# 3. Switch back to your feature branch
git checkout feature/anatoli_v1

# 4. Merge main into your branch
git merge main

# 5. Resolve any conflicts if they occur
# 6. Push the updated branch
git push origin feature/anatoli_v1
```

## 🛠️ Common Git Commands

### Basic Commands
```bash
git status                  # Show working directory status
git add <file>             # Add file to staging area
git commit -m "message"    # Commit staged changes
git push <remote> <branch> # Push commits to remote repository
git pull <remote> <branch> # Pull and merge changes from remote
git log --oneline          # Show commit history (compact)
git log --graph            # Show commit history with graph
git diff                   # Show unstaged changes
git diff --staged          # Show staged changes
```

### Branch Commands
```bash
git branch                 # List local branches
git branch -a              # List all branches (local + remote)
git branch <name>          # Create new branch
git checkout <branch>      # Switch to branch
git checkout -b <name>     # Create and switch to new branch
git merge <branch>         # Merge branch into current branch
git branch -d <branch>     # Delete local branch
```

### Remote Commands
```bash
git remote -v              # Show remote repositories
git fetch <remote>         # Download objects from remote
git pull <remote> <branch> # Fetch and merge from remote
git push <remote> <branch> # Push to remote repository
```

## 🌿 Branch Management

### Branch Naming Convention
- `main` - Production-ready code
- `develop` - Development integration branch
- `feature/anatoli_v1` - Your personal feature branch
- `hotfix/issue_description` - Emergency fixes

### Creating a New Feature Branch
```bash
# 1. Make sure you're on develop branch
git checkout develop
git pull origin develop

# 2. Create and switch to new feature branch
git checkout -b feature/new_feature_name

# 3. Make your changes, commit, and push
git add .
git commit -m "Add new feature"
git push origin feature/new_feature_name
```

## 🚨 Troubleshooting

### Common Issues and Solutions

#### "Your branch is behind 'origin/main'"
```bash
# Pull latest changes
git pull origin main
```

#### Merge Conflicts
```bash
# 1. Git will show you which files have conflicts
git status

# 2. Open conflicted files and resolve conflicts manually
# Look for <<<<<<< HEAD, =======, and >>>>>>> markers

# 3. After resolving, add and commit
git add .
git commit -m "Resolve merge conflicts"
```

#### "Permission denied" when pushing
```bash
# Check if you have write access to the repository
# Make sure you're using the correct remote URL
git remote -v

# If using HTTPS, you might need to authenticate
# If using SSH, check your SSH keys
```

#### Undo last commit (but keep changes)
```bash
git reset --soft HEAD~1
```

#### Undo last commit (and discard changes)
```bash
git reset --hard HEAD~1
```

#### Discard all local changes
```bash
git checkout -- .
```

## ✅ Best Practices

### Commit Messages
- Use present tense: "Add feature" not "Added feature"
- Be descriptive: "Fix user authentication bug" not "Fix bug"
- Keep under 50 characters for the first line
- Use imperative mood: "Add", "Fix", "Update", "Remove"

### When to Commit
- Commit logical units of work
- Commit frequently (small commits are better than big ones)
- Don't commit broken code
- Test your code before committing

### Before Pushing
- Always pull first: `git pull origin feature/anatoli_v1`
- Make sure your code compiles/runs
- Run any tests if available
- Check `git status` to see what you're about to push

### Branch Hygiene
- Keep your feature branch up to date with main/develop
- Delete feature branches after they're merged
- Don't work directly on main or develop branches
- Use descriptive branch names

## 🔗 Useful Resources

- [Git Official Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Conventional Commits](https://www.conventionalcommits.org/)

## 📝 Quick Reference Card

### Daily Commands
```bash
git pull origin feature/anatoli_v1    # Start of day
git add .                               # After changes
git commit -m "message"                 # After changes
git push origin feature/anatoli_v1    # End of day
```

### Status Check
```bash
git status                              # What's changed?
git log --oneline -5                    # Recent commits
git branch                              # Which branch?
```

### Emergency Commands
```bash
git stash                               # Save changes temporarily
git stash pop                           # Restore stashed changes
git checkout -- .                       # Discard all changes
git reset --hard HEAD~1                 # Undo last commit
```

---

**Remember**: When in doubt, use `git status` to see what's happening in your repository!

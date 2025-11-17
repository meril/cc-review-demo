# Claude Code Review Demo

Simple authentication module for demonstrating Claude Code PR collaboration summaries.

## Purpose

This repo demonstrates a new Claude Code feature that automatically generates:
- **Short summaries** for PR descriptions (human-readable, focused on what changed)
- **Verbose context** for AI-assisted code review (detailed decisions, rationale, alternatives)

## Demo Walkthrough

### Prerequisites
- You're on the `feature/add-password-validation` branch with password validation already implemented
- Custom slash commands are installed in `~/.claude/commands/` (`/ship` and `/review-pr`)

### Part 1: Author Flow - Creating PR with Context (2-3 minutes)

**What you'll show:** How an author can use `/ship` to automatically generate PR summaries without manual copy/paste.

**Steps:**

1. **Show the current state:**
   ```bash
   git status
   git diff main...HEAD --stat
   ```
   Point out: "I've implemented password validation with bcrypt. Now I want to create a PR."

2. **Run `/ship` command:**
   ```
   /ship
   ```

3. **Review the short summary:**
   Claude will generate and show you ONLY the short summary with:
   - "📋 Development Context from Claude Code"
   - What you asked for
   - How Claude implemented it
   - Decisions made together
   - Files changed

4. **Highlight the UX improvement:**
   Point out: "Notice Claude only shows me the short summary. The verbose context for AI reviewers is generated but hidden - I don't have to review it unless I want to."

5. **Show the options:**
   ```
   Options:
   [c] Create PR with summaries as shown
   [v] View the verbose context before creating PR  ← Optional!
   [e] Edit the summaries
   [r] Regenerate with different focus
   [s] Skip summaries (create basic PR only)
   ```

6. **Choose `[c]` to create PR:**
   Claude automatically:
   - Creates the PR with short summary in description
   - Adds verbose context as a comment
   - Both are in collapsed `<details>` blocks

7. **Show the created PR on GitHub:**
   - Open the PR URL Claude provides
   - Show the collapsed short summary in the description
   - Scroll to comments and show the collapsed verbose context
   - Point out the footer: "How to use this context: In Claude Code, use the `/review-pr` command..."

### Part 2: Reviewer Flow - Using Context for Q&A (2-3 minutes)

**What you'll show:** How a reviewer can use `/review-pr` to automatically fetch PR context and ask questions.

**Steps:**

1. **Start fresh Claude Code session** (simulate a new reviewer):
   You can do this in the same window - just explain "Now I'm a reviewer looking at this PR"

2. **Run `/review-pr` command:**
   ```
   /review-pr
   ```

3. **Paste the PR URL:**
   Claude asks: "Please provide the GitHub PR URL you'd like to review."

   Paste: `https://github.com/meril/cc-review-demo/pull/2`

4. **Claude automatically fetches everything:**
   Point out: "No manual copy/paste needed! Claude uses `gh` CLI to fetch the PR details and verbose context automatically."

5. **Ask a technical question:**
   Example questions to demonstrate:
   - "Why did they choose bcrypt over SHA-256?"
   - "Why are the utility functions exported separately?"
   - "What security best practices were followed?"

6. **Show Claude's context-aware answer:**
   Claude will answer using the verbose context that explains:
   - The original decision rationale
   - What alternatives were considered
   - Why alternatives were rejected
   - Implementation details

### Key Talking Points

**For Product/UX folks:**
- Authors don't need to manually write PR descriptions
- Reviewers don't need to manually copy/paste context
- Everything is automated via slash commands
- Context is collapsed by default (not overwhelming)

**For Engineers:**
- Uses `gh` CLI for automation
- Custom slash commands in `~/.claude/commands/`
- Verbose context includes decision rationale, alternatives considered, implementation details
- Works with existing GitHub workflow

**Why this matters:**
- Reduces context loss between author and reviewer
- Makes AI-assisted reviews more effective
- Saves time for both authors and reviewers
- Captures the "why" behind decisions, not just the "what"

# Folder Renumbering Prompt for AI Assistant

Copy and paste this entire prompt when you need to renumber ECMAScript folders to match the mind map structure:

---

## Task: Renumber ECMAScript Folders to Match Mind Map Categories

I need you to renumber all folders in `03. JavaScript/01. ECMAScript (ES)/` so they are physically adjacent according to their mind map category groupings.

### Source of Truth

The correct structure is defined in `00. ECMAScript Mind Map.md`. **Read this file first** to understand the category groupings. The mind map defines which folder numbers belong to which category.

### Your Task

1. **Read the mind map file** (`00. ECMAScript Mind Map.md`) and extract:

   - All category sections (FOUNDATION, DATA & TYPES, OPERATIONS, etc.)
   - The folder numbers that should be in each category
   - The expected sequential order within each category

2. **Analyze current folder structure**:

   - List all numbered folders (01, 02, 03, etc.)
   - Identify which folders are currently NOT adjacent to others in their category

3. **Create a renumbering plan**:

   - Compare current folder positions with the mind map requirements
   - Determine which folders need to be moved/renumbered
   - Create the renumbering map dynamically (do NOT use hardcoded old→new mappings)
   - Work backwards from highest numbers to avoid conflicts

4. **Execute the renumbering** in two phases:

   - Phase 1: Rename all affected folders to temporary names (e.g., `TEMP_XX. Folder Name`) working backwards from highest numbers to avoid conflicts
   - Phase 2: Rename from temporary names to final numbered names according to mind map

5. **Update the mind map file** (if needed):

   - Only if the mind map structure diagram needs updates based on actual folder names
   - Verify the mind map accurately reflects the new folder numbers

6. **Update internal references**:

   - Search for folder path references in markdown files (look for patterns like `../XX. Folder Name/` or `[XX. Folder Name](../XX. Folder Name/)`)
   - Update these references to match new folder numbers
   - Pay special attention to files in the ECMAScript Versions folder

7. **Verify**:
   - All folders are numbered sequentially (01, 02, 03...)
   - Folders within the same mind map category are physically adjacent
   - The mind map file structure matches the actual folder structure
   - No broken links remain

### Important Rules

- **Do NOT use hardcoded old→new mappings** - always read from the mind map first
- **Folders 01-07 remain unchanged** unless the mind map indicates otherwise
- **Preserve folder names exactly** - only change the numbers
- **Support new categories** - if the mind map has new categories, include them in the renumbering
- **Support new folders** - if new folders exist that aren't in the mind map yet, you may need to ask the user or add them appropriately
- **Work backwards** when renaming to avoid conflicts
- **Use temporary names** as an intermediate step

### Expected Result

After completion, folders should be numbered sequentially and grouped physically adjacent according to their mind map categories. For example:

- If DATA & TYPES includes folders 04-09 in the mind map, they should be physically adjacent (04, 05, 06, 07, 08, 09)
- If ADVANCED LANGUAGE FEATURES includes folders 18-24 in the mind map, they should be physically adjacent (18, 19, 20, 21, 22, 23, 24)
- And so on for all categories

### Handling Edge Cases

- **New folders not in mind map**: Ask the user which category they belong to, or add them to the end if unsure
- **Mind map categories changed**: Follow the mind map as the source of truth, update accordingly
- **Missing folders**: If mind map references folders that don't exist, inform the user

---

**Execute this task now. Read the mind map file first, then determine the renumbering plan dynamically based on what you find.**

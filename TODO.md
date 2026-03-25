# TrackerGFA Navigation Fix - TODO

## Plan: Fix dashboard navigation (path mismatches + broken sidebar links)


- Dashboard: `<a href=''>` → `<Link to='/Dashboard'>`
- Ensure AddUser Link matches route: `/Dashboard/add-user`

### [ ] Step 3: Fix login.jsx navigation
- `navigate('/dashboard')` → `navigate('/Dashboard')`

### [ ] Step 4: Test full flow
**Run**: `npm run dev`

Expected:
1. Login → Dashboard ✓
2. Sidebar "Ajouter un utilisateur" → AddUser ✓  
3. Sidebar "Dashboard" → Back to dashboard ✓
4. Browser back button → Dashboard reloads ✓

### [ ] Step 5: Complete task

### [ ] Step 5: Complete task
- Update this TODO with ✓
- attempt_completion

**Current: Ready for edits**

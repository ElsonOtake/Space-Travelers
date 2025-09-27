# Security Vulnerabilities Upgrade Plan

## Current Status
- **Total Vulnerabilities**: 21 (7 high, 14 moderate)
- **Already Fixed**: ws package vulnerability (PR #92)

## Priority 1: HIGH SEVERITY - Axios (3 vulnerabilities)
### Current Version: 0.27.2 → Target: 1.12.2+
### Vulnerabilities:
- CSRF (Cross-Site Request Forgery) - GHSA-wf5p-g6vw-rhxx
- SSRF and Credential Leakage - GHSA-jr5f-v2jv-69x6
- DoS via lack of data size check - GHSA-4hjh-wcwx-xvwj

### Upgrade Steps:
1. Create branch: `fix-axios-vulnerabilities`
2. Update package.json: `"axios": "^1.12.2"`
3. Run `npm install`
4. Test API calls in:
   - `src/redux/api.js` - SpaceX API calls
   - Verify missions and rockets data loading
5. Update any axios configuration if needed
6. Run full test suite

### Potential Breaking Changes:
- Response interceptor API changes
- Config option changes
- Error handling modifications

---

## Priority 2: MODERATE - Stylelint (PostCSS vulnerabilities)
### Current Version: 13.13.1 → Target: 16.24.0+
### Vulnerabilities:
- PostCSS line return parsing error - GHSA-7fh5-64p2-3v2j

### Upgrade Steps:
1. Create branch: `upgrade-stylelint`
2. Update devDependencies:
   ```json
   "stylelint": "^16.24.0",
   "stylelint-config-standard": "^36.0.0",
   "stylelint-scss": "^6.0.0"
   ```
3. Update `.stylelintrc.json` for new syntax
4. Fix any linting errors
5. Ensure GitHub Actions workflow still passes

### Potential Breaking Changes:
- Config file format changes
- Rule name changes
- Plugin compatibility

---

## Priority 3: COMPLEX - React Scripts (Multiple dependencies)
### Current Version: 5.0.1
### Vulnerabilities:
- nth-check regex vulnerability
- webpack-dev-server source code exposure
- Multiple build tool vulnerabilities

### Options:

#### Option A: Update React Scripts (Risky)
- May break the entire build system
- Not recommended due to Create React App deprecation

#### Option B: Migrate to Vite (Recommended)
1. Create branch: `migrate-to-vite`
2. Install Vite and dependencies
3. Convert configuration
4. Update import paths
5. Migrate environment variables
6. Update scripts in package.json
7. Full regression testing

#### Option C: Eject and Manual Fix (Last Resort)
- Run `npm run eject`
- Manually update all vulnerable dependencies
- Maintain custom webpack config

---

## Implementation Schedule

### Phase 1: Immediate (This Week)
- [ ] Merge PR #92 (ws vulnerability fix)
- [ ] Fix Axios vulnerabilities (HIGH priority)
- [ ] Test thoroughly in development and staging

### Phase 2: Short-term (Next Week)
- [ ] Upgrade Stylelint and related packages
- [ ] Update linting configurations
- [ ] Ensure CI/CD compatibility

### Phase 3: Medium-term (Within Month)
- [ ] Evaluate Vite migration feasibility
- [ ] Create proof of concept branch
- [ ] Plan full migration if successful
- [ ] Alternative: Research other React build tools

---

## Testing Requirements

### For Each Upgrade:
1. **Unit Tests**: Run `npm test`
2. **Build Test**: Run `npm run build`
3. **Development Server**: Run `npm start`
4. **Linting**: Run `npx eslint .` and `npx stylelint "**/*.{css,scss}"`
5. **Manual Testing**:
   - Load rockets page
   - Load missions page
   - Test reservation/join functionality
   - Verify My Profile displays correctly
6. **Heroku Deployment**: Test on staging environment

---

## Risk Mitigation

1. **Create separate PRs** for each major upgrade
2. **Test in isolated branches** before merging
3. **Keep backups** of working package-lock.json
4. **Document all changes** in PR descriptions
5. **Have rollback plan** for each upgrade
6. **Consider staging environment** for testing

---

## NPM Version Update
As noted, NPM should be updated globally:
```bash
npm install -g npm@11.6.1
```
This won't affect the project directly but ensures better security and performance.

---

## Success Metrics
- [ ] All HIGH severity vulnerabilities resolved
- [ ] No breaking changes in production
- [ ] All tests passing
- [ ] Successful Heroku deployment
- [ ] No regression in functionality
# Quick Start Guide - Deploy in 15 Minutes

## Pre-Deployment (5 minutes)

1. **Update `.env` file:**
   ```env
   VITE_SITE_URL=https://yourdomain.com
   ```

2. **Update `public/sitemap.xml`:**
   - Find & Replace: `https://mywebsite.com` → `https://yourdomain.com`

3. **Update `public/robots.txt` line 6:**
   ```
   Sitemap: https://yourdomain.com/sitemap.xml
   ```

4. **Create `public/og-image.png`:**
   - Size: 1200x630px
   - Content: Logo + "Smart Tools Hub" + "19+ Free Tools"
   - Tool: Canva.com (free)

---

## Build (2 minutes)

```bash
npm run build
```

Wait for: `✓ built in X.XXs`

---

## Upload to InfinityFree (5 minutes)

### Files to Upload:
From `dist/` folder to `/htdocs/`:
- ✅ `index.html`
- ✅ `assets/` folder (all files)
- ✅ `favicon.ico`
- ✅ `robots.txt`
- ✅ `sitemap.xml`
- ✅ `og-image.png`

From project root to `/htdocs/`:
- ✅ `.htaccess`

### FTP Details:
- Host: `ftpupload.net`
- Username: [from InfinityFree]
- Password: [from InfinityFree]
- Port: 21

---

## Test (2 minutes)

Visit these URLs:
1. `https://yourdomain.com/` - Homepage
2. `https://yourdomain.com/compound-interest` - Tool page
3. `https://yourdomain.com/sitemap.xml` - Sitemap
4. `https://yourdomain.com/robots.txt` - Robots file

**All working?** ✅ You're live!

---

## Submit to Google (1 minute)

1. Go to: https://search.google.com/search-console
2. Add property: `https://yourdomain.com`
3. Verify (upload HTML file)
4. Submit sitemap: `https://yourdomain.com/sitemap.xml`

---

## Done! 🎉

Your site is now live and SEO-optimized.

**Next:** See `IMPLEMENTATION-SUMMARY.md` for detailed next steps.

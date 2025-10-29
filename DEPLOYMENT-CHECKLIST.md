# Pre-Deployment Checklist

Use this checklist to ensure everything is ready before going live.

---

## ☑️ BEFORE YOU BUILD

### Configuration Files
- [ ] Updated `.env` with actual domain (`VITE_SITE_URL=https://yourdomain.com`)
- [ ] Replaced `https://mywebsite.com` in `public/sitemap.xml`
- [ ] Replaced sitemap URL in `public/robots.txt`
- [ ] Created `public/og-image.png` (1200x630px)

### Code Review
- [ ] Tested all tools locally work correctly
- [ ] All forms submit properly
- [ ] Navigation links work
- [ ] No console errors (F12 → Console)
- [ ] Mobile responsive checked

---

## ☑️ BUILD PROCESS

### Run Build
```bash
npm run build
```

### Verify Build Output
- [ ] `dist/index.html` exists (should be ~2-3KB)
- [ ] `dist/assets/` folder contains CSS and JS files
- [ ] `dist/sitemap.xml` exists
- [ ] `dist/robots.txt` exists
- [ ] `dist/favicon.ico` exists
- [ ] No build errors in terminal
- [ ] Bundle sizes look reasonable (<300KB per chunk)

### Test Build Locally (Optional)
```bash
npm run preview
```
- [ ] Preview works at http://localhost:4173
- [ ] All pages load correctly
- [ ] Routing works (no 404s)

---

## ☑️ INFINITYFREE SETUP

### Account Setup
- [ ] InfinityFree account created
- [ ] Website created in control panel
- [ ] Domain configured (or using InfinityFree subdomain)
- [ ] FTP credentials noted

### SSL Configuration
- [ ] SSL certificate installed (from control panel)
- [ ] Waited 5-10 minutes for SSL activation
- [ ] HTTPS working when visiting domain

---

## ☑️ FILE UPLOAD

### FTP Connection
- [ ] Connected to FTP (ftpupload.net)
- [ ] Navigated to `/htdocs/` directory
- [ ] Deleted default InfinityFree files

### Upload from `dist/` to `/htdocs/`
- [ ] `index.html` uploaded
- [ ] `assets/` folder uploaded (all files)
- [ ] `favicon.ico` uploaded
- [ ] `robots.txt` uploaded
- [ ] `sitemap.xml` uploaded
- [ ] `og-image.png` uploaded (if created)
- [ ] `placeholder.svg` uploaded

### Upload from Project Root to `/htdocs/`
- [ ] `.htaccess` uploaded (CRITICAL!)

### Verify Upload
- [ ] All files show correct size (not 0 bytes)
- [ ] Timestamps are recent
- [ ] No upload errors

---

## ☑️ TESTING DEPLOYED SITE

### Basic Functionality
- [ ] Homepage loads: `https://yourdomain.com/`
- [ ] No "Index of /" listing (shows your site)
- [ ] CSS styles applied correctly
- [ ] Navigation menu works

### Tool Pages (Test at least 5)
- [ ] `/compound-interest` loads
- [ ] `/bmi-calculator` loads
- [ ] `/password-generator` loads
- [ ] `/currency-converter` loads
- [ ] `/qr-generator` loads
- [ ] Direct URL access works (refresh page, no 404)

### Static Files
- [ ] `/sitemap.xml` displays XML
- [ ] `/robots.txt` displays text
- [ ] Favicon appears in browser tab

### Mobile Testing
- [ ] Open site on mobile device
- [ ] All tools work on mobile
- [ ] Navigation menu accessible
- [ ] Buttons are tap-friendly

### Browser Testing
- [ ] Chrome/Edge - works
- [ ] Firefox - works
- [ ] Safari (if available) - works

---

## ☑️ SEO VERIFICATION

### Meta Tags
- [ ] View page source (Ctrl+U)
- [ ] `<title>` tag present
- [ ] `<meta name="description">` present
- [ ] `<meta property="og:*">` tags present
- [ ] Canonical URL correct

### Sitemap & Robots
- [ ] `robots.txt` accessible at `/robots.txt`
- [ ] `sitemap.xml` accessible at `/sitemap.xml`
- [ ] Sitemap contains all 19 tool URLs
- [ ] All URLs in sitemap are correct domain

### Social Media Preview
- [ ] Test Open Graph: https://www.opengraph.xyz/
- [ ] Paste your URL
- [ ] Verify title, description, image appear correctly

---

## ☑️ SEARCH ENGINE SUBMISSION

### Google Search Console
- [ ] Account created/logged in
- [ ] Property added (yourdomain.com)
- [ ] Ownership verified
- [ ] Sitemap submitted
- [ ] Homepage URL submitted for indexing

### Bing Webmaster Tools
- [ ] Account created/logged in
- [ ] Site added
- [ ] Ownership verified
- [ ] Sitemap submitted

### Optional
- [ ] Yandex Webmaster submitted
- [ ] DuckDuckGo (auto-indexed from Bing)

---

## ☑️ ANALYTICS & MONITORING

### Google Analytics
- [ ] Tracking code in `index.html` verified
- [ ] Real-time visitors showing when you visit site
- [ ] Events tracking properly

### Optional Tools
- [ ] Microsoft Clarity installed (free heatmaps)
- [ ] Google Tag Manager configured
- [ ] UptimeRobot monitoring set up (free)

---

## ☑️ PERFORMANCE TESTING

### Speed Tests
- [ ] Google PageSpeed Insights tested: https://pagespeed.web.dev/
  - [ ] Mobile score > 80
  - [ ] Desktop score > 90
- [ ] GTmetrix tested: https://gtmetrix.com/
  - [ ] Grade A or B

### SEO Tests
- [ ] Mobile-friendly test passed: https://search.google.com/test/mobile-friendly
- [ ] Rich results valid: https://search.google.com/test/rich-results
- [ ] SSL Labs A rating: https://www.ssllabs.com/ssltest/

---

## ☑️ OPTIONAL ENHANCEMENTS

### Cloudflare Setup (Recommended)
- [ ] Cloudflare account created
- [ ] Domain added to Cloudflare
- [ ] Nameservers updated
- [ ] SSL/TLS mode: Full
- [ ] Auto-minify enabled (JS, CSS, HTML)
- [ ] Caching configured

### Content
- [ ] Added FAQ to homepage
- [ ] Added "About" section
- [ ] Contact information added
- [ ] Privacy policy created
- [ ] Terms of service created

### Marketing
- [ ] Shared on social media (Twitter, LinkedIn, Reddit)
- [ ] Submitted to Product Hunt
- [ ] Posted in relevant subreddits
- [ ] Reached out to bloggers in niche

---

## ☑️ POST-LAUNCH MONITORING

### Week 1
- [ ] Check Google Search Console daily
- [ ] Fix any errors reported
- [ ] Monitor site uptime
- [ ] Test all tools daily

### Week 2-4
- [ ] Check indexing status
- [ ] Monitor keyword rankings
- [ ] Review analytics data
- [ ] Respond to any user feedback

### Month 2-3
- [ ] Analyze traffic sources
- [ ] Identify top-performing tools
- [ ] Create content for high-traffic pages
- [ ] Build backlinks

---

## ☑️ TROUBLESHOOTING

If any checkbox fails, consult:
1. `INFINITYFREE-DEPLOYMENT.md` - Troubleshooting section
2. InfinityFree Forum: https://forum.infinityfree.net/
3. Browser console (F12) for JavaScript errors
4. Server error logs (in cPanel if available)

---

## ✅ FINAL CHECKLIST

Before considering deployment complete:
- [ ] Site loads fast (<3 seconds)
- [ ] All 19 tools work correctly
- [ ] No 404 errors anywhere
- [ ] Mobile responsive
- [ ] SSL certificate active (HTTPS)
- [ ] Sitemap submitted to Google
- [ ] Analytics tracking
- [ ] No console errors
- [ ] Meta tags present on all pages
- [ ] Social media preview looks good

---

## 🎉 LAUNCH!

When all boxes are checked:
- [ ] Announce on social media
- [ ] Share with friends and family
- [ ] Submit to tool directories
- [ ] Start content marketing
- [ ] Monitor and iterate

---

## 📊 Success Metrics

Track these metrics weekly:
- Visitors (Google Analytics)
- Indexed pages (Search Console)
- Keyword rankings (Search Console)
- Page speed scores
- Error rate (Search Console)
- Conversion rate (if applicable)

**Target Month 1:**
- 100-500 total visitors
- 10-15 pages indexed
- Top 3 keywords in position 20-50
- No critical errors

**Celebrate!** You've successfully launched a fully optimized web application. 🚀

---

**Print this checklist and check off items as you complete them.**

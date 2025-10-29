# InfinityFree Deployment Guide for Smart Tools Hub

This guide provides complete, step-by-step instructions for deploying your Smart Tools Hub to InfinityFree hosting.

## Prerequisites

1. InfinityFree hosting account (free at https://infinityfree.net)
2. Node.js installed on your local machine
3. FTP client (FileZilla recommended) or use InfinityFree's file manager

---

## Step 1: Update Environment Variables

1. Open `.env` file in your project root
2. Replace `https://mywebsite.com` with your actual InfinityFree domain:
   ```
   VITE_SITE_URL=https://yourdomain.infinityfreeapp.com
   ```
   or if you have a custom domain:
   ```
   VITE_SITE_URL=https://yourdomaincom
   ```

---

## Step 2: Update Sitemap and Robots.txt

### Update Sitemap (`public/sitemap.xml`)
Replace all instances of `https://mywebsite.com` with your actual domain:
```bash
# Use find and replace in your editor
Find: https://mywebsite.com
Replace: https://yourdomain.infinityfreeapp.com
```

### Update Robots.txt (`public/robots.txt`)
Update the Sitemap URL on line 6:
```
Sitemap: https://yourdomain.infinityfreeapp.com/sitemap.xml
```

---

## Step 3: Build Production Version

Run the following commands in your project directory:

```bash
# Install dependencies (if not already done)
npm install

# Build for production
npm run build
```

This creates an optimized `dist/` folder with all your production files.

---

## Step 4: Prepare Files for Upload

The `dist/` folder contains:
- `index.html` - Main HTML file
- `assets/` - JS, CSS, and image files
- `og-image.png` - Social media preview image
- `sitemap.xml` - Search engine sitemap
- `robots.txt` - Search engine instructions
- `favicon.ico` - Website icon

---

## Step 5: Upload to InfinityFree

### Option A: Using FTP (FileZilla)

1. **Get FTP Credentials from InfinityFree:**
   - Login to your InfinityFree account
   - Go to "Accounts" → Select your website → "FTP Details"
   - Note: Hostname, Username, Password

2. **Connect with FileZilla:**
   - Host: `ftpupload.net` or your specific FTP host
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21

3. **Upload Files:**
   - Navigate to `/htdocs/` folder on the remote server
   - Delete any default files in `htdocs` (like `default.php`)
   - Upload ALL contents of your `dist/` folder to `htdocs/`
   - Upload `.htaccess` file from project root to `htdocs/`

### Option B: Using InfinityFree File Manager

1. Login to InfinityFree Control Panel
2. Go to "File Manager"
3. Navigate to `/htdocs/` directory
4. Delete default files
5. Click "Upload Files" and upload all contents from `dist/` folder
6. Upload `.htaccess` file separately

---

## Step 6: Upload .htaccess File

The `.htaccess` file is CRITICAL for React Router to work properly.

1. Upload the `.htaccess` file from your project root to `/htdocs/`
2. Verify it's in the same directory as `index.html`
3. If you encounter issues, check that `.htaccess` contains:
   ```apache
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule . /index.html [L]
   ```

---

## Step 7: Configure SSL (HTTPS)

InfinityFree provides free SSL certificates:

1. Go to InfinityFree Control Panel
2. Navigate to "SSL Certificates"
3. Click "Install SSL Certificate"
4. Wait 5-10 minutes for activation

**Note:** If you're using a custom domain, ensure:
- Domain nameservers point to InfinityFree
- Wait 24-48 hours for DNS propagation

---

## Step 8: Test Your Website

Visit your website URL and test:

### Critical Tests:
1. **Homepage loads:** `https://yourdomain.com/`
2. **Direct URL access works:** `https://yourdomain.com/compound-interest`
3. **Navigation works:** Click through all tools
4. **No 404 errors:** Refresh on any tool page
5. **Mobile responsive:** Test on mobile device

### SEO Tests:
1. View page source and verify meta tags
2. Check `https://yourdomain.com/sitemap.xml` loads
3. Check `https://yourdomain.com/robots.txt` loads

---

## Step 9: Submit to Search Engines

### Google Search Console
1. Go to https://search.google.com/search-console
2. Add your property (domain or URL prefix)
3. Verify ownership (upload HTML file or DNS method)
4. Submit sitemap: `https://yourdomain.com/sitemap.xml`

### Bing Webmaster Tools
1. Go to https://www.bing.com/webmasters
2. Add your site
3. Verify ownership
4. Submit sitemap

---

## Step 10: Monitor and Optimize

### Performance Testing
- Google PageSpeed Insights: https://pagespeed.web.dev/
- GTmetrix: https://gtmetrix.com/
- Target: 90+ score on mobile and desktop

### SEO Testing
- Test structured data: https://search.google.com/test/rich-results
- Check mobile-friendliness: https://search.google.com/test/mobile-friendly
- Verify social media previews: https://www.opengraph.xyz/

---

## Troubleshooting Common Issues

### Issue 1: 404 Errors on Tool Pages
**Solution:** Verify `.htaccess` is uploaded and contains React Router rewrite rules

### Issue 2: CSS/JS Not Loading
**Solution:** Check that `assets/` folder uploaded correctly. Verify file permissions (755 for folders, 644 for files)

### Issue 3: Images Not Loading
**Solution:**
- Check image paths in code
- Verify images are in `assets/` folder
- Convert large images to WebP format

### Issue 4: Slow Loading
**Solution:**
- Enable GZIP compression (already in .htaccess)
- Optimize images (use tools like TinyPNG)
- Use browser caching (already configured)

### Issue 5: SSL Certificate Not Working
**Solution:**
- Wait 5-10 minutes after installation
- Clear browser cache
- Contact InfinityFree support if issues persist

---

## File Structure on InfinityFree

Your `/htdocs/` folder should look like this:
```
htdocs/
├── .htaccess
├── index.html
├── favicon.ico
├── robots.txt
├── sitemap.xml
├── og-image.png
└── assets/
    ├── index-[hash].js
    ├── index-[hash].css
    ├── [other-assets].js
    └── hero-background-[hash].jpg
```

---

## Important Notes

1. **Always backup your files** before making changes
2. **DNS changes take 24-48 hours** to propagate
3. **InfinityFree has limitations:**
   - 10GB storage (more than enough for this site)
   - Unlimited bandwidth
   - May have occasional downtime
   - No Node.js backend support (only static files)

4. **For better performance** consider:
   - Using Cloudflare as CDN (free)
   - Upgrading to paid hosting for production sites
   - Implementing PWA for offline access

---

## Updating Your Website

To update your website after changes:

1. Make changes to your local code
2. Run `npm run build`
3. Upload only changed files from `dist/` to `/htdocs/`
4. Clear browser cache to see changes

---

## Environment Variables Reference

| Variable | Purpose | Example |
|----------|---------|---------|
| `VITE_SITE_URL` | Your website URL | `https://yourdomain.com` |
| `VITE_SUPABASE_URL` | Supabase API URL | Auto-configured |
| `VITE_SUPABASE_ANON_KEY` | Supabase public key | Auto-configured |

---

## Additional Resources

- InfinityFree Documentation: https://forum.infinityfree.net/
- React Router Docs: https://reactrouter.com/
- Vite Deployment Guide: https://vitejs.dev/guide/static-deploy.html

---

## Support

If you encounter issues:
1. Check InfinityFree forum: https://forum.infinityfree.net/
2. Review `.htaccess` configuration
3. Check browser console for errors (F12 → Console tab)
4. Verify all files uploaded correctly

---

**Deployment Complete!** Your Smart Tools Hub is now live and SEO-optimized.

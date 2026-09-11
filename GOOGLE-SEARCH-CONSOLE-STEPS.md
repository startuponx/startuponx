# How to get Google to index your site — Do this TODAY

## Step 1: Add Google Search Console (15 minutes)

1. Go to: https://search.google.com/search-console/
2. Click "Add property"
3. Choose "URL prefix" and enter: https://startuponx.com
4. Click "HTML tag" verification method
5. Copy the meta tag — it looks like:
   <meta name="google-site-verification" content="XXXXXXXXXXXXXXXX" />
6. Open your index.html in VS Code
7. Paste that meta tag inside <head> — right after <meta charset="UTF-8">
8. Save, git add, git commit, git push
9. Wait 2-3 minutes for Cloudflare to deploy
10. Go back to Search Console and click "Verify"

## Step 2: Submit your sitemap

1. In Search Console left sidebar → click "Sitemaps"
2. In the "Add a new sitemap" box type: sitemap.xml
3. Click Submit
4. It will show "Success" within a few minutes

## Step 3: Request indexing for your homepage

1. In Search Console → URL Inspection tool (top search bar)
2. Type: https://startuponx.com
3. Click "Request Indexing"
4. Do the same for:
   - https://startuponx.com/blog.html
   - https://startuponx.com/submit.html
   - https://startuponx.com/how-it-works.html
   - https://startuponx.com/blog/how-to-build-in-public.html
   - https://startuponx.com/blog/why-list-startup-directory.html

Google will index these within 24-72 hours.

## Step 4: Add Google Analytics 4 (optional but recommended)

1. Go to: https://analytics.google.com
2. Create account → Create property → Web
3. Enter: startuponx.com
4. Get your "Measurement ID" — looks like: G-XXXXXXXXXX
5. Add this to the <head> of every page AFTER your other tags:

<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>

Replace G-XXXXXXXXXX with your actual ID.

## Step 5: Submit to Bing Webmaster Tools too

https://www.bing.com/webmasters
Same process as Google — adds Bing + Yahoo traffic.


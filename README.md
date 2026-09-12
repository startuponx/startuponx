# StartupOnX India

Your startup directory website. Clean, fast, SEO-ready.

---

## Your file structure

```
startuponx/
├── index.html          ← Homepage
├── submit.html         ← Submission form + UPI payment
├── how-it-works.html   ← How it works + FAQ
├── logo.png            ← YOUR LOGO (add this file)
├── css/
│   └── styles.css      ← All design/styles
├── js/
│   └── main.js         ← Filter, search, interactions
└── assets/
    ├── upi-qr.png      ← YOUR UPI QR CODE (add this)
    └── og-image.png    ← Social share image (add this)
```

---

## Files you must add yourself

1. **logo.png** — Your brand logo. Save it in the root folder.
2. **assets/upi-qr.png** — Screenshot of your UPI QR from GPay/PhonePe.
3. **assets/og-image.png** — A 1200×630 image that appears when you share your link on WhatsApp/Twitter.

---

## How to set up the submission form (Formspree)

The submit form sends an email to you when a founder submits.

1. Go to **formspree.io** and create a free account
2. Create a new form — it gives you a Form ID like `xyzabcde`
3. Open `submit.html`
4. Find this line: `const FORMSPREE_ID = 'YOUR_FORM_ID';`
5. Replace `YOUR_FORM_ID` with your actual Formspree ID
6. Save the file and push to GitHub

You'll now receive an email every time someone submits.

---

## How to update your domain/email in the code

Search for `startuponx.com` and `startuponx@gmail.com` across all HTML files and replace with your actual domain and email.

---

## How to push to GitHub and deploy on Cloudflare

### First time setup:
1. Install Git: https://git-scm.com
2. Install VS Code: https://code.visualstudio.com
3. Open VS Code → Open Folder → select your `startuponx` folder

### Push to GitHub:
1. Go to github.com → New repository → name it `startuponx` → Create
2. In VS Code, open the Terminal (Ctrl + `) and run:
```
git init
git add .
git commit -m "Initial site launch"
git branch -M main
git remote add origin https://github.com/YOURUSERNAME/startuponx.git
git push -u origin main
```

### Connect Cloudflare Pages:
1. Go to cloudflare.com → Pages → Create a project
2. Connect to Git → Select your GitHub repo
3. Build settings: leave blank (it's plain HTML)
4. Click Deploy

Your site is live. Every time you push to GitHub, Cloudflare updates automatically.

---


# Tender Tokens Studio — Agent Guide

## What this project is

A static, single-page marketing site for Tender Tokens Studio. No frameworks, no build tools, no bundler, no analytics, no backend. Everything is plain HTML, CSS, and vanilla JavaScript.

**File structure:**

```
index.html          — the entire site (one page)
css/styles.css      — all styles; uses CSS custom properties and Google Fonts
js/script.js        — gallery generation, prompt shuffle, confetti, scroll reveal
images/             — handmade token photos (JPEG)
.htaccess           — Apache config: HTTPS redirect, caching, security headers
robots.txt          — crawler rules
sitemap.xml         — single-page sitemap
llms.txt            — AI/LLM discovery file
```

## Rules for agents

- **Do not add frameworks, build tools, or dependencies.** This site ships as-is to Hostinger shared hosting. There is no npm, no bundler, no CI pipeline.
- **Do not add analytics or tracking scripts** unless the owner explicitly requests them.
- **Do not add a backend, database, or server-side logic** unless explicitly requested.
- **Do not change the contact email.** The inquiry email is `cmpelaez@me.com` and must be preserved in all `mailto:` links.
- **Preserve the brand voice.** Tender Tokens Studio is warm, handmade, and quietly whimsical — not corporate, not minimal, not generic. Copy should feel like it was written with a good pen on nice paper.
- **Do not alter the visual design** without an explicit design request.
- **Keep the CSS custom-property palette** (--oat, --cream, --persimmon, etc.) intact. Colors are intentional brand decisions.

## Privacy reminder for images

Before adding photos to the `images/` folder or embedding them in the page, **inspect them carefully** for:

- Readable receipt text (store names, prices, purchase details)
- Handwritten notes with personal information
- Faces or identifiable people
- Home addresses, phone numbers, or account numbers visible in paper ephemera

Blur, crop, or replace any image that reveals private details before committing.

## Deployment

Site deploys to Hostinger shared hosting. Upload files via FTP or Hostinger File Manager. The `.htaccess` handles HTTPS enforcement, www-to-non-www canonicalization, gzip, caching, and security headers.

**Live URL:** `https://tendertokensstudio.com/`

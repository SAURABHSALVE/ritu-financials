# Deploy FX:Rich website (frontend only)

This project is a **static site** — no server or backend required. WhatsApp/Telegram handle enrollment.

## Build locally

```powershell
cd frontend
npm install
npm run build
```

Static files are output to `frontend/out/`. You can upload that folder anywhere, or use a host below.

---

## Option A — Vercel (recommended)

1. Push the repo to GitHub.
2. [vercel.com](https://vercel.com) → **Add Project** → import the repo.
3. Settings:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `out`
4. Deploy. Vercel detects Next.js static export automatically.

---

## Option B — Netlify

1. Connect GitHub repo.
2. **Base directory:** `frontend`
3. **Build command:** `npm run build`
4. **Publish directory:** `frontend/out`

---

## Option C — Cloudflare Pages

1. Connect repo → **Framework preset:** Next.js (Static HTML Export)
2. **Root directory:** `frontend`
3. **Build command:** `npm run build`
4. **Build output directory:** `out`

---

## Option D — Any static host

Upload the contents of `frontend/out/` to:

- Hostinger / cPanel **public_html**
- AWS S3 + CloudFront
- GitHub Pages (from `out` folder)

Ensure **trailing slashes** work (Next config uses `trailingSlash: true`).

---

## Before you deploy

- [ ] Videos exist in `frontend/public/videos/` (run `scripts/optimize-review-videos.ps1` if needed)
- [ ] Ritu photo at `frontend/public/images/ritu.png`
- [ ] WhatsApp/Telegram links in `frontend/src/lib/contact-links.ts` are correct

No `.env` required unless you add CDN video URLs later (`NEXT_PUBLIC_VIDEO_REVIEW_*`).

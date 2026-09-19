# Sollvian AI Tech — Website

This is the official website for **Sollvian AI Tech**.  
It is a landing page that shows what the product does and lets approved users download the software (`.exe` file).

---

## 🧐 What does this website do?

- Shows a beautiful landing page with information about the product
- Has a **Download** button that is protected by an email check
- Only people with an approved email can download the `.exe` software
- The `.exe` file is stored on **Vercel Blob** (cloud file storage)
- When a user clicks download, the server redirects them directly to the file

---

## 🗂️ Project Structure (important files only)

```
sollvian-dev/
│
├── app/
│   ├── page.tsx                        ← Main page (puts all sections together)
│   ├── globals.css                     ← All the styling for the website
│   ├── layout.tsx                      ← HTML head, fonts, meta tags
│   │
│   ├── _components/
│   │   ├── Header.tsx                  ← Top navigation bar
│   │   ├── HeroSection.tsx             ← Big intro section with Download button
│   │   ├── EmailModal.tsx              ← Email popup that guards the download
│   │   ├── ProductSection.tsx          ← Product features section
│   │   ├── ContactSection.tsx          ← Contact form section
│   │   ├── Footer.tsx                  ← Bottom of the page
│   │   ├── MobileMenu.tsx              ← Navigation menu for mobile screens
│   │   └── VersionBadge.tsx            ← (Disabled) Was used to show app version
│   │
│   ├── api/
│   │   └── download/
│   │       └── route.ts                ← The download API endpoint
│   │
│   └── _lib/
│       └── sollvian_cover.jpeg         ← Cover image shown in hero section
│
├── .env.local                          ← Secret settings (NOT pushed to GitHub)
├── next.config.ts                      ← Next.js configuration
└── package.json                        ← Project dependencies
```

---

## 🔄 How the Download Flow Works

Here is the step-by-step flow when someone clicks the **Download Package** button:

1. User clicks **"Download Package"** button on the homepage
2. A popup (modal) appears asking for an **email address**
3. The email is checked against an approved list
   - ✅ If the email is approved → a **"Download Now"** button appears
   - ❌ If the email is wrong → an error message shows
4. User clicks **"Download Now"**
5. The browser goes to `/api/download` (a server endpoint)
6. The server reads the `DOWNLOAD_URL` from the environment settings
7. The server sends the user straight to the `.exe` file stored in **Vercel Blob**
8. The browser downloads the file

> 💡 The actual file link is never shown to the user — the server handles the redirect privately.

---

## ⚙️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** | The main framework — handles pages and API routes |
| **TypeScript** | Adds type safety to the code |
| **CSS (globals.css)** | All styling — no Tailwind in core layout |
| **Vercel Blob** | Cloud storage where the `.exe` file lives |
| **Vercel** | Where the website is hosted and deployed |

---

## 🚀 How to Set Up Locally (from scratch)

### Step 1 — Clone the project

```bash
git clone https://github.com/Rishi4624/Sollvian-dev.git
cd sollvian-dev
```

### Step 2 — Install dependencies

```bash
npm install
```

### Step 3 — Create the environment file

- Create a file called `.env.local` in the root of the project
- Add the following line:

```env
DOWNLOAD_URL=https://your-blob-store.public.blob.vercel-storage.com/Sollvian-Setup.exe
```

> Replace the URL with the actual public URL of your `.exe` file from Vercel Blob.  
> You get this URL after uploading the file (see Deployment section below).

### Step 4 — Run the development server

```bash
npm run dev
```

- Open your browser and go to: `http://localhost:3000`
- The website should load and the download button should work

---

## 📧 How to Add or Change Allowed Emails

The email list is inside `app/_components/EmailModal.tsx` at the top of the file:

```ts
const ALLOWED_EMAILS = new Set([
  'info@sollviantech.com',
  'divyanshu@sollviantech.com',
  'ankit.roy@sollviantech.com',
  'abhishek.goswami@sollviantech.com',
]);
```

- To **add** someone: add their email inside the `new Set([...])` list
- To **remove** someone: delete their line
- Save the file and the change is live

---

## 📦 How to Upload a New `.exe` to Vercel Blob

When you have a new version of the software to release:

1. Go to **Vercel Dashboard** → **Storage** → your Blob store → **Browse**
2. Upload the new `.exe` file
   - Use the **same filename** every time (e.g., `Sollvian-Setup.exe`)
   - This overwrites the old file and keeps the same URL → **no `.env.local` change needed**
3. Done — the download button will serve the new file automatically

> ⚠️ If you use a **different filename** (like `Sollvian-Setup-v2.exe`), the URL changes.  
> In that case, update `DOWNLOAD_URL` in `.env.local` and in your Vercel project settings.

---

## 🌐 Deployment on Vercel

### Step 1 — Push your code to GitHub

```bash
git add .
git commit -m "your message"
git push
```

### Step 2 — Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and log in
2. Click **"Add New Project"**
3. Import your GitHub repository (`Sollvian-dev`)
4. Vercel will auto-detect it as a Next.js project

### Step 3 — Add environment variables in Vercel

1. In your Vercel project → go to **Settings** → **Environment Variables**
2. Add this variable:

| Name | Value |
|---|---|
| `DOWNLOAD_URL` | `https://your-blob-store.public.blob.vercel-storage.com/Sollvian-Setup.exe` |

> This is the same value you put in `.env.local` locally.  
> `.env.local` is NOT pushed to GitHub (it's in `.gitignore`), so you must add it in Vercel manually.

### Step 4 — Deploy

- Click **Deploy**
- Vercel builds the project and gives you a live URL
- Every time you push to the `main` branch, Vercel automatically redeploys

---

## 🧪 How to Test the Build Before Deploying

Run a production build locally to make sure there are no errors:

```bash
npm run build
```

Expected output (if everything is correct):

```
✓ Compiled successfully
✓ Finished TypeScript
✓ Generating static pages (5/5)

Route (app)
┌ ○ /
├ ○ /_not-found
└ ƒ /api/download
```

- If you see this → safe to deploy ✅
- If you see TypeScript errors → fix them before pushing

---

## 🛑 Common Problems and Fixes

### ❌ 503 error on Download button

**Cause:** `DOWNLOAD_URL` is not set in `.env.local`  
**Fix:** Add `DOWNLOAD_URL=https://...your-exe-url...` to `.env.local` and restart the server

---

### ❌ "Element type is invalid" — page crashes

**Cause:** A component file was emptied or had its `export default` removed  
**Fix:** Every component file must always have an `export default function ...` — even if it returns `null`

---

### ❌ TypeScript build error about deleted API routes

**Cause:** Next.js has a stale auto-generated type file from old routes that no longer exist  
**Fix:** Delete the cache and rebuild:
```bash
Remove-Item -Recurse -Force .next
npm run build
```

---

## 📝 Notes for Developers

- The `.env.local` file is **never committed to Git** — keep secrets safe
- The download URL is only known to the server — the browser never sees the real Blob URL
- To disable the version badge: the `VersionBadge.tsx` component currently returns `null` (intentionally disabled)
- The `app/_lib/blob.ts` file exists but is no longer used — it can be deleted safely

---

## 📁 Repository

GitHub: [https://github.com/Rishi4624/Sollvian-dev](https://github.com/Rishi4624/Sollvian-dev)

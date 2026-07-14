# Setting up the owner's content editor (Decap CMS)

This project now has an admin panel at `/admin` where the café owner can log in
and edit menu prices, add/remove items, and upload a photo per item — no code,
no spreadsheets.

I've built everything that lives in the code. Four things need to happen on
your end, once, because they require your own GitHub/Netlify accounts —
I can't create accounts or click through OAuth screens on your behalf.

---

## 1. Put this project in a GitHub repository

If you don't have a GitHub account yet, make one free at github.com, then:

```bash
cd signature-square
git init
git add .
git commit -m "Initial site with CMS"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/signature-square.git
git push -u origin main
```

(Create the empty repo on GitHub first — "New repository" — then run the
commands above from inside this project folder.)

## 2. Connect that repo to your Netlify site

Your site is currently deployed by dragging the folder in manually. Git
Gateway (step 3) needs it deployed *from* the GitHub repo instead:

- Netlify dashboard → your site → **Site configuration → Build & deploy → Link repository**
- Choose GitHub, authorize Netlify, pick the `signature-square` repo, branch `main`
- Leave the build command empty and the publish directory as `/` (this is a
  static site, nothing needs to be "built")

From now on, every change pushed to `main` — including edits the owner makes
through `/admin` — auto-deploys in under a minute.

## 3. Turn on Identity + Git Gateway

Still in the Netlify dashboard for this site:

- **Identity** tab → **Enable Identity**
- Under Identity → **Registration**, set it to **Invite only** (so random
  people online can't sign themselves up as editors)
- Under Identity → **Services → Git Gateway → Enable Git Gateway**

This is what lets a logged-in owner's edits actually get saved as commits to
your GitHub repo, without him ever seeing GitHub.

## 4. Invite the owner

- Identity tab → **Invite users** → enter his email
- He'll get an email, click it, set a password
- From then on he logs in at:

  **`https://your-site.netlify.app/admin/`**

---

## What he can actually do at `/admin`

- Open "Menu" → see all 21 categories
- Click any category to edit its note, or add/remove/reorder items inside it
- Click any item to change its name, price, add a short note (like "spicy /
  regular"), toggle a "Signature" badge, or upload a photo
- Hit **Publish** — the live site updates automatically within about a minute

## About the "photo per item" request

The menu item layout now supports an optional round photo next to any item
(see the four already seeded — Signature Coffee, the ribeye, the dessert, and
the iced signature coffee — as examples). Items without a photo just show as
clean text, so he can add photos gradually rather than needing all 180 at
once — worth telling him that directly, since supplying 180 individual photos
in one go is unrealistic for most small kitchens.

## Local testing before you push

Because this now loads `content/menu.json` via `fetch()`, opening
`menu.html` by double-clicking it won't work (browsers block local file
fetches). Test it with a local server instead:

```bash
cd signature-square
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

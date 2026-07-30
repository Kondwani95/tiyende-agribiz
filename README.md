# Tiyende Agribiz website — beginner setup guide

The website already works with sample stock. Follow the steps below to connect real stock and put it online.

## Part 1: Create the Supabase stock list

1. Go to **supabase.com** and create a free account.
2. Click **New project**. Name it `tiyende-agribiz`, make a strong database password, and save that password somewhere safe.
3. Wait for the project to finish opening.
4. On the left, click **SQL Editor**, then click **New query**.
5. Open the file `supabase.sql` from this website folder. Copy everything in it, paste it into the query box, and click **Run**.
6. On the left, click **Table Editor**, then open the `stock` table. Your six products should be there.
7. To change stock later, edit the rows in this table:
   - `available` means in stock
   - `low_stock` means only a little remains
   - `unavailable` means out of stock
8. Go to **Project Settings** → **API**. Copy the **Project URL** and the **anon/public key**.
9. Open `config.js`. Paste those values between the quotation marks, then save the file.

Never put your database password or Supabase `service_role` key in this website. Only use the public `anon` key.

## Part 2: Put the website on GitHub

1. Go to **github.com** and create an account if needed.
2. Click the **+** button near the top-right and choose **New repository**.
3. Name it `tiyende-agribiz`, choose **Public**, and click **Create repository**.
4. On the new repository page, click **uploading an existing file**.
5. Drag every file from this website folder into GitHub: `index.html`, `styles.css`, `script.js`, `config.js`, `supabase.sql`, `render.yaml`, and `README.md`.
6. Click **Commit changes**. This saves the website to GitHub.

## Part 3: Publish it using Render

1. Go to **render.com** and create an account using your GitHub account.
2. Click **New +** and choose **Static Site**.
3. Select the `tiyende-agribiz` GitHub repository.
4. Enter these settings:
   - Name: `tiyende-agribiz`
   - Branch: `main`
   - Build command: leave blank (or use `echo ready` if Render requires one)
   - Publish directory: `.`
5. Click **Create Static Site**. Render will give you a public address similar to `https://tiyende-agribiz.onrender.com`.

## How to update stock

You do not need to edit the website. Sign in to Supabase, open **Table Editor** → `stock`, and edit the product rows. Reload the website to see the new information.

## Important final checks

- Open the website on your phone and computer.
- Press the WhatsApp, phone and email links to check them.
- Replace “Ask for quantity” with real quantities whenever possible.
- If you want prices shown publicly, add them only when you can keep them current. Otherwise ask customers to contact you for today's price.

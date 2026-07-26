# Panduan Deploy — Semua di Vercel

Frontend dan backend deploy jadi **satu project Vercel**, satu domain,
tanpa CORS, tanpa perlu platform kedua.

---

## Langkah 1 — Push ke GitHub

Vercel connect langsung ke repo GitHub (bukan upload manual).

---

## Langkah 2 — Import project di Vercel

1. Buka [vercel.com/new](https://vercel.com/new), pilih repo ini.
2. **Root Directory: biarkan default (root repo)** — JANGAN diarahkan ke
   `client/`. Ini penting, karena kalau Root Directory diarahkan ke
   `client/`, Vercel tidak akan melihat folder `api/` sama sekali.
3. Vercel akan otomatis membaca `vercel.json` di root:
   - Build Command: `npm run build` (build `client/` saja)
   - Output Directory: `client/dist`
   - Install Command: `npm install`
4. Folder `api/` dikenali otomatis oleh Vercel sebagai serverless
   functions — tidak perlu setting tambahan apa pun untuk ini.

## Langkah 3 — (Opsional) Environment Variables

Kalau mau form kontak mengirim email (bukan cuma tercatat di log), di tab
**Environment Variables**:
```
RESEND_API_KEY=...      # dari https://resend.com (ada free tier)
CONTACT_TO_EMAIL=...    # email tujuan notifikasi
```
Kalau dilewati saja, form kontak tetap berfungsi normal — pesannya cuma
bisa dilihat lewat **Logs**, bukan masuk email.

## Langkah 4 — Deploy

Klik **Deploy**. Selesai dalam 1-2 menit. Vercel kasih satu URL, misalnya
`https://aisyah.vercel.app` — frontend DAN `/api/*` sama-sama jalan di
domain itu.

---

## Tes setelah deploy

- Buka URL-nya, pastikan data profile/skills/projects muncul (bukan error
  "Couldn't reach the API")
- Coba submit form Contact, lalu cek **dashboard Vercel → project → Logs**,
  cari baris `[contact]` untuk pastikan pesannya masuk
- Kalau mau cek langsung: buka `https://<domain-kamu>/api/health` di
  browser, harus muncul `{"ok":true}`

---

## Kalau nanti ubah konten setelah live

Edit `api/data/content.json` di repo, commit, push — Vercel otomatis
redeploy (kalau auto-deploy dari Git aktif, yang memang default).

---

## Kenapa ini lebih simpel dari setup client+server terpisah sebelumnya

- Satu project, satu dashboard, satu URL — tidak perlu koordinasi 2 platform
- Tidak ada CORS sama sekali (client & API selalu satu origin)
- Tidak ada `VITE_API_URL` / `CLIENT_ORIGIN` yang harus disinkronkan manual
- Preview deployment (tiap PR/branch) otomatis dapat frontend + backend
  yang nyambung dengan benar, tanpa config tambahan

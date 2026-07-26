# Portfolio

Portfolio dengan konten (proyek, skill, pengalaman) yang disajikan lewat
REST API, bukan di-hardcode di komponen React — supaya gampang diubah tanpa
sentuh kode. Satu deployment Vercel: frontend statis + backend serverless
functions, satu domain, tanpa CORS.

```
portfolio/
├── api/        # Serverless functions (Express, dibungkus 1 fungsi) — profil,
│               # skill, pengalaman, proyek, form kontak
├── client/     # React + Vite + Tailwind — konsumsi API di atas
└── vercel.json # Config build untuk Vercel
```

## Menjalankan secara lokal

Butuh Node.js 18+. Semua perintah dari folder root — root sudah diatur
sebagai npm workspace yang membungkus `client/` (folder `api/` bukan
workspace, cuma kumpulan file serverless function).

```bash
npm install   # install dependency api + client sekaligus
npm run dev   # jalankan API lokal (:4000) dan frontend (:5173) bersamaan
```

Buka `http://localhost:5173`. Vite men-proxy semua request `/api/*` ke API
lokal di port 4000 (lihat `client/vite.config.ts`) — jadi kode client selalu
memanggil path relatif (`/api/profile`, dst.) baik di lokal maupun setelah
di-deploy, tidak perlu env var apa pun untuk itu.

Kalau butuh salah satunya saja:
```bash
npm run dev:api      # hanya API (tsx watch api/_local-dev.ts)
npm run dev:client    # hanya frontend
```

## Mengubah konten

Semua isi portofolio ada di satu file:
```
api/data/content.json
```
Edit langsung file ini — tidak ada lagi proses "seed" atau file database
terpisah, karena serverless function bersifat stateless (baca file ini
setiap request, tidak ada yang perlu di-reset). Lihat `PANDUAN-KONTEN.md`
untuk detail tiap field.

Field yang masih placeholder dan perlu kamu isi sendiri:
- `profile.email`, `profile.social.*` — email dan link GitHub/LinkedIn asli
- `education[]` — masih contoh ("Your University Name", dst.)
- `projects[].link` untuk plate-detection & cyberbullying-xai — masih placeholder

## Form kontak

Serverless function tidak punya disk permanen, jadi pesan **tidak lagi
disimpan ke file**. Setiap pesan masuk:
1. Selalu di-`console.log` — bisa dilihat di dashboard Vercel → project →
   **Logs**.
2. Kalau env var `RESEND_API_KEY` dan `CONTACT_TO_EMAIL` diisi (lihat
   `.env.example`), juga dikirim sebagai email lewat Resend API — tidak
   perlu install package tambahan, cukup `fetch` biasa (lihat
   `api/_app.ts`).

## Build untuk produksi

```bash
npm run build   # build client saja — api/ tidak perlu build step,
                 # Vercel yang bundle otomatis saat deploy
```

## Deploy ke Vercel

Lihat `DEPLOY.md` untuk langkah lengkap. Ringkasnya: connect repo ke Vercel,
Root Directory tetap di root repo (jangan diarahkan ke `client/`), Vercel
otomatis: build `client/` jadi static site DAN mengenali folder `api/`
sebagai serverless functions — satu project, satu domain.

## Desain

Tema visual sengaja dijauhkan dari klise "AI-generated" (gradient ungu-biru,
ikon robot, garis neural-network): dark graphite + aksen amber/teal, tipografi
mono (IBM Plex Mono) yang terasa seperti log/terminal, dan motif siku kotak
deteksi objek (bounding box) yang muncul saat hover di kartu proyek — diambil
langsung dari kerjaan computer vision (YOLOv8), bukan dekorasi generik.

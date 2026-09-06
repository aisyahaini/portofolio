# Panduan Konten — Portfolio (struktur single-Vercel)

Semua isi/teks di situs ini diambil dari **satu file JSON**, bukan ditulis
langsung di kode React maupun di banyak file terpisah. Untuk ganti teks,
foto, atau link, kamu cuma perlu edit:

```
api/data/content.json
```

Tidak ada lagi proses "seed" atau file database (`db.json`) seperti versi
sebelumnya — karena sekarang backend-nya serverless function yang stateless
(tidak nyimpen state antar-request), jadi tidak ada bedanya "master data"
vs "data yang lagi jalan". Edit file itu, deploy ulang, selesai.

---

## Struktur `content.json`

### `profile`
```json
"profile": {
  "name": "Aisyah",
  "title": "AI Engineer & Full-Stack Developer",
  "tagline": "Turning ML research into systems that actually ship.",
  "location": "West Java, Indonesia",
  "email": "your-email@example.com",
  "summary": "...paragraf About...",
  "focus": "...kalimat fokus saat ini, muncul di kotak kecil bagian About...",
  "social": {
    "github": "https://github.com/your-username",
    "linkedin": "https://linkedin.com/in/your-profile",
    "email": "your-email@example.com"
  }
}
```
⚠️ **`social.github`, `social.linkedin`, dan `email` masih placeholder** —
WAJIB diganti ke akun asli sebelum dipakai untuk melamar kerja, karena
tombol GitHub/LinkedIn/Email di Hero & Footer memakai nilai ini persis.

### `skills`
Array grup skill — tiap grup punya `group` (nama kategori) dan `items`
(daftar teknologi). Tinggal tambah/kurangi/ubah string di `items`.

### `experience`
Array pengalaman kerja: `role`, `org`, `period`, `points` (bullet
pencapaian). Urutan array = urutan tampil, taruh terbaru di atas.

### `education`
Riwayat pendidikan. Kosongkan array-nya (`"education": []`) kalau belum mau
menampilkan riwayat pendidikan — section-nya otomatis hilang dari halaman.

### `research`
Array publikasi/paper. Muncul sebagai section baru **"Research & Publications"**,
persis di bawah Education dan di atas Projects.

| Field | Fungsi |
|---|---|
| `id` | ID unik |
| `title` | Judul paper |
| `authors` | Array nama penulis, urut sesuai urutan publikasi |
| `role` | Peran kamu di paper itu (mis. "First author — ...") |
| `summary` | Ringkasan singkat 1-2 kalimat |
| `status` | `"Published"` (badge teal), `"Under Review"` (amber), `"Under Revision"` (rose) |
| `link` | (Opsional) URL paper. Kosongkan untuk sembunyikan tombol "Read paper" |

Kosongkan array-nya (`"research": []`) untuk menyembunyikan section ini.

### `projects`
| Field | Fungsi |
|---|---|
| `id` | ID unik, juga dipakai mencocokkan nama file gambar & URL detail (`/projects/<id>`) |
| `name` | Judul project di card |
| `status` | `"Production"` (badge amber), `"Prototype"` (teal), `"Research"` (rose) |
| `description` | Paragraf singkat di card — dipotong otomatis maks. 3 baris |
| `overview` | (Opsional) Paragraf lebih panjang, khusus tampil di halaman detail project. Kalau kosong, `description` dipakai ulang |
| `highlights` | Bullet pencapaian — **hanya 2 pertama tampil di card**, semuanya tampil di halaman detail |
| `stack` | Tag teknologi — **hanya 4 pertama tampil di card**, semuanya tampil di halaman detail |
| `metrics` | (Opsional) Array `{ "label": "...", "value": "..." }` — angka hasil/akurasi, tampil sebagai stat chip di card & kartu besar di halaman detail. **Nilai saat ini masih dummy/contoh — ganti dengan angka aktual dari model/project kamu** |
| `featured` | `true`/`false` — otomatis tampil lebih dulu di grid |
| `image` | Path gambar, contoh `"/projects/hr-inventory.svg"` — dipakai untuk cover di card & fallback gambar pertama di gallery kalau `images` kosong |
| `images` | (Opsional) Array path gambar untuk **slideshow** di halaman detail. Kalau kosong, otomatis pakai `[image]`. Klik gambar di slideshow untuk buka viewer besar dengan zoom in/out |
| `link` | URL demo/repo. Kosongkan `""` untuk sembunyikan tombol "View project" |

⚠️ **`plate-detection` dan `cyberbullying-xai` masih pakai link kosong** —
isi dengan repo asli kalau mau tombol "View project" muncul.

⚠️ **Gambar tambahan di `images` (frame ke-2 dan ke-3 tiap project) masih
placeholder wireframe abstrak**, sama seperti gambar utamanya — tinggal
ganti file SVG/PNG-nya di `client/public/projects/` dengan screenshot asli
kapan pun sudah siap, tidak perlu ubah kode.

---

## Halaman detail project (`/projects/<id>`)

Tiap card di grid Projects sekarang punya tombol **"Lihat detail"** yang
membawa ke halaman tersendiri untuk project itu:

- **Bagian atas** — slideshow (landing-page style) dari semua gambar di
  `images`: otomatis jalan sendiri tiap 5 detik (berhenti saat di-hover),
  ada panah kiri/kanan dan titik indikator, dan **klik gambar mana pun untuk
  membuka viewer layar penuh** — bisa di-zoom in/out (tombol +/-, scroll
  mouse, pinch di HP, atau double-click), digeser saat sedang zoom, dan
  dinavigasi dengan panah/thumbnail di bagian bawah. Tutup dengan tombol X,
  klik area luar gambar, atau tombol Esc.
- **Overview** — paragraf lengkap dari `overview` (atau `description` kalau
  `overview` kosong).
- **Results** — kartu-kartu angka dari `metrics` (kalau ada).
- **Key contributions** — semua isi `highlights` (bukan cuma 2 seperti di card).
- **Tech stack** — semua isi `stack`.
- **Sidebar kiri** — daftar semua project lain, tinggal klik untuk pindah
  tanpa balik ke halaman utama dulu.

Tidak perlu setting tambahan apa pun — halaman ini otomatis muncul untuk
setiap item di `projects`, dan otomatis ikut ter-update kalau `content.json`
diedit.

---

## Ganti tema (dark / light)

Ada tombol matahari/bulan di pojok kanan header (di sebelah kiri tombol
"Say hi"), baik di desktop maupun mobile. Klik untuk beralih dark ↔ light —
pilihan pengunjung tersimpan otomatis (localStorage) jadi tetap konsisten
di kunjungan berikutnya. Default situs tetap **dark** untuk pengunjung baru.

Kalau suatu saat mau menyesuaikan warna tema light (misalnya lebih terang
atau lebih kontras), semua warnanya diatur lewat CSS variable di
`client/src/index.css`, di dalam blok `[data-theme="light"] { ... }` —
tidak perlu mengubah komponen React satu-satu.

---

## Gambar thumbnail project — `client/public/projects/`

5 ilustrasi SVG abstrak (warna gelap sesuai tema) sudah disediakan sebagai
placeholder. Untuk pakai screenshot asli:
1. Siapkan gambar rasio 16:9 (disarankan 1200×675px), PNG/JPG, <300KB.
2. Simpan di `client/public/projects/`, namai sama persis dengan `id`
   project — misalnya `hr-inventory.png`.
3. Update field `"image"` di `content.json` dari `.svg` ke `.png`.

Kalau file tidak ketemu, card otomatis fallback ke placeholder inisial.

---

## Form kontak — di mana pesannya?

Tidak disimpan ke file (serverless = tanpa disk permanen). Setiap pesan:
1. Selalu masuk log — cek di **dashboard Vercel → project kamu → Logs**,
   cari baris `[contact]`.
2. Kalau mau dikirim ke email juga, isi environment variable di dashboard
   Vercel (Settings → Environment Variables):
   ```
   RESEND_API_KEY=...      # dari https://resend.com
   CONTACT_TO_EMAIL=...    # email kamu yang mau menerima notifikasi
   ```
   Tidak perlu install package tambahan — logikanya sudah ada di
   `api/_app.ts` (fungsi `notifyContact`), tinggal isi env var-nya.

---

## Judul tab, favicon, SEO

Di `client/index.html`: `<title>`, `<meta name="description">`,
`og:title/description/image`. Gambar preview share: `client/public/og-image.png`.
Favicon: `client/public/favicon.svg`.

---

## Checklist sebelum publish

- [ ] Ganti `social.github`, `social.linkedin`, `email` di `profile`
- [ ] Isi atau kosongkan `education`
- [ ] Ganti `link` project yang masih placeholder
- [ ] (Opsional) Ganti thumbnail SVG dengan screenshot asli
- [ ] (Opsional) Isi `RESEND_API_KEY` + `CONTACT_TO_EMAIL` di Vercel kalau
      mau notifikasi email form kontak

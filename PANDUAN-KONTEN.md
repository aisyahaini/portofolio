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
⚠️ **Masih placeholder**: `"Your University Name"`, `"Your Degree, Major"`,
`"20XX — 20XX"`. Kosongkan array-nya (`"education": []`) kalau belum mau
menampilkan riwayat pendidikan — section-nya otomatis hilang dari halaman.

### `projects`
| Field | Fungsi |
|---|---|
| `id` | ID unik, juga dipakai mencocokkan nama file gambar |
| `name` | Judul project di card |
| `status` | `"Production"` (badge amber), `"Prototype"` (teal), `"Research"` (rose) |
| `description` | Paragraf singkat — dipotong otomatis maks. 3 baris |
| `highlights` | Bullet pencapaian — **hanya 2 pertama tampil**, sisanya jadi "+N more" |
| `stack` | Tag teknologi — **hanya 4 pertama tampil**, sisanya jadi badge "+N" |
| `featured` | `true`/`false` — otomatis tampil lebih dulu di grid |
| `image` | Path gambar, contoh `"/projects/hr-inventory.svg"` |
| `link` | URL demo/repo. Kosongkan `""` untuk sembunyikan tombol "View project" |

⚠️ **`plate-detection` dan `cyberbullying-xai` masih pakai link
placeholder** (`github.com/your-username/...`) — ganti ke repo asli, atau
kosongkan.

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

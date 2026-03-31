# Portofolio - Hadrian Rangga Ardiantara

Single-page portfolio modern berbasis React + Vite dengan animasi sinematik dari GSAP dan styling Tailwind CSS.

**Ringkasan**
- Landing page portfolio dengan section Hero, About, Skills, Projects, Achievements, dan Contact.
- Animasi entrance, parallax, dan reveal berbasis scroll yang tetap menghormati `prefers-reduced-motion`.
- Data bisa diambil dari file lokal `src/data/*.js` atau API eksternal melalui `VITE_API_URL`.

**Fitur Utama**
- Hero dengan parallax dan CTA.
- Navigasi sticky dengan menu mobile.
- Filter skills dan achievements.
- Project card dengan badge teknologi dan link demo.
- Timeline achievements dengan modal preview gambar.
- Contact section dengan social links dan form statis.

**Tech Stack**
- React 19 + Vite 8
- Tailwind CSS (tema custom di `tailwind.config.js`)
- GSAP + ScrollTrigger
- Axios
- React Icons

**Struktur Project**
- `public/` asset statis
- `src/assets/` ilustrasi dan gambar
- `src/components/` komponen UI per section
- `src/data/` data lokal (projects, skills, achievements)
- `src/pages/` komposisi halaman
- `src/services/` API client + data switcher
- `src/utils/` easing dan utilitas animasi
- `src/App.jsx` root app
- `src/main.jsx` entry React

**Menjalankan Lokal**
```bash
npm install
npm run dev
```

**Perintah Lain**
```bash
npm run build
npm run preview
npm run lint
```

**Konfigurasi Env (Opsional)**
Jika ingin data diambil dari API, set `VITE_API_URL`. Jika tidak diset, aplikasi memakai data lokal.

Contoh `.env`:
```bash
VITE_API_URL=https://api.example.com
```

Endpoint yang dibaca ketika `VITE_API_URL` aktif:
- `GET /projects` -> list berisi `title`, `description`, `tech`, `github`, `demo`
- `GET /skills` -> list berisi `name`, `category`, `focus`, `icon` (opsional)
- `GET /achievements` -> list berisi `title`, `date`, `category`, `level`, `result`, `description`, `image` atau `images`

**Ubah Konten**
- Projects: `src/data/projects.js`
- Skills: `src/data/skills.js`
- Achievements: `src/data/achievements.js`
- Hero & About copy: `src/components/Hero.jsx`, `src/components/About.jsx`
- Social links: `src/components/Contact.jsx`

**Build & Deploy**
Jalankan `npm run build` lalu deploy folder `dist/` ke hosting statis (Vercel, Netlify, atau server sendiri).
# 🥘 Resepish – Aplikasi Web Resep Masakan Interaktif

**Resepish** adalah aplikasi web interaktif yang memudahkan pengguna dalam mencari, menjelajahi, dan menambahkan resep masakan dari berbagai kategori seperti **Makanan Berat, Dessert, Minuman, dan Cemilan**. Aplikasi ini dirancang dengan antarmuka yang bersih, responsif, dan modern menggunakan ReactJS, serta tersambung ke backend Supabase untuk pengelolaan data.

## 🚀 Fitur Utama

- 📂 Menampilkan daftar resep berdasarkan kategori.
- 🔍 Pencarian resep secara real-time (berdasarkan judul).
- 📝 Form interaktif untuk menambahkan resep baru.
- 🖼️ Preview gambar resep sebelum diunggah.
- 🧮 Statistik ringkas jumlah total resep, kategori, dan terpopuler.
- 📱 Responsive: mendukung layout Desktop, Tablet, dan Mobile.
- 🔁 Integrasi langsung dengan database Supabase (CRUD).

## 🛠️ Teknologi yang Digunakan

- **Frontend**: React.js (v18.2.0)
- **Build Tool**: Vite
- **State Management**: React Context API & Hooks
- **Styling**: CSS Modules + Global CSS
- **Routing**: react-router-dom
- **Database & API**: Supabase (PostgreSQL)
- **Icons**: react-icons
- **Font**: Google Fonts (Poppins)

## 📂 Struktur Folder

```bash

├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AddRecipeForm/
│   │   ├── Footer/
│   │   ├── Hero/
│   │   ├── Navbar/
│   │   ├── RecipeCard/
│   │   ├── RecipeList/
│   │   ├── Summary/
│   ├── context/
│   │   └── RecipeProvider.jsx
│   ├── hooks/
│   │   ├── useRecipes.js
│   │   └── useCategory.js
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── lib/
│   │   └── supabase.js
│   ├── pages/
│   │   ├── Home/
│   │   ├── AddRecipe/
│   │   ├── Category/
│   │   ├── RecipeDetail/
│   │   └── Search/
│   ├── services/
│   │   └── recipeService.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.html
```

## 📸 Tampilan Aplikasi

### 🏠 Halaman Beranda  
Menampilkan hero, statistik resep, dan daftar resep utama.  
![Home Page](screenshot/home-page.png)

### 🔍 Hasil Pencarian  
Menampilkan hasil resep berdasarkan kata kunci secara real-time.  
![Hasil Pencarian](screenshot/hasil-pencarian.png)

### 📝 Form Tambah Resep  
Formulir untuk menambahkan resep baru ke dalam database.  
![Form Tambah Resep](screenshot/form-tambah-resep.png)

### 🍲 Detail Resep  
Menampilkan detail resep secara lengkap berdasarkan ID resep.  
![Detail Resep](screenshot/detail-page.png)

### 🍛 Kategori: Makanan Berat  
![Makanan Berat](screenshot/kategori-makanan-berat.png)

### 🍮 Kategori: Dessert  
![Dessert](screenshot/kategori-dessert.png)

### 🥤 Kategori: Minuman  
![Minuman](screenshot/kategori-minuman.png)

### 🍳 Kategori: Sarapan  
![Sarapan](screenshot/kategori-sarapan.png)


## 🧪 Status Pengembangan
| Fitur               | Status | Keterangan                                                  |
|---------------------|--------|-------------------------------------------------------------|
| 🔍 Pencarian        | ✅    | Sudah berjalan real-time berbasis keyword                   |
| 📋 Detail Resep     | ✅    | Menampilkan semua informasi lengkap dari Supabase           |
| 🧾 Tambah Resep     | ✅    | Upload + preview + menyimpan ke database secara realtime    |
| 🛡️ Validasi Form    | ✅    | Validasi dasar tersedia, namun belum semua bersifat wajib   |

## 👩‍💻 Tentang Pengembang

Proyek ini dikembangkan untuk memenuhi Ujian Akhir Semester (UAS) mata kuliah **Pemrograman Frontend**.

**Pengembang**:  
🧑‍💻 *Fatiya Labibah*  
🎓 *NIM 0110223060*  
🏫 *STT Terpadu Nurul Fikri*  
📅 *Tahun Akademik 2025*

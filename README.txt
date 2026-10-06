KALKULATOR HINO LUBUKLINGGAU - VERCEL
=======================================

File:
- index.html
- style.css
- script.js
- data.json
- manifest.json

UPDATE LEASING:
1. Pilihan Hino Finance (HFI) dan Indomobil Finance (IMFI).
2. HFI mengikuti struktur contoh simulasi HFI:
   - DP = OTR x DP%
   - Nilai pembiayaan = OTR - DP - subsidi
   - Asuransi tahun 1 = OTR x TLO
   - Asuransi tahun 2/3 = nilai pembiayaan x TLO x jumlah tahun setelah tahun pertama
   - Provisi = (nilai pembiayaan + asuransi tahun 2/3) x provisi%
   - Biaya proses = asuransi tahun 1 + TPL + admin + provisi
   - Angsuran = (nilai pembiayaan + asuransi tahun 2/3) x (1 + bunga x tenor/12) / tenor
   - TDP = DP + angsuran pertama + biaya proses
   - Pencairan dealer = OTR - TDP
3. IMFI menyediakan parameter biaya proses yang dapat diubah dan estimasi flat.
4. Angsuran manual dapat diisi bila sudah menerima angka resmi dari leasing. Jika diisi, angka manual dipakai untuk angsuran dan TDP.
5. Jangan menganggap simulasi ini sebagai penawaran resmi leasing; angka final mengikuti approval dan quotation leasing.

DEPLOY VERCEL:
- Upload/replace file di repository GitHub.
- Commit perubahan.
- Vercel yang terhubung ke GitHub akan melakukan redeploy otomatis.

Catatan HFI: contoh paket 24/36 pada screenshot menggunakan nilai asuransi tahun 2/3 yang mengikuti paket tersebut; untuk 24 bulan rate gabungan 0,88% dari nilai pembiayaan, untuk 36 bulan 1,65% dari nilai pembiayaan. Nilai paket leasing dapat berbeda.

UPDATE FINAL:
- HFI pada aplikasi menggunakan BUNGA FLAT sesuai simulasi HFI yang diberikan pengguna.
- Semua komponen biaya awal dimasukkan ke Total Pembayaran Pertama/TDP:
  DP + angsuran pertama + asuransi tahun 1 + TPL + admin + provisi.
- Contoh HFI 24 bulan: 6,44% flat, TLO 0,88%, TPL Rp630.000, admin Rp2.500.000, provisi 1%.
- Contoh HFI 36 bulan: 7,21% flat, TLO 0,88%, TPL Rp930.000, admin Rp2.500.000, provisi 1%.
- Angsuran manual tetap tersedia untuk mengikuti quotation resmi leasing.


UPDATE OFF HARGA:
- Harga OFF sekarang memiliki 3 pilihan: SPV, BM, dan Harga Tengah.
- Harga Tengah otomatis dihitung: (BM + SPV) / 2 lalu dibulatkan ke Rp500.000 terdekat.
- Ketiga harga ditampilkan sekaligus di ringkasan agar sales bisa membandingkan.

export const materialSummary = [
  {
    title: "1. Pengertian Mesin Pencari",
    content: "Mesin pencari (search engine) merupakan program website yang mengumpulkan serta mengorganisir konten dari seluruh bagian internet untuk dapat ditelusuri oleh pengguna. Hasil pencarian biasanya ditampilkan dalam bentuk daftar yang sering kali diurutkan menurut tingkat akurasi atau relevansi atas suatu berkas."
  },
  {
    title: "2. Cara Kerja Mesin Pencari",
    content: "Mesin pencari menyimpan informasi tentang banyak halaman web, yang diambil langsung dari WWW (World Wide Web). Halaman-halaman ini diambil dengan web crawler, lalu dianalisis untuk menemukan cara indeksnya (kata kunci, judul, dll). Data disimpan dalam sebuah indeks database untuk pencarian selanjutnya."
  },
  {
    title: "3. Komponen Utama Mesin Pencari",
    list: [
      "Spider: Program yang mengunduh halaman-halaman yang mereka temukan.",
      "Crawler: Program yang melacak dan menemukan link dari setiap halaman yang ditemuinya.",
      "Indexer: Mengekstrak komponen untuk menguraikan masing-masing halaman dan menulis berbagai unsur (teks, headers, struktur gaya penulisan) ke dalam database.",
      "Database: Tempat penyimpanan standar untuk menyimpan data-data dari halaman yang diunduh.",
      "Result engine: Mesin yang melakukan penggolongan dan penentuan peringkat dari hasil pencarian.",
      "Web server: Komponen yang melayani permintaan pencarian dan memberikan respons balik."
    ]
  },
  {
    title: "4. Operator/Variabel Pencarian Khusus",
    table: [
      { operator: "site:", fungsi: "Mencari konten yang muncul di alamat (domain) website tertentu." },
      { operator: "cache:", fungsi: "Menemukan versi salinan sementara (cache) terbaru dari halaman web tertentu." },
      { operator: "allinurl:", fungsi: "Mencari halaman dengan kata kunci tertentu dalam alamat pranala (URL)." },
      { operator: "inurl:", fungsi: "Mencari halaman dengan kata kunci tertentu dalam alamat pranala (URL)." },
      { operator: "allintitle:", fungsi: "Mencari halaman dengan kata kunci tertentu dalam judul (title)." },
      { operator: "intitle:", fungsi: "Mencari kata kunci di dalam judul (title) halaman teks (body)." },
      { operator: "daterange:", fungsi: "Mencari konten yang dipublikasikan dalam rentang tanggal tertentu." }
    ]
  }
];

export const quizQuestions = [
  {
    question: "Apa fungsi utama dari mesin pencari (search engine)?",
    options: [
      "Membuat halaman web baru di internet",
      "Mengumpulkan dan mengorganisir konten dari internet untuk ditelusuri",
      "Mengirim pesan elektronik antar pengguna",
      "Menyimpan file secara offline di komputer"
    ],
    correctAnswer: 1,
    explanation: "Mesin pencari berfungsi untuk mengumpulkan dan mengorganisir konten dari seluruh bagian internet agar dapat ditelusuri pengguna."
  },
  {
    question: "Komponen mesin pencari yang bertugas mengunduh halaman-halaman yang mereka temukan disebut...",
    options: ["Crawler", "Indexer", "Spider", "Database"],
    correctAnswer: 2,
    explanation: "Spider adalah program yang bertugas mengunduh halaman-halaman web yang mereka temukan."
  },
  {
    question: "Jika Anda ingin mencari artikel lowongan kerja khusus di dalam situs web linkedin.com, variabel apa yang paling tepat digunakan?",
    options: ["inurl:linkedin programmer", "site:linkedin.com programmer", "intitle:programmer linkedin", "cache:linkedin.com programmer"],
    correctAnswer: 1,
    explanation: "Operator 'site:' digunakan untuk mencari konten spesifik yang hanya muncul pada alamat (domain) website tertentu."
  },
  {
    question: "Variabel 'intitle:' digunakan untuk mencari informasi secara spesifik pada bagian...",
    options: ["Alamat URL halaman", "Isi teks (body) halaman web", "Judul (title) halaman web", "Tanggal publikasi halaman"],
    correctAnswer: 2,
    explanation: "Operator 'intitle:' berfungsi mencari kata kunci spesifik yang terdapat di dalam judul (title) sebuah halaman web."
  },
  {
    question: "Komponen apa yang melakukan penggolongan dan penentuan peringkat (ranking) dari hasil pencarian?",
    options: ["Result engine", "Web server", "Spider", "Indexer"],
    correctAnswer: 0,
    explanation: "Result engine adalah mesin atau komponen yang melakukan penggolongan dan penentuan peringkat dari hasil pencarian mesin pencari."
  }
];

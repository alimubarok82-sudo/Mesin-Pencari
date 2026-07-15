import { useState } from 'react';
import { materialSummary } from '../data';
import { ArrowRight, BookOpen, Search, Info, Target, CheckCircle2 } from 'lucide-react';

const analyzeQuery = (query: string) => {
  if (!query.trim()) return null;
  
  const results = [];
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('site:')) {
    const match = query.match(/site:(\S+)/i);
    const domain = match ? match[1] : '...';
    results.push({ operator: 'site:', description: `Membatasi pencarian HANYA pada website atau domain "${domain}"` });
  }
  if (lowerQuery.includes('cache:')) {
    const match = query.match(/cache:(\S+)/i);
    const url = match ? match[1] : '...';
    results.push({ operator: 'cache:', description: `Menampilkan versi salinan sementara (cache) dari halaman "${url}"` });
  }
  if (lowerQuery.includes('allinurl:')) {
    results.push({ operator: 'allinurl:', description: `Mencari halaman yang URL-nya mengandung SEMUA kata kunci yang diketikkan setelah operator ini.` });
  } else if (lowerQuery.includes('inurl:')) {
    const match = query.match(/inurl:(\S+)/i);
    const keyword = match ? match[1] : '...';
    results.push({ operator: 'inurl:', description: `Mencari halaman yang alamat URL-nya mengandung kata "${keyword}"` });
  }
  
  if (lowerQuery.includes('allintitle:')) {
    results.push({ operator: 'allintitle:', description: `Mencari halaman yang Judulnya (title) mengandung SEMUA kata kunci yang diketikkan.` });
  } else if (lowerQuery.includes('intitle:')) {
    const match = query.match(/intitle:(\S+)/i);
    const keyword = match ? match[1] : '...';
    results.push({ operator: 'intitle:', description: `Mencari halaman yang memiliki kata "${keyword}" di dalam Judul (title) halamannya.` });
  }
  
  if (lowerQuery.includes('daterange:')) {
    results.push({ operator: 'daterange:', description: `Membatasi hasil pencarian untuk konten yang dipublikasikan pada rentang tanggal tertentu.` });
  }
  
  // Kata kunci biasa
  const terms = query.replace(/(site|cache|allinurl|inurl|allintitle|intitle|daterange):\S+/ig, '').trim();
  if (terms) {
    results.push({ operator: 'Kata Kunci Biasa', description: `Akan mencari konten umum terkait topik: "${terms}"` });
  }

  if (results.length === 0) return null;
  return results;
};

const BlankSpot = ({ word, onClick, isError, isSuccess }: { word: string, onClick: () => void, isError: boolean, isSuccess: boolean }) => {
  if (!word) {
    return (
      <span className="inline-block w-32 h-8 border-b-2 border-white/40 bg-white/5 rounded mx-1 align-middle transition-all animate-pulse"></span>
    );
  }
  return (
    <button
      onClick={onClick}
      disabled={isSuccess}
      className={`inline-block px-3 py-1 mx-1 rounded-lg font-bold transition-all ${
        isSuccess
          ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/50 cursor-default'
          : isError
          ? 'bg-rose-500/30 text-rose-200 border border-rose-400/50 hover:bg-rose-500/50'
          : 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/50 hover:bg-yellow-400/40'
      }`}
    >
      {word}
    </button>
  );
};

const InteractiveDefinition = () => {
  const correctWords = ["mengumpulkan", "mengorganisir", "internet", "pengguna"];
  const initialWords = ["perangkat keras", "mengumpulkan", "pengguna", "internet", "mengorganisir", "menghapus"];
  
  const [availableWords, setAvailableWords] = useState<string[]>(initialWords);
  const [blanks, setBlanks] = useState<string[]>(["", "", "", ""]);

  const handleFill = (word: string) => {
    const emptyIdx = blanks.findIndex(b => b === "");
    if (emptyIdx === -1) return;
    const newBlanks = [...blanks];
    newBlanks[emptyIdx] = word;
    setBlanks(newBlanks);
    setAvailableWords(availableWords.filter(w => w !== word));
  };

  const handleRemove = (index: number) => {
    const word = blanks[index];
    if (!word) return;
    const newBlanks = [...blanks];
    newBlanks[index] = "";
    setBlanks(newBlanks);
    setAvailableWords([...availableWords, word]);
  };

  const isComplete = blanks.every(b => b !== "");
  const isCorrect = isComplete && blanks.every((b, i) => b === correctWords[i]);
  const isError = isComplete && !isCorrect;

  return (
    <div className="bg-white/10 rounded-2xl p-5 sm:p-6 border border-white/20 mt-4 shadow-inner">
      <p className="text-white/80 mb-4 text-sm font-semibold uppercase tracking-wider flex items-center gap-2">
        <Target className="w-5 h-5 text-yellow-300" />
        Lengkapi Pengertian di Bawah Ini:
      </p>
      <div className="text-white/90 leading-loose text-lg font-medium">
        Mesin pencari (search engine) merupakan program website yang{" "}
        <BlankSpot word={blanks[0]} onClick={() => handleRemove(0)} isError={isError && blanks[0] !== correctWords[0]} isSuccess={isCorrect} />
        {" "}serta{" "}
        <BlankSpot word={blanks[1]} onClick={() => handleRemove(1)} isError={isError && blanks[1] !== correctWords[1]} isSuccess={isCorrect} />
        {" "}konten dari seluruh bagian{" "}
        <BlankSpot word={blanks[2]} onClick={() => handleRemove(2)} isError={isError && blanks[2] !== correctWords[2]} isSuccess={isCorrect} />
        {" "}untuk dapat ditelusuri oleh{" "}
        <BlankSpot word={blanks[3]} onClick={() => handleRemove(3)} isError={isError && blanks[3] !== correctWords[3]} isSuccess={isCorrect} />
        . Hasil pencarian biasanya ditampilkan dalam bentuk daftar yang sering kali diurutkan menurut tingkat akurasi atau relevansi atas suatu berkas.
      </div>

      {!isCorrect && (
        <div className="mt-8 pt-6 border-t border-white/20">
          <p className="text-white/60 text-sm mb-3">Pilih kata yang tepat untuk mengisi bagian yang kosong:</p>
          <div className="flex flex-wrap gap-3 items-center">
            {availableWords.map((word, idx) => (
              <button
                key={idx}
                onClick={() => handleFill(word)}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium transition-all border border-white/20 shadow-sm active:scale-95"
              >
                {word}
              </button>
            ))}
            {availableWords.length === 0 && (
              <p className="text-rose-300 text-sm font-medium animate-pulse ml-2">❌ Ada kata yang kurang tepat. Klik kata yang salah pada kalimat di atas untuk menggantinya.</p>
            )}
          </div>
        </div>
      )}

      {isCorrect && (
        <div className="mt-6 bg-emerald-500/20 border border-emerald-400/30 rounded-xl p-4 flex items-center gap-3 animate-in zoom-in duration-300">
          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
          <span className="text-emerald-100 font-bold">Luar biasa! Kamu berhasil menyusun pengertian mesin pencari dengan tepat.</span>
        </div>
      )}
    </div>
  );
};

const InteractiveWorkflow = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    {
      title: "1. Crawling (Merayapi)",
      icon: "🕷️",
      desc: "Mesin pencari menggunakan bot yang disebut 'Crawler' atau 'Spider' untuk menjelajahi World Wide Web (WWW). Bot ini mengunjungi satu halaman, lalu secara otomatis mengikuti link di halaman tersebut untuk menemukan halaman-halaman baru."
    },
    {
      title: "2. Indexing (Mengindeks)",
      icon: "🗂️",
      desc: "Setelah ditemukan, halaman web dianalisis. Mesin pencari mengekstrak informasi penting seperti teks, judul, dan kata kunci (keywords), lalu menyimpannya ke dalam struktur database raksasa yang disebut 'Indeks' agar mudah ditemukan nanti."
    },
    {
      title: "3. Ranking (Memeringkat)",
      icon: "🏆",
      desc: "Ketika kamu mengetikkan kueri pencarian, 'Result Engine' mencari kecocokan di dalam Indeks. Mesin kemudian mengurutkan (ranking) hasil berdasarkan tingkat relevansi dan menampilkannya di layarmu dalam hitungan detik!"
    }
  ];

  return (
    <div className="mt-4 flex flex-col gap-8">
      <div className="flex justify-between relative px-4 sm:px-8">
        {/* Connection line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 rounded-full z-0">
          <div className="h-full bg-yellow-300 transition-all duration-500 rounded-full" style={{ width: `${(activeStep / 2) * 100}%` }}></div>
        </div>
        
        {steps.map((step, idx) => (
          <button 
            key={idx}
            onClick={() => setActiveStep(idx)}
            className="relative z-10 flex flex-col items-center gap-3 group"
          >
            <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-2xl sm:text-3xl border-4 transition-all duration-300 ${activeStep === idx ? 'bg-indigo-600 border-yellow-300 scale-110 shadow-[0_0_20px_rgba(253,224,71,0.4)]' : activeStep > idx ? 'bg-emerald-500/80 border-emerald-400' : 'bg-white/10 border-white/30 hover:bg-white/20'}`}>
              {step.icon}
            </div>
            <span className={`font-bold text-xs sm:text-sm text-center max-w-[80px] sm:max-w-none ${activeStep === idx ? 'text-yellow-300' : 'text-white/60 group-hover:text-white'}`}>{step.title.split(' ')[1]}</span>
          </button>
        ))}
      </div>

      <div className="bg-white/10 rounded-2xl p-6 sm:p-8 border border-white/20 shadow-inner">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <span className="text-3xl">{steps[activeStep].icon}</span>
          {steps[activeStep].title}
        </h3>
        <p className="text-white/90 leading-relaxed text-[1.05rem]">
          {steps[activeStep].desc}
        </p>
        <div className="mt-8 flex justify-end">
           {activeStep < 2 ? (
             <button onClick={() => setActiveStep(activeStep + 1)} className="bg-white text-indigo-600 px-5 py-2.5 rounded-xl font-bold transition-all text-sm hover:shadow-lg hover:scale-105 flex items-center gap-2">
               Lanjut
               <ArrowRight className="w-4 h-4" />
             </button>
           ) : (
             <span className="text-emerald-300 font-bold text-sm flex items-center gap-2 bg-emerald-500/20 px-4 py-2 rounded-lg border border-emerald-400/30">
               <CheckCircle2 className="w-5 h-5"/> Selesai
             </span>
           )}
        </div>
      </div>
    </div>
  );
};

const InteractiveComponents = () => {
  const [activeComp, setActiveComp] = useState<number>(0);

  const components = [
    { name: "Spider", icon: "🕷️", desc: "Program perayap yang secara aktif mengunduh halaman-halaman web yang mereka temukan di internet untuk diproses lebih lanjut." },
    { name: "Crawler", icon: "🕸️", desc: "Bertugas melacak dan menemukan link-link baru dari setiap halaman yang ditemuinya, membentuk jaringan halaman yang saling terhubung." },
    { name: "Indexer", icon: "🗂️", desc: "Mesin pembaca yang mengekstrak teks, header, dan struktur dari halaman web lalu mengurainya menjadi indeks data yang terstruktur." },
    { name: "Database", icon: "💾", desc: "Fasilitas penyimpanan skala besar yang menampung seluruh data hasil ekstraksi dari halaman yang telah diunduh dan diindeks." },
    { name: "Result Engine", icon: "📈", desc: "Otak pengambil keputusan yang melakukan penggolongan dan penentuan peringkat (ranking) halaman untuk menyajikan hasil terbaik." },
    { name: "Web Server", icon: "🖥️", desc: "Gerbang utama yang melayani permintaan kueri dari pengguna dan memberikan respons balik berupa halaman hasil pencarian." }
  ];

  return (
    <div className="mt-4 flex flex-col md:flex-row gap-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3 md:w-2/5">
        {components.map((comp, idx) => (
          <button
            key={idx}
            onClick={() => setActiveComp(idx)}
            className={`p-4 rounded-xl flex items-center gap-4 text-left transition-all duration-300 border shadow-sm ${
              activeComp === idx 
                ? 'bg-indigo-600 border-indigo-400 text-white transform md:translate-x-2' 
                : 'bg-white/10 border-white/20 text-white/70 hover:bg-white/20 hover:text-white'
            }`}
          >
            <span className={`text-2xl flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg ${activeComp === idx ? 'bg-white/20' : 'bg-white/5'}`}>
              {comp.icon}
            </span>
            <span className="font-bold text-sm sm:text-base">{comp.name}</span>
          </button>
        ))}
      </div>
      
      <div className="md:w-3/5 flex">
        <div className="bg-white/10 border border-white/20 rounded-2xl p-6 sm:p-8 flex flex-col justify-center w-full shadow-inner relative overflow-hidden transition-all duration-300 min-h-[250px]">
          <div className="absolute -top-6 -right-6 p-8 opacity-10 text-9xl transform rotate-12 pointer-events-none">
            {components[activeComp].icon}
          </div>
          <div className="relative z-10 animate-in fade-in slide-in-from-right-4 duration-300" key={activeComp}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 border border-white/30 text-3xl mb-6 shadow-lg backdrop-blur-sm">
              {components[activeComp].icon}
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-yellow-300 mb-4">{components[activeComp].name}</h3>
            <p className="text-white/90 text-[1.05rem] leading-relaxed">
              {components[activeComp].desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const InteractiveOperators = ({ table }: { table: any[] }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  const getExample = (op: string) => {
    const examples: Record<string, string> = {
      "site:": "site:kompas.com teknologi",
      "cache:": "cache:id.wikipedia.org/wiki/Web",
      "allinurl:": "allinurl:berita tekno terbaru",
      "inurl:": "inurl:pdf materi komputer",
      "allintitle:": "allintitle:cara kerja internet",
      "intitle:": "intitle:jurnal informatika",
      "daterange:": "daterange:2459000-2459999 berita"
    };
    return examples[op] || op + "kata_kunci";
  };

  return (
    <div className="mt-4 flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {table.map((row, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={`py-3 px-4 rounded-xl font-mono text-sm sm:text-base font-bold transition-all border shadow-sm ${
              activeIdx === idx
                ? 'bg-yellow-400 text-indigo-900 border-yellow-300 transform scale-105 shadow-md'
                : 'bg-white/10 text-blue-300 border-white/20 hover:bg-white/20 hover:text-blue-200'
            }`}
          >
            {row.operator}
          </button>
        ))}
      </div>
      
      <div className="bg-white/10 border border-white/20 rounded-2xl p-6 sm:p-8 shadow-inner mt-2 min-h-[200px] flex flex-col justify-center">
        <h3 className="text-2xl font-mono text-yellow-300 mb-2">{table[activeIdx].operator}</h3>
        <p className="text-white/90 text-lg leading-relaxed mb-6">
          {table[activeIdx].fungsi}
        </p>
        
        <div className="bg-black/30 rounded-xl p-4 border border-white/10">
          <span className="text-white/50 text-xs font-bold uppercase tracking-wider mb-2 block">Contoh Penggunaan:</span>
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-white/40" />
            <code className="text-blue-300 font-mono text-lg">{getExample(table[activeIdx].operator)}</code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function SummaryView({ onStartQuiz }: { onStartQuiz: () => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = materialSummary.length + 1;

  const renderPageContent = () => {
    if (currentPage < materialSummary.length) {
      const section = materialSummary[currentPage];
      return (
        <div className="bg-white/20 backdrop-blur-xl border border-white/30 p-6 sm:p-8 rounded-3xl shadow-2xl animate-in fade-in zoom-in-95 duration-300">
          <h2 className="text-xl font-bold text-yellow-300 mb-4">{section.title}</h2>
          {section.title === "1. Pengertian Mesin Pencari" ? (
            <InteractiveDefinition />
          ) : section.title === "2. Cara Kerja Mesin Pencari" ? (
            <InteractiveWorkflow />
          ) : section.title === "3. Komponen Utama Mesin Pencari" ? (
            <InteractiveComponents />
          ) : section.title === "4. Operator/Variabel Pencarian Khusus" ? (
            <InteractiveOperators table={section.table || []} />
          ) : (
            section.content && <p className="text-white/90 leading-relaxed text-[1.05rem]">{section.content}</p>
          )}
          
          {section.title !== "3. Komponen Utama Mesin Pencari" && section.list && (
            <ul className="space-y-4 mt-2">
              {section.list.map((item, i) => {
                const [boldPart, rest] = item.split(': ');
                return (
                  <li key={i} className="flex gap-4 text-white/90 leading-relaxed">
                    <span className="text-white/60 font-bold mt-1">•</span>
                    <span>
                      <span className="font-bold text-white">{boldPart}: </span>
                      {rest}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
          
          {section.title !== "4. Operator/Variabel Pencarian Khusus" && section.table && (
            <div className="overflow-x-auto mt-6 rounded-xl border border-white/20">
              <table className="min-w-full text-sm text-left text-white/90">
                <thead className="bg-white/10 text-white border-b border-white/20">
                  <tr>
                    <th className="px-5 py-4 font-semibold w-1/3">Variabel Operator</th>
                    <th className="px-5 py-4 font-semibold">Fungsi / Kegunaan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {section.table.map((row, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="px-5 py-4 font-mono text-blue-300 font-medium whitespace-nowrap">{row.operator}</td>
                      <td className="px-5 py-4 text-white/80">{row.fungsi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div className="bg-white/20 backdrop-blur-xl border border-white/30 p-6 sm:p-8 rounded-3xl shadow-2xl animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center border border-white/30">
              <Search className="w-5 h-5 text-yellow-300" />
            </div>
            <h2 className="text-2xl font-bold text-white">Simulasi Operator Pencarian</h2>
          </div>
          <p className="text-white/80 mb-6 text-sm sm:text-base leading-relaxed">
            Ketik kueri pencarian menggunakan variabel (misal: <code className="bg-white/20 px-1.5 py-0.5 rounded text-yellow-300 font-mono">site:kompas.com teknologi</code> atau <code className="bg-white/20 px-1.5 py-0.5 rounded text-yellow-300 font-mono">intitle:jurnal</code>) untuk melihat simulasi cara kerja mesin pencari!
          </p>
          
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ketik kueri pencarian di sini..."
              className="w-full bg-white/10 border border-white/30 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/50 outline-none focus:border-yellow-300 focus:bg-white/20 transition-all text-lg font-mono shadow-inner"
            />
          </div>

          {analyzeQuery(searchQuery) && (
            <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-5 flex items-start gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <Info className="w-6 h-6 text-blue-300 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-blue-200 font-bold mb-2">Analisis Kueri Mesin Pencari:</h4>
                <ul className="space-y-3">
                  {analyzeQuery(searchQuery)?.map((analysis, idx) => (
                    <li key={idx} className="text-white/90 text-sm leading-relaxed flex flex-col sm:flex-row sm:gap-2">
                      <span className="font-mono text-yellow-300 bg-black/20 px-2 py-0.5 rounded inline-block self-start whitespace-nowrap mb-1 sm:mb-0 border border-white/10">{analysis.operator}</span>
                      <span className="flex-1">{analysis.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 text-white mb-2 border border-white/30 backdrop-blur-md">
          <BookOpen className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Ringkasan Materi LKS</h1>
        <p className="text-white/80 text-lg max-w-xl mx-auto">Pelajari dengan teliti materi tentang Mesin Pencari di bawah ini sebelum memulai kuis untuk mendapatkan skor maksimal.</p>
      </div>

      <div className="space-y-6">
        {renderPageContent()}
      </div>

      <div className="flex items-center justify-between pt-8 pb-12">
        <button
          onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
          disabled={currentPage === 0}
          className={`flex items-center gap-2 font-bold py-3 px-5 sm:px-6 rounded-xl transition-all ${
            currentPage === 0 
              ? 'opacity-50 cursor-not-allowed bg-white/10 text-white/50' 
              : 'bg-white/20 hover:bg-white/30 text-white shadow-lg'
          }`}
        >
          Sebelumnya
        </button>

        <div className="flex gap-1.5 sm:gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <div 
              key={i} 
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === currentPage ? 'bg-yellow-300 w-6' : 'bg-white/30 w-2.5'
              }`}
            />
          ))}
        </div>

        {currentPage < totalPages - 1 ? (
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-5 sm:px-6 rounded-xl shadow-lg transition-all"
          >
            Selanjutnya
          </button>
        ) : (
          <button 
            onClick={onStartQuiz}
            className="bg-white text-indigo-600 font-bold py-3 px-5 sm:px-6 rounded-xl shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 transform hover:scale-105"
          >
            <span className="hidden sm:inline">Mulai Kuis</span>
            <span className="sm:hidden">Kuis</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}

import { BookOpen, Award, Target } from 'lucide-react';

export default function HomeView({ onStart, points }: { onStart: () => void, points: number }) {
  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-700 bg-white/10 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl relative overflow-hidden mt-8">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white font-medium text-sm mb-8 mt-6 shadow-sm border border-white/30 backdrop-blur-md">
        <Award className="w-5 h-5 text-yellow-300" />
        Total Poin Belajarmu: <span className="font-bold text-white text-base">{points} XP</span>
      </div>

      <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
        Pelajari Informatika dengan <span className="text-yellow-300">Interaktif</span>
      </h1>
      
      <p className="text-lg text-white/90 mb-12 max-w-2xl leading-relaxed">
        Tingkatkan pemahamanmu tentang Mesin Pencari (Search Engine) melalui ringkasan materi yang diambil langsung dari LKS dan uji pengetahuanmu dengan kuis interaktif.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mb-12">
        <div className="bg-white/15 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-lg flex flex-col items-center text-center transition-all hover:bg-white/20">
          <div className="w-14 h-14 bg-white/20 text-white rounded-2xl flex items-center justify-center mb-5 border border-white/30">
            <BookOpen className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Baca Materi Singkat</h3>
          <p className="text-white/80 text-sm leading-relaxed">Pahami konsep dasar, cara kerja mesin pencari beserta komponen dan operator pencariannya.</p>
        </div>
        <div className="bg-white/15 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-lg flex flex-col items-center text-center transition-all hover:bg-white/20">
          <div className="w-14 h-14 bg-white/20 text-white rounded-2xl flex items-center justify-center mb-5 border border-white/30">
            <Target className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Latihan Kuis Otomatis</h3>
          <p className="text-white/80 text-sm leading-relaxed">Uji pemahamanmu, dapatkan umpan balik instan, dan kumpulkan poin sebanyak-banyaknya.</p>
        </div>
      </div>

      <button 
        onClick={onStart}
        className="bg-white text-indigo-600 font-bold py-4 px-12 rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 hover:-translate-y-1 text-lg flex items-center gap-3 mb-6"
      >
        Mulai Belajar Sekarang
        <BookOpen className="w-5 h-5" />
      </button>
    </div>
  );
}

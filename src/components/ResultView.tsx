import { Trophy, Star, RotateCcw, Home } from 'lucide-react';

export default function ResultView({ score, maxScore, onRetry, onHome }: { score: number, maxScore: number, onRetry: () => void, onHome: () => void }) {
  const percentage = (score / maxScore) * 100;
  
  let message = "";
  if (percentage === 100) message = "Sempurna! Kamu sangat menguasai materi mesin pencari ini.";
  else if (percentage >= 80) message = "Hebat! Pemahamanmu sangat baik, sedikit lagi sempurna.";
  else if (percentage >= 60) message = "Bagus! Kamu sudah memahami konsep dasar, terus tingkatkan.";
  else message = "Jangan menyerah! Coba baca kembali ringkasan materi untuk hasil lebih baik.";

  return (
    <div className="max-w-lg mx-auto p-6 animate-in zoom-in-95 duration-700">
      <div className="bg-white/20 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-12 text-center shadow-2xl border border-white/30 flex flex-col items-center">
        
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-yellow-300 blur-2xl opacity-50 rounded-full"></div>
          <div className="relative w-28 h-28 bg-white/20 text-yellow-300 rounded-full flex items-center justify-center shadow-inner border-2 border-white/40">
            <Trophy className="w-14 h-14" />
          </div>
        </div>
        
        <h2 className="text-3xl font-extrabold text-white mb-3 tracking-tight">Kuis Selesai!</h2>
        <p className="text-white/80 text-lg mb-10 max-w-xs">{message}</p>

        <div className="w-full bg-white/10 rounded-3xl p-6 sm:p-8 mb-10 flex justify-between items-center relative overflow-hidden border border-white/20">
          <div className="absolute -top-6 -right-6 p-4 opacity-20 transform rotate-12">
            <Star className="w-32 h-32 text-white" />
          </div>
          <div className="text-left relative z-10">
            <p className="text-yellow-300 font-bold tracking-wide uppercase text-sm mb-2">Poin Diperoleh</p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-white">+{score}</span>
              <span className="text-lg font-bold text-white/60">XP</span>
            </div>
          </div>
          <div className="text-right relative z-10 flex flex-col items-end justify-end h-full pt-6">
            <p className="text-white/60 text-sm font-semibold">dari maksimal {maxScore}</p>
          </div>
        </div>

        <div className="w-full space-y-4">
          <button 
            onClick={onRetry}
            className="w-full flex items-center justify-center gap-2 bg-white text-indigo-600 font-bold py-4 sm:py-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-[1.02]"
          >
            <RotateCcw className="w-5 h-5" />
            Coba Kuis Lagi
          </button>
          <button 
            onClick={onHome}
            className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-4 sm:py-5 rounded-2xl border border-white/30 transition-all backdrop-blur-md"
          >
            <Home className="w-5 h-5" />
            Kembali ke Beranda
          </button>
        </div>
      </div>
    </div>
  );
}

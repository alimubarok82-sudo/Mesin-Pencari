import { useState } from 'react';
import { quizQuestions } from '../data';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

export default function QuizView({ onComplete }: { onComplete: (score: number, maxScore: number) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const question = quizQuestions[currentIndex];

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    
    if (index === question.correctAnswer) {
      setScore(prev => prev + 10); // 10 points per correct answer
    }
  };

  const handleNext = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      onComplete(score, quizQuestions.length * 10);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold text-white/80 uppercase tracking-wider">
            Pertanyaan {currentIndex + 1} dari {quizQuestions.length}
          </span>
          <span className="text-sm font-medium text-white/70">
            Skor Sementara: {score} XP
          </span>
        </div>
        <div className="flex space-x-2">
          {quizQuestions.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-2.5 flex-1 rounded-full transition-colors duration-300 ${idx === currentIndex ? 'bg-green-400 animate-pulse' : idx < currentIndex ? 'bg-green-400' : 'bg-white/20'}`}
            />
          ))}
        </div>
      </div>

      <div className="bg-white/15 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/30 relative overflow-hidden">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-8 leading-relaxed">
          {question.question}
        </h2>

        <div className="space-y-4">
          {question.options.map((option, idx) => {
            let stateClass = "border-white/20 hover:bg-white/20 text-white bg-white/10";
            let Icon = null;

            if (isAnswered) {
              if (idx === question.correctAnswer) {
                stateClass = "border-emerald-400 bg-emerald-500/20 text-emerald-100 shadow-sm shadow-emerald-900/20 ring-1 ring-emerald-400";
                Icon = <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />;
              } else if (idx === selectedOption) {
                stateClass = "border-rose-400 bg-rose-500/20 text-rose-100 shadow-sm shadow-rose-900/20 ring-1 ring-rose-400";
                Icon = <XCircle className="w-6 h-6 text-rose-400 flex-shrink-0" />;
              } else {
                stateClass = "border-white/10 bg-white/5 text-white/40 opacity-60";
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleOptionClick(idx)}
                className={`group w-full flex items-center p-5 rounded-2xl border-2 text-left transition-all ${stateClass} ${!isAnswered && 'cursor-pointer hover:scale-[1.01]'}`}
              >
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center font-bold text-white group-hover:bg-indigo-500 mr-4 flex-shrink-0">
                  {String.fromCharCode(65 + idx)}
                </div>
                <span className="font-medium text-[1.05rem] pr-4 flex-1">{option}</span>
                {Icon}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="mt-10 pt-8 border-t border-white/20 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className={`p-5 rounded-2xl ${selectedOption === question.correctAnswer ? 'bg-emerald-500/20 text-emerald-100 border border-emerald-400/30' : 'bg-rose-500/20 text-rose-100 border border-rose-400/30'} mb-6`}>
              <p className="font-bold mb-2 flex items-center gap-2">
                {selectedOption === question.correctAnswer ? (
                  <>🎉 Tepat Sekali!</>
                ) : (
                  <>💡 Mari Belajar Bersama</>
                )}
              </p>
              <p className="text-[1.05rem] opacity-90 leading-relaxed">{question.explanation}</p>
            </div>
            <button
              onClick={handleNext}
              className="w-full flex items-center justify-center gap-3 bg-white text-indigo-600 font-bold py-4 rounded-2xl shadow-xl transition-all transform hover:scale-[1.02] hover:shadow-2xl"
            >
              {currentIndex < quizQuestions.length - 1 ? 'Lanjut ke Pertanyaan Berikutnya' : 'Lihat Hasil Akhir'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

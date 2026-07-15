import { useState, useEffect } from 'react';
import HomeView from './components/HomeView';
import SummaryView from './components/SummaryView';
import QuizView from './components/QuizView';
import ResultView from './components/ResultView';
import { ViewState } from './types';
import { Award, Laptop } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<ViewState>('home');
  const [points, setPoints] = useState(0);
  const [lastScore, setLastScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);

  // Load points from local storage on mount
  useEffect(() => {
    const savedPoints = localStorage.getItem('eduApp_points');
    if (savedPoints) {
      setPoints(parseInt(savedPoints, 10));
    }
  }, []);

  const handleQuizComplete = (score: number, max: number) => {
    const newPoints = points + score;
    setPoints(newPoints);
    setLastScore(score);
    setMaxScore(max);
    localStorage.setItem('eduApp_points', newPoints.toString());
    setView('result');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6366f1] via-[#a855f7] to-[#ec4899] font-sans selection:bg-white/30 selection:text-white">
      {/* Header */}
      <header className="max-w-5xl mx-auto px-6 mt-4">
        <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-4 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer transition-opacity hover:opacity-80"
            onClick={() => setView('home')}
          >
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <Laptop className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-none hidden sm:block">EduInformatika</h1>
              <p className="text-white/70 text-xs hidden sm:block">Informatika • Kelas X • Semester 1</p>
            </div>
          </div>
          
          <div className="bg-white/30 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-2 border border-white/40 shadow-inner">
            <Award className="w-5 h-5 text-white" />
            <span className="font-bold text-white text-sm">{points} XP</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 px-4 sm:px-6">
        {view === 'home' && <HomeView onStart={() => setView('summary')} points={points} />}
        {view === 'summary' && <SummaryView onStartQuiz={() => setView('quiz')} />}
        {view === 'quiz' && <QuizView onComplete={handleQuizComplete} />}
        {view === 'result' && (
          <ResultView 
            score={lastScore} 
            maxScore={maxScore} 
            onRetry={() => setView('quiz')} 
            onHome={() => setView('home')} 
          />
        )}
      </main>
    </div>
  );
}

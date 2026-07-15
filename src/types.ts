export type ViewState = 'home' | 'summary' | 'quiz' | 'result';

export interface UserState {
  points: number;
  completedQuizzes: number;
}

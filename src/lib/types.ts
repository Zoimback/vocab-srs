export type CardState = 'new' | 'learning' | 'review' | 'relearning';
export type Rating = 1 | 2 | 3 | 4;

export interface FsrsState {
  due: string;
  stability: number;
  difficulty: number;
  elapsedDays: number;
  scheduledDays: number;
  reps: number;
  lapses: number;
  state: CardState;
}

export interface Card {
  id?: number;
  word: string;
  translation: string;
  example?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  fsrs: FsrsState;
}

export interface ReviewLog {
  id?: number;
  cardId: number;
  rating: Rating;
  reviewedAt: string;
}

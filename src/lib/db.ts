import Dexie, { type Table } from 'dexie';
import type { Card, ReviewLog } from './types';

class VocabDatabase extends Dexie {
  cards!: Table<Card>;
  reviewLogs!: Table<ReviewLog>;

  constructor() {
    super('vocab-srs-db');
    this.version(1).stores({
      cards: '++id, word, updatedAt, fsrs.state, fsrs.due',
      reviewLogs: '++id, cardId, reviewedAt',
    });
  }
}

export const db = new VocabDatabase();

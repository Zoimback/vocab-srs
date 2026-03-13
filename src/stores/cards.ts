import { writable } from 'svelte/store';
import { db } from '../lib/db';
import type { Card, ReviewLog, Rating } from '../lib/types';

const cardsStore = writable<Card[]>([]);

export const cards = {
  subscribe: cardsStore.subscribe,
  async load() {
    const all = await db.cards.orderBy('updatedAt').reverse().toArray();
    cardsStore.set(all);
  },
  async add(card: Card) {
    await db.cards.add(card);
    await this.load();
  },
  async update(card: Card) {
    if (!card.id) return;
    await db.cards.put(card);
    await this.load();
  },
  async remove(id: number) {
    await db.cards.delete(id);
    await this.load();
  },
  async logReview(cardId: number, rating: Rating) {
    const log: ReviewLog = {
      cardId,
      rating,
      reviewedAt: new Date().toISOString(),
    };
    await db.reviewLogs.add(log);
  },
  async replaceAll(nextCards: Card[]) {
    await db.transaction('rw', db.cards, async () => {
      await db.cards.clear();
      if (nextCards.length > 0) {
        await db.cards.bulkAdd(nextCards);
      }
    });
    await this.load();
  },
};

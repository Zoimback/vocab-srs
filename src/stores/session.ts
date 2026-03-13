import { derived, writable } from 'svelte/store';
import type { Card } from '../lib/types';

export interface SessionState {
  active: boolean;
  queue: Card[];
  index: number;
  lastQueue: Card[];
}

export const session = writable<SessionState>({
  active: false,
  queue: [],
  index: 0,
  lastQueue: [],
});

export const currentCard = derived(session, ($s) => $s.queue[$s.index] ?? null);

function shuffleCards(cards: Card[]): Card[] {
  const next = [...cards];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

export function startSession(queue: Card[]) {
  const randomizedQueue = shuffleCards(queue);
  session.set({
    active: randomizedQueue.length > 0,
    queue: randomizedQueue,
    index: 0,
    lastQueue: randomizedQueue,
  });
}

export function nextCard() {
  session.update((s) => {
    const nextIndex = s.index + 1;
    if (nextIndex >= s.queue.length) return { ...s, active: false, index: s.queue.length };
    return { ...s, index: nextIndex };
  });
}

export function restartSession() {
  session.update((s) => {
    if (s.lastQueue.length === 0) return s;
    const randomizedQueue = shuffleCards(s.lastQueue);
    return {
      ...s,
      active: true,
      queue: randomizedQueue,
      index: 0,
      lastQueue: randomizedQueue,
    };
  });
}

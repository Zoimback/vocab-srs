import {
  createEmptyCard,
  fixRating,
  fsrs,
  generatorParameters,
  Rating as FsrsRating,
  State as FsrsLibState,
  type Card as FsrsCard,
} from 'ts-fsrs';
import type { Card, CardState, Rating } from './types';

const scheduler = fsrs(generatorParameters({ enable_fuzz: true }));

function toLibState(state: CardState): FsrsLibState {
  switch (state) {
    case 'new':
      return FsrsLibState.New;
    case 'learning':
      return FsrsLibState.Learning;
    case 'review':
      return FsrsLibState.Review;
    case 'relearning':
      return FsrsLibState.Relearning;
  }
}

function fromLibState(state: FsrsLibState): CardState {
  switch (state) {
    case FsrsLibState.New:
      return 'new';
    case FsrsLibState.Learning:
      return 'learning';
    case FsrsLibState.Review:
      return 'review';
    case FsrsLibState.Relearning:
      return 'relearning';
    default:
      return 'new';
  }
}

function toFsrsCard(card: Card): FsrsCard {
  return {
    due: new Date(card.fsrs.due),
    stability: card.fsrs.stability,
    difficulty: card.fsrs.difficulty,
    elapsed_days: card.fsrs.elapsedDays,
    scheduled_days: card.fsrs.scheduledDays,
    reps: card.fsrs.reps,
    lapses: card.fsrs.lapses,
    state: toLibState(card.fsrs.state),
    last_review: card.fsrs.reps > 0 ? new Date(card.updatedAt) : undefined,
  };
}

function fromFsrsCard(card: FsrsCard) {
  return {
    due: card.due.toISOString(),
    stability: card.stability,
    difficulty: card.difficulty,
    elapsedDays: card.elapsed_days,
    scheduledDays: card.scheduled_days,
    reps: card.reps,
    lapses: card.lapses,
    state: fromLibState(card.state),
  };
}

function toLibRating(rating: Rating): FsrsRating {
  const normalized = fixRating(rating);
  if (
    normalized !== FsrsRating.Again &&
    normalized !== FsrsRating.Hard &&
    normalized !== FsrsRating.Good &&
    normalized !== FsrsRating.Easy
  ) {
    throw new Error('Invalid rating');
  }
  return normalized;
}

export function scheduleCard(card: Card, rating: Rating): Card {
  const now = new Date();
  const scheduled = scheduler.repeat(toFsrsCard(card), now);
  const next = scheduled[toLibRating(rating)]?.card;
  if (!next) {
    throw new Error('Unable to schedule card for rating');
  }

  return {
    ...card,
    updatedAt: now.toISOString(),
    fsrs: fromFsrsCard(next),
  };
}

export function createNewFsrsState() {
  return fromFsrsCard(createEmptyCard(new Date()));
}

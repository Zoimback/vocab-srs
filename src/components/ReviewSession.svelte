<script lang="ts">
  import { onDestroy } from 'svelte';
  import { currentCard, nextCard, restartSession } from '../stores/session';
  import { cards } from '../stores/cards';
  import { scheduleCard } from '../lib/fsrs';
  import Flashcard from './Flashcard.svelte';
  import type { Card, Rating } from '../lib/types';

  let card: Card | null = null;
  let flipped = false;

  const unsubscribe = currentCard.subscribe((v) => {
    card = v;
    flipped = false;
  });

  onDestroy(() => unsubscribe());

  async function rate(rating: Rating) {
    if (!card) return;
    const updated = scheduleCard(card, rating);
    await cards.update(updated);
    if (typeof card.id === 'number') {
      await cards.logReview(card.id, rating);
    }
    nextCard();
  }

  function onKeydown(ev: KeyboardEvent) {
    if (!card) return;
    if (ev.key === ' ') {
      ev.preventDefault();
      flipped = !flipped;
    }
    if (ev.key === '1') rate(1);
    if (ev.key === '2') rate(2);
    if (ev.key === '3') rate(3);
    if (ev.key === '4') rate(4);
  }
</script>

<svelte:window on:keydown={onKeydown} />

<div class="panel">
  <h3>Sesion de repaso</h3>
  {#if !card}
    <p>No hay tarjetas pendientes.</p>
    <button class="btn primary" data-testid="restart-review-btn" on:click={restartSession}>
      Volver a repasar
    </button>
  {:else}
    <button class="btn" data-testid="flip-btn" on:click={() => (flipped = !flipped)}>Voltear</button
    >
    <Flashcard word={card.word} translation={card.translation} example={card.example} {flipped} />
    <div class="row" style="margin-top:10px;">
      <button class="btn" data-testid="rate-again" on:click={() => rate(1)}>Again</button>
      <button class="btn" data-testid="rate-hard" on:click={() => rate(2)}>Hard</button>
      <button class="btn primary" data-testid="rate-good" on:click={() => rate(3)}>Good</button>
      <button class="btn" data-testid="rate-easy" on:click={() => rate(4)}>Easy</button>
    </div>
  {/if}
</div>

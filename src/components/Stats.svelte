<script lang="ts">
  import { onDestroy } from 'svelte';
  import { cards } from '../stores/cards';
  import { isDue } from '../lib/utils';
  import type { Card } from '../lib/types';

  let list: Card[] = [];
  const unsubscribe = cards.subscribe((v) => (list = v));
  onDestroy(() => unsubscribe());

  $: dueToday = list.filter((c) => isDue(c.fsrs.due)).length;
  $: reviewCards = list.filter((c) => c.fsrs.state === 'review').length;
  $: learningCards = list.filter(
    (c) => c.fsrs.state === 'learning' || c.fsrs.state === 'relearning',
  ).length;
  $: newCards = list.filter((c) => c.fsrs.state === 'new').length;
</script>

<div class="panel" data-testid="stats-panel">
  <h3>Estadisticas</h3>
  <p data-testid="total-count">Total: {list.length}</p>
  <p data-testid="due-count">Pendientes hoy: {dueToday}</p>
  <p data-testid="review-count">En review: {reviewCards}</p>
  <p>Nuevas: {newCards}</p>
  <p>En aprendizaje: {learningCards}</p>
</div>

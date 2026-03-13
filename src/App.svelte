<script lang="ts">
  import AddCard from './components/AddCard.svelte';
  import CardList from './components/CardList.svelte';
  import ReviewSession from './components/ReviewSession.svelte';
  import Stats from './components/Stats.svelte';
  import ImportExport from './components/ImportExport.svelte';
  import { cards } from './stores/cards';
  import { startSession } from './stores/session';
  import { isDue } from './lib/utils';
  import type { Card } from './lib/types';

  let route: 'home' | 'review' | 'stats' = 'home';
  let dark = localStorage.getItem('theme') === 'dark';

  if (dark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  async function beginReview() {
    const all: Card[] = [];
    const unsub = cards.subscribe((v) => all.splice(0, all.length, ...v));
    unsub();
    startSession(
      all
        .filter((c) => isDue(c.fsrs.due))
        .sort((a, b) => new Date(a.fsrs.due).getTime() - new Date(b.fsrs.due).getTime()),
    );
    route = 'review';
  }

  function toggleTheme() {
    dark = !dark;
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }

  cards.load();
</script>

<div class="container">
  <div class="row" style="justify-content:space-between;align-items:center;margin-bottom:10px;">
    <div>
      <h1>vocab-srs</h1>
      <p style="margin:6px 0 0;color:var(--muted);font-weight:600;">
        Aprende ingles con sesiones cortas y constantes
      </p>
    </div>
    <button class="btn" data-testid="theme-toggle" on:click={toggleTheme}>Tema</button>
  </div>

  <div
    class="row panel"
    style="margin-bottom:12px;align-items:center;justify-content:space-between;"
  >
    <button class="btn" data-testid="nav-home" on:click={() => (route = 'home')}>Inicio</button>
    <button class="btn primary" data-testid="start-review" on:click={beginReview}>Repasar</button>
    <button class="btn" data-testid="nav-stats" on:click={() => (route = 'stats')}>Stats</button>
  </div>

  {#if route === 'home'}
    <AddCard />
    <div style="height:10px"></div>
    <CardList />
    <div style="height:10px"></div>
    <ImportExport />
  {:else if route === 'review'}
    <ReviewSession />
  {:else}
    <Stats />
  {/if}
</div>

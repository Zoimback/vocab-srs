<script lang="ts">
  export let word = '';
  export let translation = '';
  export let example = '';
  export let flipped = false;
</script>

<div class="flashcard" data-testid="flashcard">
  {#if !flipped}
    <h2>{word}</h2>
    <p>Haz click para ver respuesta</p>
  {:else}
    <h2>{translation}</h2>
    {#if example}
      <p>{example}</p>
    {/if}
  {/if}
</div>

<style>
  .flashcard {
    min-height: 180px;
    display: grid;
    place-content: center;
    text-align: center;
    border: 1px solid var(--border);
    border-radius: 12px;
    background: var(--card);
    padding: 16px;
  }
</style>

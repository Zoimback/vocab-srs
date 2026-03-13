<script lang="ts">
  import { cards } from '../stores/cards';
  import { createNewFsrsState } from '../lib/fsrs';

  let word = '';
  let translation = '';
  let example = '';

  async function submitCard() {
    if (!word.trim() || !translation.trim()) return;
    const now = new Date().toISOString();
    await cards.add({
      word: word.trim(),
      translation: translation.trim(),
      example: example.trim(),
      tags: [],
      createdAt: now,
      updatedAt: now,
      fsrs: createNewFsrsState(),
    });
    word = '';
    translation = '';
    example = '';
  }
</script>

<div class="panel">
  <h3>Anadir tarjeta</h3>
  <label>Palabra <input data-testid="word-input" bind:value={word} /></label>
  <label>Traduccion <input data-testid="translation-input" bind:value={translation} /></label>
  <label>Ejemplo <textarea data-testid="example-input" bind:value={example}></textarea></label>
  <button class="btn primary" data-testid="add-card-btn" on:click={submitCard}>Guardar</button>
</div>

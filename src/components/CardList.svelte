<script lang="ts">
  import { onDestroy } from 'svelte';
  import { cards } from '../stores/cards';
  import { formatDate } from '../lib/utils';
  import type { Card } from '../lib/types';

  let list: Card[] = [];
  let query = '';
  let dueOnly = false;
  let editingId: number | null = null;
  let editingWord = '';
  let editingTranslation = '';
  let editingExample = '';
  const unsubscribe = cards.subscribe((v) => (list = v));
  onDestroy(() => unsubscribe());

  async function deleteCard(id?: number) {
    if (!id) return;
    await cards.remove(id);
  }

  function beginEdit(card: Card) {
    if (typeof card.id !== 'number') return;
    editingId = card.id;
    editingWord = card.word;
    editingTranslation = card.translation;
    editingExample = card.example ?? '';
  }

  function cancelEdit() {
    editingId = null;
    editingWord = '';
    editingTranslation = '';
    editingExample = '';
  }

  async function saveEdit(card: Card) {
    if (typeof card.id !== 'number' || editingId !== card.id) return;

    const nextWord = editingWord.trim();
    const nextTranslation = editingTranslation.trim();
    if (!nextWord || !nextTranslation) return;

    await cards.update({
      ...card,
      word: nextWord,
      translation: nextTranslation,
      example: editingExample.trim(),
      updatedAt: new Date().toISOString(),
    });
    cancelEdit();
  }

  $: normalizedQuery = query.trim().toLowerCase();
  $: filtered = list.filter((c) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      c.word.toLowerCase().includes(normalizedQuery) ||
      c.translation.toLowerCase().includes(normalizedQuery) ||
      (c.example ?? '').toLowerCase().includes(normalizedQuery);

    const isDue = new Date(c.fsrs.due).getTime() <= Date.now();
    return matchesQuery && (!dueOnly || isDue);
  });
</script>

<div class="panel">
  <h3>Tarjetas</h3>
  <div class="row list-filters" style="margin-bottom:8px;align-items:center;">
    <input
      data-testid="search-input"
      placeholder="Buscar palabra, traduccion o ejemplo"
      bind:value={query}
    />
    <label style="display:flex;align-items:center;gap:6px;">
      <input data-testid="due-only" type="checkbox" bind:checked={dueOnly} style="width:auto;" />
      Solo pendientes
    </label>
  </div>

  {#if filtered.length === 0}
    <p>No hay tarjetas todavia.</p>
  {:else}
    {#each filtered as c (c.id)}
      <div
        class="row card-item"
        style="justify-content:space-between;align-items:center;margin-bottom:8px;"
      >
        {#if editingId === c.id}
          <div style="flex:1;min-width:250px;">
            <label>Palabra <input data-testid="edit-word-input" bind:value={editingWord} /></label>
            <label
              >Traduccion <input
                data-testid="edit-translation-input"
                bind:value={editingTranslation}
              /></label
            >
            <label
              >Ejemplo <textarea data-testid="edit-example-input" bind:value={editingExample}
              ></textarea></label
            >
          </div>
          <div class="row edit-actions" style="align-items:center;">
            <button class="btn primary" data-testid="save-edit-btn" on:click={() => saveEdit(c)}
              >Guardar</button
            >
            <button class="btn" data-testid="cancel-edit-btn" on:click={cancelEdit}>Cancelar</button
            >
          </div>
        {:else}
          <div>
            <strong>{c.word}</strong> -> {c.translation}
            <small style="display:block;color:var(--muted);"
              >Proxima revision: {formatDate(c.fsrs.due)}</small
            >
          </div>
          <div class="row card-actions" style="align-items:center;">
            <button class="btn" data-testid="edit-card-btn" on:click={() => beginEdit(c)}
              >Editar</button
            >
            <button
              class="btn danger"
              data-testid="delete-card-btn"
              on:click={() => deleteCard(c.id)}>Eliminar</button
            >
          </div>
        {/if}
      </div>
    {/each}
  {/if}
</div>

<style>
  @media (max-width: 700px) {
    .list-filters {
      align-items: stretch !important;
    }

    .list-filters label {
      width: 100%;
    }

    .card-item {
      gap: 10px;
      align-items: flex-start !important;
    }

    .card-actions,
    .edit-actions {
      width: 100%;
    }

    .card-actions .btn,
    .edit-actions .btn {
      flex: 1 1 calc(50% - 6px);
    }
  }
</style>

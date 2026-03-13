<script lang="ts">
  import type { Card } from '../lib/types';
  import { createNewFsrsState } from '../lib/fsrs';
  import { cards } from '../stores/cards';

  let importStatus = '';

  function parseCsvLine(line: string): string[] {
    const values: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i += 1) {
      const char = line[i];
      const next = line[i + 1];

      if (char === '"' && inQuotes && next === '"') {
        current += '"';
        i += 1;
        continue;
      }

      if (char === '"') {
        inQuotes = !inQuotes;
        continue;
      }

      if ((char === ',' || char === ';') && !inQuotes) {
        values.push(current.trim());
        current = '';
        continue;
      }

      current += char;
    }

    values.push(current.trim());
    return values;
  }

  function parseCsvCards(text: string): Card[] {
    const lines = text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (lines.length === 0) {
      return [];
    }

    const firstRow = parseCsvLine(lines[0]).map((value) => value.toLowerCase());
    const hasHeader =
      firstRow.includes('word') || firstRow.includes('english') || firstRow.includes('translation');

    const indexes = {
      word: hasHeader ? Math.max(firstRow.indexOf('word'), firstRow.indexOf('english')) : 0,
      translation: hasHeader
        ? Math.max(firstRow.indexOf('translation'), firstRow.indexOf('traduccion'))
        : 1,
      example: hasHeader ? Math.max(firstRow.indexOf('example'), firstRow.indexOf('ejemplo')) : -1,
    };

    if (indexes.word < 0 || indexes.translation < 0) {
      return [];
    }

    const now = new Date().toISOString();
    const start = hasHeader ? 1 : 0;

    return lines
      .slice(start)
      .map(parseCsvLine)
      .map((cols) => ({
        word: cols[indexes.word] ?? '',
        translation: cols[indexes.translation] ?? '',
        example: indexes.example >= 0 ? (cols[indexes.example] ?? '') : '',
      }))
      .map((row) => ({
        word: row.word.trim(),
        translation: row.translation.trim(),
        example: row.example.trim(),
      }))
      .filter((row) => row.word.length > 0 && row.translation.length > 0)
      .map((row) => ({
        word: row.word,
        translation: row.translation,
        example: row.example,
        tags: [],
        createdAt: now,
        updatedAt: now,
        fsrs: createNewFsrsState(),
      }));
  }

  async function exportJson() {
    const data: Card[] = [];
    const unsubscribe = cards.subscribe((value) => data.splice(0, data.length, ...value));
    unsubscribe();

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vocab-srs-export.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  async function importJson(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    importStatus = '';

    try {
      const text = await file.text();
      const extension = file.name.toLowerCase().split('.').pop();
      let sanitized: Card[] = [];

      if (extension === 'csv') {
        sanitized = parseCsvCards(text);
        if (sanitized.length === 0) {
          importStatus = 'CSV invalido: usa columnas word o english y translation o traduccion.';
          return;
        }
      } else {
        const parsed = JSON.parse(text);
        if (!Array.isArray(parsed)) {
          importStatus = 'Archivo invalido: el JSON debe ser un arreglo de tarjetas.';
          return;
        }

        const now = new Date().toISOString();
        sanitized = parsed
          .filter(
            (item) => item && typeof item.word === 'string' && typeof item.translation === 'string',
          )
          .map((item) => ({
            id: typeof item.id === 'number' ? item.id : undefined,
            word: item.word.trim(),
            translation: item.translation.trim(),
            example: typeof item.example === 'string' ? item.example.trim() : '',
            tags: Array.isArray(item.tags)
              ? item.tags.filter((tag: unknown) => typeof tag === 'string')
              : [],
            createdAt: typeof item.createdAt === 'string' ? item.createdAt : now,
            updatedAt: now,
            fsrs: item.fsrs && typeof item.fsrs.due === 'string' ? item.fsrs : createNewFsrsState(),
          }))
          .filter((card) => card.word.length > 0 && card.translation.length > 0);
      }

      await cards.replaceAll(sanitized);
      importStatus = `Importacion completada: ${sanitized.length} tarjetas cargadas.`;
    } catch {
      importStatus = 'No se pudo importar el archivo. Se mantuvieron los datos actuales.';
    } finally {
      input.value = '';
    }
  }
</script>

<div class="panel">
  <h3>Importar / Exportar</h3>
  <div class="row">
    <button class="btn" data-testid="export-btn" on:click={exportJson}>Exportar JSON</button>
    <input
      data-testid="import-input"
      type="file"
      accept="application/json,.json,.csv,text/csv"
      on:change={importJson}
    />
  </div>
  {#if importStatus}
    <p data-testid="import-status" style="margin-top:8px;color:var(--muted);">{importStatus}</p>
  {/if}
</div>

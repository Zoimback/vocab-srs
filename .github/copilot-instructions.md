# Proyecto

## Descripcion del proyecto y objetivos del proyecto

vocab-srs es una app frontend para estudiar vocabulario de ingles con repeticion espaciada FSRS v4. Debe funcionar en GitHub Pages, ser offline-first y permitir agregar, revisar, importar y exportar tarjetas.

## Stack

- Svelte 5
- Vite 5
- TypeScript 5
- Dexie.js 4
- ts-fsrs 3
- Playwright 1.40+

## Coding Standards

- Usa TypeScript en modo estricto.
- Usa componentes Svelte con una responsabilidad por archivo.
- Usa `data-testid` en elementos clave de UI para E2E.
- Evita estado global fuera de stores de Svelte.
- Usa `db.ts` como unica fuente de schema Dexie.

## Build & Validation

- Install: `npm install`
- Build: `npm run build`
- Test: `npm run test`
- Lint: `npm run lint`

## Skills disponibles

- `./.github/skills/svelte-vite/SKILL.md`
- `./.github/skills/typescript/SKILL.md`
- `./.github/skills/dexie/SKILL.md`
- `./.github/skills/ts-fsrs/SKILL.md`
- `./.github/skills/playwright/SKILL.md`
- `./.github/skills/github-actions-pages/SKILL.md`

## Instructions disponibles

- `./.github/instructions/svelte-vite.instructions.md`
- `./.github/instructions/typescript.instructions.md`
- `./.github/instructions/dexie.instructions.md`
- `./.github/instructions/ts-fsrs.instructions.md`
- `./.github/instructions/playwright.instructions.md`
- `./.github/instructions/github-actions-pages.instructions.md`

## Arquitectura de Software

### Backend

No aplica. El proyecto es frontend-only.

### Frontend

- `src/components/`: UI principal (flashcards, review, forms, stats)
- `src/lib/db.ts`: persistencia IndexedDB con Dexie
- `src/lib/fsrs.ts`: scheduler FSRS
- `src/stores/`: estado de sesion y tarjetas
- `tests/`: E2E con Playwright

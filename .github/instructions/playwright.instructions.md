---
description: Reglas imperativas para testing E2E con Playwright.
applyTo: "tests/**/*.spec.ts"
---

# Playwright

- Un flujo de usuario por test.
- Usa `data-testid` en selectores.
- Espera navegacion y estados antes de aserciones.
- Aisla datos para ejecucion paralela.

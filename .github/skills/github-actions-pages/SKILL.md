---
name: github-actions-pages
description: >
  Habilidad especializada en GitHub Actions CI/CD y despliegue en GitHub Pages.
  Usala cuando necesites configurar workflows automatizados, cache de npm,
  y deploy a gh-pages.
---

# Habilidad GitHub Actions + Pages

## Reglas clave
- Build desde `main`, deploy a `gh-pages`.
- Usa `npm ci` y cache de npm.
- Configura `base` de Vite para subruta del repo.
- Declara permisos `contents: write` en workflow.

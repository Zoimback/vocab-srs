---
description: Reglas para workflows de GitHub Actions y deploy en GitHub Pages.
applyTo: ".github/workflows/**/*.yml"
---

# GitHub Actions + Pages

- Build desde `main` y deploy a `gh-pages`.
- Usa `npm ci` y cache de npm.
- Configura `permissions: contents: write`.
- Mantiene `base` en Vite con subruta del repositorio.

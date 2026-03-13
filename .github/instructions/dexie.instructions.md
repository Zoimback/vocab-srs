---
description: Mejores practicas de Dexie.js para IndexedDB.
applyTo: "src/lib/db.ts"
---

# Dexie

- Define schema y versionado en `db.ts`.
- Usa transacciones para operaciones relacionadas.
- Indexa campos de consulta frecuente.
- Maneja errores en cada operacion async.

---
name: ts-fsrs
description: >
  Habilidad especializada para trabajar con ts-fsrs, implementacion TypeScript del algoritmo
  FSRS v4 de repeticion espaciada. Usala para scheduling de tarjetas,
  ratings y transiciones de estado.
---

# Habilidad ts-fsrs

## Reglas clave
- Usa `schedule()` y `record()`; no ajustes manuales.
- Persistir estado completo de tarjeta tras cada review.
- Validar ratings permitidos: Again/Hard/Good/Easy.
- Manejar fechas en UTC.

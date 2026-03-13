# vocab-srs

Aplicacion personal para estudiar vocabulario ingles con repeticion espaciada (FSRS v4).

## Funcionalidades implementadas
- Alta y eliminacion de tarjetas de vocabulario personal.
- Sesion de repaso con flip y calificaciones `Again/Hard/Good/Easy`.
- Reprogramacion SRS y registro historico de revisiones.
- Persistencia local con IndexedDB (Dexie).
- Busqueda y filtro de tarjetas pendientes.
- Estadisticas basicas (total, pendientes, nuevas, en aprendizaje y review).
- Importacion en JSON o CSV y exportacion en JSON.
- Tema claro/oscuro persistente.

## Stack
- Svelte 5
- Vite 5
- TypeScript
- Dexie.js
- ts-fsrs
- Playwright

## Scripts
- `npm run dev`
- `npm run build`
- `npm run test`
- `npm run lint`

## Deploy
- Workflow de GitHub Pages en `.github/workflows/pages.yml`.
- Publicacion automatica en push a `main`.

## Formato JSON de importacion
El archivo debe ser un arreglo JSON con objetos de tarjeta. Campos minimos por item:

```json
[
	{
		"word": "house",
		"translation": "casa",
		"example": "This is my house",
		"tags": ["home"],
		"createdAt": "2026-03-13T12:00:00.000Z",
		"fsrs": {
			"due": "2026-03-13T12:00:00.000Z",
			"stability": 1,
			"difficulty": 5,
			"elapsedDays": 0,
			"scheduledDays": 0,
			"reps": 0,
			"lapses": 0,
			"state": "new"
		}
	}
]
```

Reglas de sanitizacion durante importacion:
- Items sin `word` o `translation` validos se descartan.
- Si falta `fsrs` valido, se inicializa estado nuevo automaticamente.
- Ante JSON invalido, la app no reemplaza datos existentes.

## Formato CSV de importacion
Tambien puedes importar un CSV con columnas para palabra en ingles y traduccion.

Ejemplo recomendado:

```csv
english,translation
house,casa
water,agua
```

Tambien se aceptan encabezados equivalentes:
- `word` o `english`
- `translation` o `traduccion`
- opcional `example` o `ejemplo`

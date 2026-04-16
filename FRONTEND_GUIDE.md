# Frontend de AnimeDB 🎌

## Descripción
Frontend moderno y atractivo para gestionar tu base de datos de anime. Consumidor de REST API con diseño oscuro anime-themed.

## Características

### 🎨 Diseño
- **Tema oscuro profesional** con gradientes vibrantes
- **Paleta de colores anime**: Rosa neón (#ff006e), Púrpura (#8338ec), Azul (#3a86ff)
- **Responsive**: Se adapta perfectamente a móviles, tablets y escritorio
- **Animaciones suaves** y transiciones elegantes

### 📚 Funcionalidades

#### Vista de Catálogo
- Grid dinámico de tarjetas de anime
- Información rápida: título, episodios, fecha de inicio/fin
- Imágenes de portada o emoji por defecto
- Búsqueda en tiempo real
- Filtrado instantáneo

#### Crear Anime
- Modal con formulario completo
- Campos: título, episodios, fecha inicio/fin
- **Dos opciones de imagen**:
  - Subir archivo desde tu computadora (con Cloudinary)
  - Ingresar URL directamente
- Validación de campos requeridos

#### Editar Anime
- Carga automática de datos existentes
- Edita cualquier campo
- Actualiza imagen si lo deseas

#### Ver Detalles
- Modal con información completa
- Imagen en tamaño grande
- ID, fecha de creación
- Botón para editar directamente

#### Eliminar Anime
- Confirmación antes de eliminar
- Eliminación inmediata
- Refrescamiento automático

## Instalación y Uso

### Requisitos
1. **API ejecutándose**: `node index.js` en la carpeta raíz
2. **Puerto**: API en puerto 3000
3. **Navegador moderno**: Chrome, Firefox, Safari, Edge

### Pasos

#### 1. Inicia el servidor API
```bash
cd /home/neftali/Proyectos/Centenito/anime-API-postgres
npm install
node index.js
```

Debería ver: `Server is running on port 3000`

#### 2. Abre el frontend
Opción A: Haz clic derecho en `frontend/index.html` → "Open with Live Server" (si tienes la extensión)

Opción B: Abre en navegador:
```
file:///home/neftali/Proyectos/Centenito/anime-API-postgres/frontend/index.html
```

Opción C: Usa un servidor local:
```bash
# Con Python
python -m http.server 8000

# O con Node
npx http-server
```

### 3. ¡Usa la aplicación!
- Busca, crea, edita y elimina animes
- Las imágenes se cargan en Cloudinary automáticamente
- Todo se guarda en tu base de datos PostgreSQL

## Estructura del HTML

```html
<body>
  ├── <header> - Logo, búsqueda, botones principales
  ├── <main> - Grid de tarjetas de anime
  ├── <modal #animeModal> - Crear/Editar anime
  └── <modal #detailsModal> - Ver detalles
</body>
```

## Variables CSS (Tema)

Puedes personalizar los colores en la sección `:root`:

```css
:root {
    --primary-color: #ff006e;      /* Rosa neón */
    --secondary-color: #8338ec;    /* Púrpura */
    --accent-color: #3a86ff;       /* Azul */
    --dark-bg: #0a0e27;            /* Fondo oscuro */
    --card-bg: #1a1f3a;            /* Fondo de tarjetas */
    --success: #06d6a0;            /* Verde */
    --danger: #ff006e;             /* Rojo/Rosa */
}
```

## Funciones JavaScript Principales

- `loadAnimes()` - Obtiene animes del API
- `renderAnimes(animes)` - Renderiza las tarjetas
- `filterAnimes()` - Filtra por búsqueda
- `createAnime()` / `updateAnime()` - Guardar cambios
- `deleteAnime(id)` - Eliminar anime
- `viewAnimeDetails(id)` - Modal de detalles

## Mensaje de Error Común

### "Error al cargar los animes"
- ✓ Verifica que el servidor esté corriendo: `node index.js`
- ✓ Verifica que sea el puerto 3000
- ✓ Abre la consola (F12) para ver detalles del error

### "Error al guardar el anime"
- ✓ Revisa que todos los campos sean válidos
- ✓ Si subes imagen, verifica que Cloudinary esté configurado
- ✓ Revisa la consola del servidor para más información

## Personalización

### Cambiar el puerto de la API
En `frontend/index.html`, línea ~500:
```javascript
const API_BASE_URL = 'http://localhost:3000/api'; // Cambia el puerto aquí
```

### Cambiar colores
Edita la sección `:root` en el `<style>`

### Agregar más campos
1. Agrega `<input>` en el formulario modal
2. Agrega el campo en `handleFormSubmit()`
3. Agrega a `formData` antes del fetch

## Notas Técnicas

- **Fetch API**: Para peticiones HTTP
- **FormData**: Para archivos de imagen
- **Cloudinary**: Almacenamiento de imágenes
- **Base de Datos**: PostgreSQL con Sequelize
- **CORS**: Habilitado en el servidor

## Soporte

Para problemas:
1. Abre la consola (F12)
2. Revisa los errores
3. Verifica que la API esté activa
4. Consulta los logs del servidor

¡Disfruta catalogando tus animes! 🎌

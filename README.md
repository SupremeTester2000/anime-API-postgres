# Anime API - REST API con PostgreSQL y Cloudinary

API REST para gestión de animes con subida de imágenes a Cloudinary y base de datos PostgreSQL en Aiven.

## 🚀 Despliegue en Render

### Paso 1: Crear nuevo servicio Web
1. Ve a [Render Dashboard](https://dashboard.render.com)
2. Click en "New" → "Web Service"
3. Conecta tu repositorio de GitHub

### Paso 2: Configurar el servicio
- **Name**: `anime-api` (o el nombre que prefieras)
- **Environment**: `Docker`
- **Region**: Elige la más cercana (ej: Frankfurt, London, etc.)
- **Branch**: `main` (o la rama donde esté tu código)
- **Dockerfile Path**: `./Dockerfile` (deja por defecto)

### Paso 3: Variables de entorno
Agrega estas variables de entorno en la sección "Environment":

```
NODE_ENV=production
DATABASE_URL=postgres://tu-usuario:tu-password@tu-host:puerto/tu-db?sslmode=require
CLOUDINARY_CLOUD_NAME=tu-cloud-name
CLOUDINARY_API_KEY=tu-api-key
CLOUDINARY_API_SECRET=tu-api-secret
```

**⚠️ IMPORTANTE**: Reemplaza los valores con tus credenciales reales de Aiven y Cloudinary.

### Paso 4: Configuración adicional
- **Health Check Path**: `/api/animes` (opcional)
- **Auto-Deploy**: Activar para despliegues automáticos

### Paso 5: Desplegar
Click en "Create Web Service" y espera a que se complete el despliegue.

## 📡 Endpoints de la API

### GET /api/animes
Obtiene todos los animes
```bash
curl https://tu-app.render.com/api/animes
```

### GET /api/animes/:id
Obtiene un anime específico
```bash
curl https://tu-app.render.com/api/animes/1
```

### POST /api/animes
Crea un nuevo anime
```bash
curl -X POST https://tu-app.render.com/api/animes \
  -H "Content-Type: application/json" \
  -d '{"title":"Nombre del Anime","description":"Descripción"}'
```

### PUT /api/animes/:id
Actualiza un anime
```bash
curl -X PUT https://tu-app.render.com/api/animes/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Nuevo Título"}'
```

### DELETE /api/animes/:id
Elimina un anime
```bash
curl -X DELETE https://tu-app.render.com/api/animes/1
```

## 🛠 Tecnologías utilizadas
- **Node.js** con Express.js
- **PostgreSQL** en Aiven
- **Sequelize** ORM
- **Cloudinary** para imágenes
- **Docker** para contenerización
- **Render** para despliegue

## 📝 Notas importantes
- La base de datos se migra automáticamente al iniciar el contenedor
- Las imágenes se suben automáticamente a Cloudinary
- SSL está configurado para la conexión con Aiven
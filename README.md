# Escuela de Danzas CREAR — Backend (Express)

Sitio web institucional con backend REST para la Escuela de Danzas CREAR. Incluye panel de administración de clases y formulario de contacto.

---

## Tecnologías

- Node.js + Express.js
- PostgreSQL (vía Docker)
- pnpm
- Swagger (documentación de la API)

---

## Estructura del proyecto
/
├── front/ → Sitio web (HTML, CSS, JS)
├── modulos/
│ ├── clases/ → Rutas, controlador y modelo de clases
│ └── contacto/ → Rutas, controlador y modelo de contacto
├── conexiones/bd/ → Conexión a PostgreSQL
├── _docker-pg/ → Dockerfile y SQL de la base de datos
├── swagger.mjs → Configuración de Swagger
└── index.mjs → Entrada del servidor


---

## Requisitos

- Node.js v18 o superior
- pnpm
- Docker

---

## Instalación y puesta en marcha

### 1. Clonar el repositorio
git clone https://github.com/mbordon1/academia-crear-express.git
cd academia-crear-express


### 2. Instalar dependencias
pnpm install

## Configuración
1. cp .env.example .env
2. Completar DB_* con tus credenciales locales de Postgres
3. Generar ADMIN_CLAVE: node -e "console.log(require('bcryptjs').hashSync('tu_clave', 10))"
4. Definir COOKIE_SECRETO y JWT_FIRMA con cualquier string largo propio

### 4. Levantar la base de datos con Docker
El contenedor toma la configuracion desde el archivo local `.env`:

```bash
docker build -t crear-db ./_docker-pg
docker run -d --name crear-postgres -p 5433:5432 --env-file .env crear-db
```


Si el contenedor ya existe, solo inicialo:

```bash
docker start crear-postgres
```


### 5. Levantar el servidor
```bash
pnpm run dev
```

Documentación de la API (Swagger):
http://localhost:2026/api-docs


---

## Endpoints

### Clases

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/clases | Obtener todas las clases |
| GET | /api/clases/:id | Obtener una clase por ID |
| GET | /api/clases/nivel/:nivel | Filtrar clases por nivel |
| POST | /api/clases | Crear una clase |
| PUT | /api/clases/:id | Actualizar una clase |
| DELETE | /api/clases/:id | Eliminar una clase |

### Contacto

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /api/contacto | Guardar mensaje de contacto |

---

## Panel de administración

Disponible en:
http://localhost:2026/admin.html


## Autenticación y seguridad

El panel de administración está protegido con autenticación por cookies firmadas (cookie-parser).

### Rutas de autenticación

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /autenticar | Iniciar sesión |
| GET | /cerrar-sesion | Cerrar sesión |

### Variables de entorno nuevas

Agregar al `.env`:

```env
COOKIE_SECRETO=unaFraseLargaYSecretaParaFirmar
ADMIN_USUARIO=admin
ADMIN_CLAVE=tu_clave_segura
```

- Login: http://localhost:2026/login
- Admin: http://localhost:2026/admin (redirige al login si no hay sesión activa)

### Módulo agregado

```
modulos/
  └── autenticacion/
        ├── autenticacion.mjs        → lógica de login y logout
        ├── middleware.autenticacion.mjs  → verifica la cookie antes de entrar al admin
        └── rutas.autenticacion.mjs  → define las rutas /autenticar y /cerrar-sesion
```

1. El frontend hace POST /api/auth/login con { usuario, password }
2. El backend compara la contraseña con el HASH guardado (bcrypt)
3. Si coincide, genera un TOKEN (JWT) y se lo manda al frontend
4. El frontend guarda ese token y lo manda en cada request al admin


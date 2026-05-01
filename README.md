#  Academia CREAR - Backend (Express)

---

##  Tecnologías utilizadas

* Node.js
* Express.js
* Fetch API
* MockAPI (API externa)

---

##  Estructura del proyecto

* `/front` → Sitio web (HTML, CSS, JS)
* `/routes` → Definición de rutas
* `/controllers` → Lógica de negocio
* `index.mjs` → Configuración del servidor

---

##  Instalación

1. Clonar el repositorio
2. Instalar dependencias:

```
npm install
```

3. Ejecutar el servidor:

```
node index.mjs
```

---

##  Uso

Abrir en el navegador:

```
http://localhost:2026
```

---

##  Endpoints

* `GET /api/clases`
  Obtiene las clases desde MockAPI

---

##  API externa

Los datos son consumidos desde:

https://69cbcb910b417a19e07b4341.mockapi.io/api/v1/academia

---

##  Funcionalidades

* Servir contenido estático (frontend)
* Consumo de API externa
* Backend modularizado (rutas y controladores)
* Filtro y visualización dinámica en el frontend

---



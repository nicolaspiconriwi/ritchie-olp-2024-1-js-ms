# Basic Node.js API users CRUD

## Descripción

API básica de Node.js con Express y PostgreSQL para realizar operaciones CRUD en una tabla de usuarios y autenticación de usuarios con JWT. Este proyecto tiene como propósito servir de base para proyectos más complejos.

## Pre-requisitos

Los requisitos para ejecutar este proyecto son:

```bash
npm install npm@latest -g
```

## Instalación

1. Clonar el repositorio:

```bash
git clone
```

2. Instalar las dependencias:

```bash
npm install
```

3. Crear un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

```env
PORT = 4000
DATABASE_URL=postgres://default:pMGZQUc0h1vt@ep-polished-term-a4mniado-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require
JWT_SECRET=mySecretKey
```

Nota: No hay necesidad de crear la base de datos pues ya esta creada en vercel.

4. Ejecutar el proyecto:

```bash
npm start
```

## Dependencias

- [Express](https://expressjs.com/es/): Framework de Node.js para crear aplicaciones web y APIs.
- [pg](https://node-postgres.com/): Cliente de PostgreSQL para Node.js.
- [dotenv](https://www.npmjs.com/package/dotenv): Módulo que carga variables de entorno desde un archivo `.env`.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): Implementación de JSON Web Tokens (JWT) para Node.js.
- [bcrypt](https://www.npmjs.com/package/bcrypt): Librería para encriptar contraseñas.
- [cors](https://www.npmjs.com/package/cors): Middleware para habilitar CORS en Express.

## Tecnologías

- Node.js - Entorno de ejecución para JavaScript
- Express - Infraestructura web rápida, minimalista y flexible para Node.js
- PostgreSQL - Sistema de gestión de bases de datos relacional objeto

## Estructura de directorios

```txt
project-root/
│
|── learning-tips/            # Dependencias del proyecto
    ├── mvc.md/               # Explicacion de la arquitectura MVC(MODEL-VIEW-CONTROLLER)
    |── postgresql-commands.md/ # Comandos CRUD de PostgreSQL
    |── status.md/            # Explicacion de los codigos de estado HTTP y casos de uso
├── src/                      # Código fuente
│   ├── config/               # Configuración general (Base de datos, variables de entorno)
│   │   └── database.js       # Conexión a la base de datos
│   ├── controllers/          # Controladores
│   │   └── authController.js # Controlador de autenticación
│   ├── middlewares/          # Middlewares personalizados
│   │   └── authMiddleware.js # Middleware de autenticación
│   ├── models/               # Modelos de base de datos
│   │   └── userModel.js      # Modelo de usuario
│   ├── routes/               # Definición de rutas
│   |   ├── router.js         # Punto de entrada de rutas
│   │   └── authRoutes.js     # Rutas de autenticación
│   ├── services/             # Lógica adicional (Servicios externos, utilidades)
│   │   └── deportesCRUDApi.js # Ejemplo de servicio externo
│   ├── app.js                # Configuración y rutas de la aplicación
│   └── server.js             # Inicio del servidor
│
├── .env                      # Variables de entorno (como la URL de la base de datos, puerto del servidor, etc.)
├── .gitignore                # Archivos a ignorar por git
├── package.json              # Dependencias del proyecto
└── README.md                 # Documentación del proyecto
```
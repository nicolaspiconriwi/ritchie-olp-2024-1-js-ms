project-root/
│
├── src/                      # Código fuente
│   ├── config/               # Configuración general (Base de datos, variables de entorno)
│   │   └── database.js
│   ├── controllers/          # Controladores
│   │   └── authController.js
│   ├── middlewares/          # Middlewares personalizados
│   │   └── authMiddleware.js
│   ├── models/               # Modelos de base de datos
│   │   └── userModel.js
│   ├── routes/               # Definición de rutas
│   │   └── authRoutes.js
│   ├── services/             # Lógica adicional (Servicios externos, utilidades)
│   │   └── authService.js
│   ├── app.js                # Configuración y rutas de la aplicación
│   └── server.js             # Inicio del servidor
│
├── .env                      # Variables de entorno (como la URL de la base de datos)
├── .gitignore                # Archivos a ignorar por git
├── package.json              # Dependencias del proyecto
└── README.md                 # Documentación del proyecto

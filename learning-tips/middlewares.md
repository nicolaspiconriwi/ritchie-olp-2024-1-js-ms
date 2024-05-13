# Middlewares en Node.js

Los middlewares son funciones que se ejecutan antes de que lleguen a una ruta específica. En Node.js, los middlewares son funciones que tienen acceso al objeto de solicitud (req), al objeto de respuesta (res) y a la siguiente función de middleware en el ciclo de solicitud-respuesta de la aplicación. La siguiente función de middleware se denota normalmente con una variable llamada next.

Los middlewares se pueden utilizar para realizar tareas como la validación de datos, la autenticación de usuarios, la manipulación de datos de solicitud y respuesta, y la gestión de errores.

## Casos de uso

### 1. authenticationMiddleware

Un caso de uso común para los middlewares es la autenticación de usuarios. Por ejemplo, supongamos que tenemos una ruta que requiere que el usuario esté autenticado para acceder a ella. Podemos crear un middleware llamado authMiddleware que verifica si el usuario está autenticado antes de permitir que acceda a la ruta.

```javascript
const authMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

app.get("/profile", authMiddleware, (req, res) => {
  res.send("Welcome to your profile");
});
```

En este ejemplo, el middleware authMiddleware verifica si el usuario está autenticado utilizando el método isAuthenticated() proporcionado por la biblioteca de autenticación que estamos utilizando. Si el usuario está autenticado, llama a la función next() para permitir que la solicitud continúe. Si el usuario no está autenticado, envía una respuesta de estado 401 (No autorizado).

### 2. errorHandlingMiddleware

Otro caso de uso común para los middlewares es el manejo de errores. Por ejemplo, supongamos que tenemos una ruta que puede lanzar una excepción. Podemos crear un middleware llamado errorHandlingMiddleware que captura cualquier excepción lanzada por la ruta y envía una respuesta de error al cliente.

```javascript
const errorHandlingMiddleware = (err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
};

app.get("/error", (req, res, next) => {
  throw new Error("Something went wrong");
});

app.use(errorHandlingMiddleware);
```

En este ejemplo, la ruta /error lanza una excepción utilizando la palabra clave throw. El middleware errorHandlingMiddleware captura la excepción, registra el error en la consola y envía una respuesta de estado 500 (Error interno del servidor) al cliente.

### 3. loggingMiddleware

Un caso de uso adicional para los middlewares es el registro de solicitudes. Por ejemplo, podemos crear un middleware llamado loggingMiddleware que registra información sobre cada solicitud que llega al servidor.

```javascript
const loggingMiddleware = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  // log using famous node.js logger
  logger.info(`${req.method} ${req.url}`);
  next();
};

app.use(loggingMiddleware);
```

En este ejemplo, el middleware loggingMiddleware registra el método de solicitud y la URL de cada solicitud que llega al servidor utilizando la función console.log(). También podemos utilizar una biblioteca de registro de terceros como Winston o Bunyan para registrar información sobre las solicitudes.

### 4. dataValidationMiddleware

Otro caso de uso común para los middlewares es la validación de datos. Por ejemplo, supongamos que tenemos una ruta que espera ciertos datos en el cuerpo de la solicitud. Podemos crear un middleware llamado dataValidationMiddleware que valida los datos antes de permitir que la solicitud continúe.

```javascript
const dataValidationMiddleware = (req, res, next) => {
  if (req.body && req.body.name) {
    next();
  } else {
    res.status(400).send("Bad Request");
  }
};

app.post("/user", dataValidationMiddleware, (req, res) => {
  res.send("User created");
});
```

En este ejemplo, el middleware dataValidationMiddleware verifica si la solicitud contiene un campo de nombre en el cuerpo de la solicitud. Si el campo de nombre está presente, llama a la función next() para permitir que la solicitud continúe. Si el campo de nombre no está presente, envía una respuesta de estado 400 (Solicitud incorrecta).

### 5. responseFormattingMiddleware

Un caso de uso adicional para los middlewares es el formateo de respuestas. Por ejemplo, podemos crear un middleware llamado responseFormattingMiddleware que formatea la respuesta antes de enviarla al cliente.

```javascript
const responseFormattingMiddleware = (req, res, next) => {
  res.format({
    "text/plain": () => {
      res.send("Welcome to the website");
    },
    "text/html": () => {
      res.send("<h1>Welcome to the website</h1>");
    },
    "application/json": () => {
      res.json({ message: "Welcome to the website" });
    },
  });
};

app.get("/", responseFormattingMiddleware);
```

En este ejemplo, el middleware responseFormattingMiddleware formatea la respuesta en función del tipo de contenido solicitado por el cliente. Si el cliente solicita un tipo de contenido de texto sin formato, envía un mensaje de bienvenida en texto sin formato. Si el cliente solicita un tipo de contenido HTML, envía un mensaje de bienvenida en formato HTML. Si el cliente solicita un tipo de contenido JSON, envía un mensaje de bienvenida en formato JSON.

### 6. rateLimitingMiddleware

Otro caso de uso común para los middlewares es la limitación de la velocidad. Por ejemplo, podemos crear un middleware llamado rateLimitingMiddleware que limita la cantidad de solicitudes que un cliente puede hacer en un período de tiempo determinado.

```javascript
const rateLimitingMiddleware = (req, res, next) => {
  if (req.rateLimit.remaining > 0) {
    req.rateLimit.remaining--;
    next();
  } else {
    res.status(429).send("Too Many Requests");
  }
};

app.use(rateLimitingMiddleware);
```

En este ejemplo, el middleware rateLimitingMiddleware verifica si el cliente ha superado el límite de velocidad permitido. Si el cliente no ha superado el límite de velocidad, decrementa el recuento restante de solicitudes y llama a la función next() para permitir que la solicitud continúe. Si el cliente ha superado el límite de velocidad, envía una respuesta de estado 429 (Demasiadas solicitudes).

### 7. compressionMiddleware

Un caso de uso adicional para los middlewares es la compresión de respuestas. Por ejemplo, podemos crear un middleware llamado compressionMiddleware que comprime la respuesta antes de enviarla al cliente.

```javascript
const compressionMiddleware = (req, res, next) => {
  res.set("Content-Encoding", "gzip");
  res.set("Content-Type", "text/plain");
  res.send(zlib.gzipSync("Welcome to the website"));
};

app.get("/", compressionMiddleware);
```

En este ejemplo, el middleware compressionMiddleware comprime el mensaje de bienvenida utilizando el módulo zlib de Node.js y establece las cabeceras Content-Encoding y Content-Type en la respuesta antes de enviarla al cliente. Esto es particularmente util
cuando se envían grandes cantidades de datos al cliente y se desea reducir el tamaño de la respuesta.

### 8. cachingMiddleware

Otro caso de uso común para los middlewares es la caché de respuestas. Por ejemplo, podemos crear un middleware llamado cachingMiddleware que almacena en caché la respuesta de una solicitud para evitar la necesidad de volver a calcularla en el futuro.

```javascript
const cachingMiddleware = (req, res, next) => {
  const key = req.url;
  const cachedResponse = cache.get(key);

  if (cachedResponse) {
    res.send(cachedResponse);
  } else {
    res.send("Welcome to the website");
    cache.set(key, "Welcome to the website");
  }
};

app.get("/", cachingMiddleware);
```

En este ejemplo, el middleware cachingMiddleware verifica si la respuesta de la solicitud está almacenada en caché. Si la respuesta está almacenada en caché, la envía al cliente. Si la respuesta no está almacenada en caché, envía un mensaje de bienvenida al cliente y almacena la respuesta en caché para futuras solicitudes. La palabra reservada cache se refiere a un objeto que almacena las respuestas en caché.

### 9. securityMiddleware

Un caso de uso adicional para los middlewares es la seguridad. Por ejemplo, podemos crear un middleware llamado securityMiddleware que aplica medidas de seguridad a las solicitudes entrantes para proteger la aplicación de ataques comunes.

```javascript
const securityMiddleware = (req, res, next) => {
  res.set("X-Content-Type-Options", "nosniff");
  res.set("X-Frame-Options", "DENY");
  res.set("X-XSS-Protection", "1; mode=block");
  next();
};

app.use(securityMiddleware);
```

En este ejemplo, el middleware securityMiddleware establece las cabeceras X-Content-Type-Options, X-Frame-Options y X-XSS-Protection en la respuesta para proteger la aplicación de ataques de tipo sniffing de contenido, ataques de tipo clickjacking y ataques de tipo cross-site scripting (XSS), respectivamente.

### 10. decription-encryptionMiddleware

Otro caso de uso común para los middlewares es la encriptación y desencriptación de datos. Por ejemplo, podemos crear dos middlewares llamados encryptionMiddleware y decryptionMiddleware que encriptan y desencriptan los datos de la solicitud y la respuesta, respectivamente.

```javascript
const encryptionMiddleware = async (req, res, next) => {
  try {
    req.body = await encrypt(req.body);
    next();
  } catch (error) {
    res.status(500).send("Error en la encriptación de datos.");
  }
};

const decryptionMiddleware = async (req, res, next) => {
  try {
    let originalSend = res.send;
    res.send = async (body) => {
      body = await decrypt(body);
      originalSend.call(res, body);
    };
    next();
  } catch (error) {
    res.status(500).send("Error en la desencriptación de datos.");
  }
};

app.post("/user", encryptionMiddleware, (req, res) => {
  // Aquí, la lógica para crear un usuario con el body ya encriptado
  res.send("User created");
});

app.get("/user", decryptionMiddleware, (req, res, next) => {
  // Simulamos la obtención de datos que requieren ser desencriptados
  res.send("Encrypted user data");
});
```

En este ejemplo, el middleware encryptionMiddleware encripta los datos del cuerpo de la solicitud antes de permitir que la solicitud continúe. El middleware decryptionMiddleware desencripta los datos de la respuesta antes de enviarla al cliente. Ambos middlewares manejan los errores que puedan surgir durante el proceso de encriptación y desencriptación.

### 11. requestSanitizationMiddleware

Otro caso de uso común para los middlewares es la sanitización de datos. Por ejemplo, podemos crear un middleware llamado requestSanitizationMiddleware que limpia los datos de la solicitud antes de procesarlos.

```javascript
const sanitizeData = (data) => {
  // Lógica para limpiar los datos de la solicitud
  return data;
};

const requestSanitizationMiddleware = (req, res, next) => {
  req.body = sanitizeData(req.body);
  next();
};

app.post("/user", requestSanitizationMiddleware, (req, res) => {
  // Aquí, la lógica para crear un usuario con los datos ya sanitizados
  res.send("User created");
});
```

En este ejemplo, el middleware requestSanitizationMiddleware limpia los datos del cuerpo de la solicitud antes de permitir que la solicitud continúe. La función sanitizeData() se encarga de limpiar los datos de la solicitud según las reglas de sanitización definidas por la aplicación.

### 12. responseSanitizationMiddleware

Un caso de uso adicional para los middlewares es la sanitización de respuestas. Por ejemplo, podemos crear un middleware llamado responseSanitizationMiddleware que limpia los datos de la respuesta antes de enviarla al cliente.

```javascript
const sanitizeData = (data) => {
  // pongamos un ejemplo real
  if (data && data.password) {
    delete data.password;
  }
  return data;
};

const responseSanitizationMiddleware = (req, res, next) => {
  let originalSend = res.send;
  res.send = (body) => {
    body = sanitizeData(body);
    originalSend.call(res, body);
  };
  next();
};

app.get("/user", responseSanitizationMiddleware, (req, res) => {
  // Simulamos la obtención de datos que requieren ser sanitizados
  res.send("User data");
});
```

En este ejemplo, el middleware responseSanitizationMiddleware limpia los datos de la respuesta antes de enviarla al cliente utilizando la función sanitizeData(). En este caso, la función sanitizeData() elimina el campo de contraseña de los datos de la respuesta antes de enviarla al cliente, por motivos de seguridad.

### 13. requestTransformMiddleware

Otro caso de uso común para los middlewares es la transformación de datos. Por ejemplo, podemos crear un middleware llamado requestTransformMiddleware que transforma los datos de la solicitud antes de procesarlos.

```javascript
const transformData = (data) => {
  // Imaginemonos un ejemplo real
  if (data && data.name) {
    data.name = data.name.toUpperCase();
  }
  return data;
};

const requestTransformMiddleware = (req, res, next) => {
  req.body = transformData(req.body);
  next();
};

app.post("/user", requestTransformMiddleware, (req, res) => {
  // Aquí, la lógica para crear un usuario con los datos ya transformados
  res.send("User created");
});
```

En este ejemplo, el middleware requestTransformMiddleware transforma los datos del cuerpo de la solicitud antes de permitir que la solicitud continúe. La función transformData() se encarga de transformar los datos de la solicitud según las reglas de transformación definidas por la aplicación.

### 14. responseTransformMiddleware

Un caso de uso adicional para los middlewares es la transformación de respuestas. Por ejemplo, podemos crear un middleware llamado responseTransformMiddleware que transforma los datos de la respuesta antes de enviarla al cliente.

```javascript
const transformData = (data) => {
  // Imaginemonos un ejemplo real
  if (data && data.name) {
    data.name = data.name.toLowerCase();
  }
  return data;
};

const responseTransformMiddleware = (req, res, next) => {
  let originalSend = res.send;
  res.send = (body) => {
    body = transformData(body);
    originalSend.call(res, body);
  };
  next();
};

app.get("/user", responseTransformMiddleware, (req, res) => {
  // Simulamos la obtención de datos que requieren ser transformados
  res.send("User data");
});
```

En este ejemplo, el middleware responseTransformMiddleware transforma los datos de la respuesta antes de enviarla al cliente utilizando la función transformData(). En este caso, la función transformData() convierte el nombre de usuario en minúsculas antes de enviarlo al cliente.

### 15. requestAuthorizationMiddleware

Otro caso de uso común para los middlewares es la autorización de usuarios. Por ejemplo, podemos crear un middleware llamado requestAuthorizationMiddleware que verifica si el usuario tiene permiso para acceder a la ruta solicitada.

```javascript
const authorizeUser = (user) => {
  // Lógica para verificar si el usuario tiene permiso
  return user.role === "admin";
};

const requestAuthorizationMiddleware = (req, res, next) => {
  if (authorizeUser(req.user)) {
    next();
  } else {
    res.status(403).send("Forbidden");
  }
};

app.get("/admin", requestAuthorizationMiddleware, (req, res) => {
  res.send("Welcome to the admin panel");
});
```

En este ejemplo, el middleware requestAuthorizationMiddleware verifica si el usuario tiene permiso para acceder a la ruta solicitada utilizando la función authorizeUser(). Si el usuario tiene permiso, llama a la función next() para permitir que la solicitud continúe. Si el usuario no tiene permiso, envía una respuesta de estado 403 (Prohibido).

Me gustaria mencionar un caso de uso particular que tuve en un proyecto personal, en el cual la relacion entre usuarios, roles y permisos era muy compleja, por lo que se creo un middleware que se encargaba de verificar si el usuario tenia permisos para acceder a una ruta en especifico, y en caso de no tenerlos, se le redirigia a una pagina de error.

El problema es que tanto los roles, como los permisos y usuarios eran creados dinamicamente, el middleware se encargaba de verificar el id del usuario a travez del JWT, y luego verificaba si el usuario tenia permisos para acceder a la ruta solicitada, a travez de una consulta compleja a la base de datos.

Supongamos una relacion de muchos a muchos entre usuarios y roles, y una relacion de uno a muchos entre permisos y roles a travez de la tabla permissions cuyos atributos eran:

- id
- menu_id // el menu por dentro tenia el path de la ruta que estaba accediendo
- role_id
- create
- read
- update
- delete
- import
- export

Utilizando API RestFUL, se podia acceder a las rutas y los path de cada menu, por lo que se podia acceder a la ruta de la tabla permissions y verificar si el usuario tenia permisos para acceder a la ruta solicitada.

```javascript

const authorizeUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('roles') // roles es un array de ids
      .exec();
    if (!user) {
      return res.status(401).send('Unauthorized');
    }
    const permissions = await Permission.find({ role_id: { $in: user.roles } })
      .populate('menu')
      .exec();
    if (!permissions) {
      return res.status(403).send('Forbidden');
    }
    const path = req.path;
    const permission = permissions.find(p => p.menu.path === path);
    if (!permission) {
      return res.status(403).send('Forbidden');
    }
    if (permission.read) {
      next();
    } else {
      return res.status(403).send('Forbidden');
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
};

app.get('/admin', authorizeUser, (req, res) => {
  res.send('Welcome to the admin panel');
});
```

En este ejemplo, el middleware authorizeUser verifica si el usuario tiene permiso para acceder a la ruta solicitada utilizando la función authorizeUser(). Si el usuario tiene permiso, llama a la función next() para permitir que la solicitud continúe. Si el usuario no tiene permiso, envía una respuesta de estado 403 (Prohibido).

## Conclusión

Los middlewares son una característica poderosa de Node.js que nos permiten realizar tareas comunes como la autenticación de usuarios, el manejo de errores, el registro de solicitudes, la validación de datos, el formateo de respuestas, la limitación de la velocidad, la compresión de respuestas, la caché de respuestas, la seguridad, la encriptación y desencriptación de datos, la sanitización de datos, la transformación de datos y la autorización de usuarios. Los middlewares nos permiten encapsular la lógica de la aplicación en funciones reutilizables que se pueden aplicar a múltiples rutas y rutas de la aplicación.
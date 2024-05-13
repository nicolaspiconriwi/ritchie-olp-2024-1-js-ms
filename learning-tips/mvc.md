# MVC con node.js

## Introducción

MVC es un patrón de diseño que separa la lógica de negocio de la interfaz de usuario. En este caso, vamos a utilizarlo para separar la lógica de negocio de la lógica de presentación en una api RestFUL con node.js.

## ¿Qué es MVC?

MVC es un patrón de diseño que separa la lógica de negocio de la interfaz de usuario. Se compone de tres capas:

- **Model**: Representa la estructura de los datos y la lógica de negocio.
- **View**: Es la capa de presentación, se encarga de mostrar los datos al usuario.
- **Controller**: Es la capa de control, se encarga de gestionar las peticiones del usuario y comunicarse con el modelo.

## Que es una API RestFUL

Una API RESTful es una API que sigue los principios de REST (Representational State Transfer). Estos principios son:

- **Interfaz uniforme**: Las peticiones a la API deben ser uniformes, es decir, deben seguir un patrón. Los verbos HTTP (GET, POST, PUT, DELETE) se utilizan para indicar la acción que se desea realizar, de modo que la estructura de las peticiones, nunca lleva un verbo en la URL. Por ejemplo, para obtener un recurso se utiliza el verbo GET y la URL del recurso, para crear un recurso se utiliza el verbo POST y la URL del recurso:
  - GET /users
  - POST /users
  - PUT /users/1
  - DELETE /users/1
- **Identificación de recursos**: Cada recurso de la API debe tener una URL única que lo identifique. Por ejemplo, la URL /users se utiliza para obtener todos los usuarios, la URL /users/1 se utiliza para obtener el usuario con id 1.
- **Sin estado**: Cada petición a la API debe contener toda la información necesaria para ser procesada. La API no debe almacenar información sobre el estado del cliente.
- **Cacheable**: Las respuestas de la API deben ser cacheables.
- **Cliente-servidor**: La API debe seguir el modelo cliente-servidor.
- **Sistema en capas**: La API debe ser escalable y permitir la adición de capas intermedias.
- **Código bajo demanda**: La API debe permitir la descarga de código al cliente.

### Caso 1: Creando la vista de productos.

Para una API RestFUL, la vista es la respuesta que se envía al cliente. En este caso, vamos a crear una API RestFUL de productos con node.js.

#### Que NO! hacer:

```javascript
const express = require("express");
const app = express();
const PORT = 3000;

app.get("/products/get-all", (req, res) => {
  res.json({ message: "List of products" });
});

app.post("/products/insert", (req, res) => {
  res.json({ message: "Product created" });
});

app.put("/products/:id/update", (req, res) => {
  res.json({ message: "Product updated" });
});

app.delete("/products/:id/delete", (req, res) => {
  res.json({ message: "Product deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

Esto anterior es NO recomedado, ya que el nombre de los endpoints no siguen el patrón RESTful al agregar el verbo de la peticion en la estructura de la url. En su lugar, deberíamos hacer algo como esto:

```javascript
const express = require("express");
const app = express();
const PORT = 3000;

app.get("/products", (req, res) => {
  res.json({ message: "List of products" });
});

app.post("/products", (req, res) => {
  res.json({ message: "Product created" });
});

app.put("/products/:id", (req, res) => {
  res.json({ message: "Product updated" });
});

app.delete("/products/:id", (req, res) => {
  res.json({ message: "Product deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Caso 2: Creando el controlador de productos.

El controlador es la capa que se encarga de gestionar las peticiones del usuario y comunicarse con el modelo. En este caso, vamos a crear un controlador de productos con node.js.

```javascript
// userController.js

exports.getAllProducts = (req, res) => {
  res.json({ message: "List of products" });
};

exports.createProduct = (req, res) => {
  res.json({ message: "Product created" });
};

exports.updateProduct = (req, res) => {
  res.json({ message: "Product updated" });
};

exports.deleteProduct = (req, res) => {
  res.json({ message: "Product deleted" });
};
```

Por temas de este demo, el nombre de los metodos del controlador llevaran el sufijo `Product` para indicar que son metodos de productos. Pero en un proyecto real, el nombre de los metodos deberian ser mas descriptivos y reutilizar el nombre del recurso en plural. Por ejemplo, en vez de updateProduct, deberia ser update.

### Caso 3: Creando el modelo de productos.

El modelo es la capa que representa la estructura de los datos y la lógica de negocio, es la encargado de comunicarse directamente con la base de datos. En este caso, vamos a crear un modelo de productos con node.js.

```javascript
// productModel.js

const { pool } = require("../config/database");

exports.getAllProducts = async () => {
  const products = await pool.query("SELECT * FROM products");
  return products.rows;
};

exports.createProduct = async (product) => {
  const newProduct = await pool.query(
    "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *",
    [product.name, product.price]
  );
  return newProduct.rows[0];
};

exports.updateProduct = async (id, product) => {
  const updatedProduct = await pool.query(
    "UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *",
    [product.name, product.price, id]
  );
  return updatedProduct.rows[0];
};

exports.deleteProduct = async (id) => {
  const deletedProduct = await pool.query(
    "DELETE FROM products WHERE id = $1 RETURNING *",
    [id]
  );
  return deletedProduct.rows[0];
};
```

Recordemos el uso de la piscina de conexiones **Pool** para no tener que abrir y cerrar una conexión a la base de datos cada vez que se realice una consulta.

Para mas información sobre el uso de las consultas que se realizan en el modelo, puedes consultar la documentación de [node-postgres](https://node-postgres.com/).

### Caso 4: Creando el flujo final.

Obviaremos el punto de acceso server.js definido en el package.json, ya que no es necesario para este ejemplo. Así que iniciaremos con el archivo app.js.

```javascript
// app.js

const express = require("express");
const app = express();

app.use("/api", router);

module.exports = app;
```

Como podemos observar, el archivo app.js necesita de **express** para poder manejar las rutas y grupos de rutas con el metodo .use() el cual recibe como primer parametro la ruta base en string y como segundo parametro el archivo que contiene las rutas al cual le llamaremos **router**. Finalmente exportamos el objeto **app** para que pueda ser utilizado en el archivo server.js.

Ahora veamos que hay dentro del archivo router.js.

```javascript
// router.js

const express = require("express");
const productRoutes = require("./productRoutes");

const router = express.Router();

router.use("/products", productRoutes); // Justo aqui

module.exports = router;
```

En este archivo, se importa express y se importa el archivo **productRoutes** que contiene las rutas de los productos. Se crea un objeto **router** de express y se le asigna la ruta base **/products** y el archivo **productRoutes**. Finalmente se exporta el objeto **router** para que pueda ser utilizado en el archivo **app.js**.

Continuamos con el archivo **productRoutes.js**.

```javascript
// productRoutes.js

const express = require("express");

const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("./productController");

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
```

En este archivo, se importa express y se importa el archivo **productController** que contiene los metodos de los productos. Se crea un objeto **router** de express y se le asignan las rutas **GET, POST, PUT, DELETE** con sus respectivos metodos del controlador. Finalmente se exporta el objeto **router** para que pueda ser utilizado en el archivo **router.js**.

Finalmente, veamos el archivo **productController.js**.

```javascript

// productController.js

const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("./productModel");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = await createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await updateProduct(req.params.id, req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await deleteProduct(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

Recordemos que el archivo **productModel** contiene los metodos que se encargan de realizar las consultas a la base de datos. En este archivo, se importa el archivo **productModel** y se crean los metodos que se encargan de gestionar las peticiones del usuario y comunicarse con el modelo. Cada metodo se encarga de llamar al metodo correspondiente del modelo y enviar la respuesta al cliente. En caso de error, se envia una respuesta con el codigo de estado 500 y un mensaje de error.

## Conclusión

En este caso, hemos utilizado el patrón MVC para separar la lógica de negocio de la lógica de presentación en una api RestFUL con node.js. Hemos creado un modelo de productos que se encarga de comunicarse con la base de datos, un controlador de productos que se encarga de gestionar las peticiones del usuario y comunicarse con el modelo, y unas rutas de productos que se encargan de dirigir las peticiones del usuario al controlador correspondiente. De esta forma, hemos separado la lógica de negocio de la lógica de presentación y hemos seguido los principios de REST para crear una api RestFUL con node.js.
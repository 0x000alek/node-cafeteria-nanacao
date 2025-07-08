# Backend con Node y Express (G86) - Prueba: Cafetería Nanacao

Este repositorio continene el dessarrollo de la solución propuesta para el _Prueba Cafetería Nanacao_, del curso **Backend con Node y Express (G86)**.

## 🚀 Instalación

Sigue estos pasos para instalar y ejecutar el proyecto localmente:

### 1. Clona el repositorio

Para obtener una copia local del proyecto, ejecuta el siguiente comando:

```bash
git https://github.com/0x000alek/node-cafeteria-nanacao
cd node-cafeteria-nanacao
```

Esto descargará todo el código fuente y te posicionará dentro de la carpeta raíz del proyecto, lista para comenzar a trabajar.

### 2. Instala las dependencias

Ejecuta el siguiente comando para instalar todas las dependencias del proyecto:

```bash
npm install
```

## 📁 Estructura del rpoyecto

```plaintext
node-cafeteria-nanacao                    # Carpeta raíz del proyecto
├── docs                                  # Documentación del proyecto (manuales, diagramas, especificaciones)
│   └── Instrucciones del desafío.pdf     # Instrucciones del desafío para crear tests con Jest y Supertest
│   └── Rúbrica del desafío.pdf           # Rúbrica con criterios y puntajes para evaluar la prueba
├── routes                                # Definición de rutas o endpoints de la API (configuración de Express)
│   └── server.routes.js                  # Archivo principal de rutas del servidor para el CRUD de cafés
├── test                                  # Pruebas automatizadas del proyecto (unitarias, de integración, etc.)
│   └── server.spec.js                    # Especificaciones y pruebas Jest para validar los endpoints del API
├── .gitignore                            # Define los archivos y carpetas que deben ser ignorados por Git
├── .prettierignore                       # Define archivos/carpetas que Prettier debe omitir al formatear
├── babel.config.js                       # Configuración de Babel para transpilar el código JS moderno
├── cafes.json                            # Fuente de datos estáticos con los cafés disponibles
├── eslint.config.js                      # Reglas y configuración para el linter ESLint (detección de errores/estilo)
├── index.js                              # Archivo principal que inicia la aplicación (entry point)
├── package-lock.json                     # Registro exacto de versiones instaladas para asegurar entornos consistentes
├── package.json                          # Metainformación del proyecto, dependencias, scripts y configuración npm
├── prettier.config.js                    # Configuración de estilo para el formateador de código Prettier
└── README.md                             # Documentación principal del proyecto (descripción, instrucciones, etc.)
```

## 📡 API - Endpoints

A continuación se detallan los endpoints disponibles en el servidor Express:

| Método | Ruta         | Descripción                                                          |
| ------ | ------------ | -------------------------------------------------------------------- |
| GET    | `/cafes`     | Retorna un array con todos los cafés disponibles.                    |
| GET    | `/cafes/:id` | Retorna un café por su `id`.                                         |
| POST   | `/cafes`     | Agrega un nuevo café al listado. El `id` debe ser único.             |
| PUT    | `/cafes/:id` | Actualiza un café. El `id` en la URL debe coincidir con el del body. |
| DELETE | `/cafes/:id` | Elimina un café. Requiere un token JWT en el header `Authorization`. |

### 📥 Detalles por Endpoint

`GET /cafes`

- ✅ 200 OK – Retorna todos los cafés (array).

`GET /cafes/:id`

- ✅ 200 OK – Retorna el café correspondiente.
- ❌ 404 Not Found – No existe café con ese id.

`POST /cafes`

#### 📤 Body esperado:

```json
{
  "id": 5,
  "nombre": "Latte"
}
```

- ✅ 201 Created – Café agregado con éxito.
- ❌ 400 Bad Request – Ya existe un café con ese id.

`PUT /cafes/:id`

#### 📤 Body esperado:

```json
{
  "id": 2,
  "nombre": "Flat White"
}
```

- ✅ 200 OK – Café actualizado correctamente.
- ❌ 400 Bad Request – El id en la URL no coincide con el del body.
- ❌ 404 Not Found – No existe café con ese id.

`DELETE /cafes/:id`

#### 🛡 Requiere header:

```markfile
Authorization: Bearer <token>
```

- ✅ 200 OK – Café eliminado.
- ❌ 400 Bad Request – No se recibió token.
- ❌ 404 Not Found – No existe café con ese id.

## 🧪 Ejecutar pruebas con Jest

Este proyecto utiliza [Jest](https://jestjs.io/) como framework de testing para validar el correcto funcionamiento de la API. Las pruebas están ubicadas en la ruta `tests/server.spec.js` y cubren los siguientes escenarios:

1. `GET /cafes` debe retornar un **status code 200** y un arreglo que contenga al menos un **objeto**.
2. `DELETE /cafes/:id` debe retornar un **status code 404** al intentar eliminar un café con un `id` que no existe.
3. `POST /cafes` debe agregar un nuevo café y retornar un **status code 201**.
4. `PUT /cafes` debe retornar un s**tatus code 400** si el `id` recibido por parámetros es diferente al `id` del payload.

### ▶️ ¿Cómo ejecutar las pruebas?

Para ejecutar las pruebas, utiliza la siguiente línea de comandos:

```bash
npm run test
```

Si todo está correctamente configurado, deberías ver en la terminal una salida similar a la siguiente:

```bash
> desafio@1.0.2 test
> jest --forceExit

  console.log
    SERVER ON

      at Object.log (index.js:6:26)

 PASS  tests/server.spec.js
  Operaciones CRUD de cafes
    GET /cafes
      ✓ should return a 200 status and an array with at least one object (34 ms)
    DELETE /cafes/:id
      ✓ should return a 404 status if the cafe id does not exist (4 ms)
    POST /cafes
      ✓ should return a 201 status when a new cafe is added (15 ms)
    PUT /cafes/:id
      ✓ should return a 400 status code if the ID in the params is different from the ID in the payload (2 ms)

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        0.723 s
Ran all test suites.
```

## 📜 Scripts disponibles

Estos comandos pueden ejecutarse con `npm run <script>`:

| Script         | Descripción                                                                   |
| -------------- | ----------------------------------------------------------------------------- |
| `format`       | Aplica formato al código usando Prettier.                                     |
| `format:check` | Verifica si el código está correctamente formateado con Prettier.             |
| `lint`         | Ejecuta ESLint para analizar el código en busca de errores o malas prácticas. |
| `lint:fix`     | Ejecuta ESLint y corrige automáticamente errores solucionables.               |
| `test`         | Ejecuta la suite de pruebas con Jest, detectando handles abiertos.            |

## 📦 Dependencias

| Dependencia | Versión                                                               | Descripción                                                                                                                                               |
| ----------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| express     | ![express](https://img.shields.io/badge/express-5.1.0-brightgreen)    | Para facilitar la creación de servidores y APIs web. Proporciona una estructura clara para definir rutas, middlewares, controladores y manejo de errores. |
| jest        | ![jest](https://img.shields.io/badge/jest-30.0.4-blue)                | Framework de pruebas para JavaScript. Permite ejecutar tests unitarios, de integración y mocks de forma sencilla y rápida.                                |
| supertest   | ![supertest](https://img.shields.io/badge/supertest-7.1.3-blueviolet) | Librería de pruebas HTTP que permite testear endpoints de Express (o cualquier servidor) con sintaxis simple basada en `superagent`.                      |

### Desarrollo

| Dependencia | Versión | Badge                                                             | Descripción                                                                                    |
| ----------- | ------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| babel       | ^7.28.0 | ![babel](https://img.shields.io/badge/babel-7.28.0-yellow)        | Conjunto de herramientas para transpilar código moderno de JavaScript a versiones compatibles. |
| eslint      | 9.30.1  | ![eslint](https://img.shields.io/badge/eslint-9.29.0-brightgreen) | Herramienta principal para analizar y mantener consistente el estilo del código.               |
| prettier    | 3.6.2   | ![prettier](https://img.shields.io/badge/prettier-3.5.3-pink)     | Formateador de código automático para mantener un estilo consistente.                          |

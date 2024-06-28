# Ave: Página Web para Gestión de Productos con Node.js y Express

[![ave-1.png](https://i.postimg.cc/5tcZgRYj/ave-1.png)](https://postimg.cc/hXryPM0q)

Este proyecto consiste en desarrollar una página web que consume el listado de productos proporcionado por la API de FakeStore. Utiliza tecnologías como HTML, CSS, JavaScript, Express.js, Node.js server y Bootstrap para su implementación.




## Características del Proyecto

- **Consumo de API:**
  - La página obtiene el listado de productos de la API de [FakeStore](https://fakestoreapi.com/).

- **Diseño Responsivo:**
  - Utiliza Bootstrap para un diseño responsivo y amigable para dispositivos móviles y de escritorio.

- **Visualización de Productos:**
  - Los productos se muestran en una grilla de 4 columnas.
  - Cada producto se presenta como una tarjeta con imagen, título, descripción truncada (hasta 30 caracteres), categoría y precio.

- **Descripción Completa:**
  - Los usuarios pueden ver la descripción completa de un producto al pasar el mouse sobre la descripción truncada.

- **Productos en Oferta:**
  - Se muestra un listado de productos en oferta obtenidos del servidor.
  - La información se almacena persistentemente en un repositorio (JSON, base de datos, etc.), incluyendo ID del producto y porcentaje de descuento.
  - Los productos en oferta se destacan visualmente con una banda "de oferta" sobre la imagen del producto.
  - Se muestra el precio original, el descuento aplicado, el monto descontado y el precio final.

- **Traducción Automática:**
  - Utiliza un endpoint en el servidor para traducir automáticamente los títulos y descripciones de los productos al español.

- **Gestión de Carrito de Compra:**
  - Los usuarios pueden agregar productos al carrito de compra desde la página principal.
  - Existe una página de gestión del carrito donde se muestran todos los productos agregados, permitiendo eliminar y modificar cantidades.
  - Incluye un botón para finalizar la compra, enviando la información al servidor para su registro permanente. No se requiere información vinculada al usuario para realizar compras.
 
[![a1.jpg](https://i.postimg.cc/8CKX3Xsh/a1.jpg)](https://postimg.cc/qtKG6LsR)

## Configuración y Ejecución del Proyecto

Para ejecutar el proyecto localmente:

1. **Instalación de Dependencias:**
   - Asegúrate de tener Node.js y npm instalados en tu máquina.
   - Ejecuta `npm install` para instalar todas las dependencias del proyecto.

2. **Configuración del Servidor:**
   - Inicia el servidor Node.js utilizando Express.js con el comando `node server.js`.

3. **Acceso a la Aplicación:**
   - Abre tu navegador y accede a `http://localhost:3000` para visualizar la página principal de gestión de productos.
  
[![a2.jpg](https://i.postimg.cc/hPLygtf4/a2.jpg)](https://postimg.cc/dL0mjv2g)

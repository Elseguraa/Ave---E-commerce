const fs = require('fs');
const express = require('express');
const cors = require('cors'); 
const app = express();
const PORT = 3000;
const translate = require("node-google-translate-skidz");



app.use(cors()); 
app.use(express.json());



let compras = [];

app.get("/", async (req, res) => {
  try {
    const productos = await fetchProductos();
    const promises = productos.map(async (producto) => {
      const tituloTraducido = await traducir(producto.title);
      const descripcionTraducido = await traducir(producto.description);

      producto.title = tituloTraducido.translation;
      producto.description = descripcionTraducido.translation;

      console.log("Producto traducido:", producto); 

      return producto;
    });

    const productosTraducidos = await Promise.all(promises);

    console.log("Productos traducidos:", productosTraducidos); 

    res.json({
      productos: productosTraducidos,
    });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
});

async function fetchProductos() {
  try {
    const respuesta = await fetch("https://fakestoreapi.com/products");
    const objecto = await respuesta.json();
    return objecto;
  } catch (error) {
    console.error("Error al fetchear:", error);
    throw error;
  }
}

async function traducir(texto) {
  return new Promise((resolve, reject) => {
    translate(
      {
        text: texto,
        source: "en",
        target: "es",
      },
      function (result) {
        if (result && result.translation) {
          resolve({ translation: result.translation });
        } else {
          reject("Error en la traducción");
        }
      }
    );
  });
}




app.get('/ofertas', (req, res) => {
  try {
    const ofertasData = fs.readFileSync('./ofertas.json');
    const ofertas = JSON.parse(ofertasData);
    res.json(ofertas);
  } catch (error) {
    console.error('Error al obtener los productos en oferta:', error);
    res.status(500).json({ error: 'Error al obtener los productos en oferta' });
  }
});

// Endpoint para obtener las compras
app.get('/compras', (req, res) => {
  res.json(compras);
});


// Endpoint para agregar una compra
app.post('/compras', (req, res) => {
  const nuevaCompra = req.body;
  compras.push(nuevaCompra);
  fs.writeFileSync('./compras.json', JSON.stringify(compras, null, 2));
  res.status(201).json({ message: 'Compra registrada correctamente' });
});


app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
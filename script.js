async function obtenerProductos() {
    try {
        const response = await fetch('http://localhost:3000/');
        const data = await response.json();
        return data.productos;
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        return []; 
    }
}


let carrito = [];

function mostrarProductosEnCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }

    const carritoProductos = document.getElementById('carritoProductos');
    if (carritoProductos) {
        carritoProductos.innerHTML = '';

        if (carrito.length === 0) {
            carritoProductos.innerHTML = '<p>El carrito está vacío.</p>';
        } else {
            carrito.forEach((producto, index) => {
                const productoHTML = `
                    <div class="producto-carrito">             
                        <img src="${producto.imagenURL}" alt="${producto.nombre}">
                        <div class="info-producto">
                            <h3>${producto.nombre}</h3>
                            <p>Precio: $${producto.precio}</p>
                            <input type="number" value="${producto.cantidad || 1}" min="1" onchange="actualizarCantidad(${index}, this.value)">
                            <button onclick="eliminarProducto(${index})">Eliminar</button>
                        </div>
                    </div>
                `;
                carritoProductos.innerHTML += productoHTML;
            });
        }
    }
    
    const numeroCarrito = document.getElementById('numeroCarrito');
    if (numeroCarrito) {
        numeroCarrito.textContent = carrito.length;
    }
}



function agregarAlCarrito(nombre, precio, imagenURL) {
    const producto = { nombre, precio: parseFloat(precio.toFixed(2)), imagenURL }; 
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito)); 
    console.log("Producto agregado al carrito:", producto); 
    mostrarProductosEnCarrito(); 
    mostrarModal(); 

}









function eliminarProducto(index) {
    carrito.splice(index, 1); 
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarProductosEnCarrito(); 
}

function actualizarCantidad(index, nuevaCantidad) {
    if (nuevaCantidad <= 0) {
        eliminarProducto(index); 
    } else {
       
        carrito[index].cantidad = parseInt(nuevaCantidad);
    }
}


function mostrarModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';
    

    const closeBtn = document.getElementsByClassName('close')[0];
    closeBtn.onclick = function() {
      modal.style.display = 'none';
    }
  

    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    }
  }




  async function obtenerProductosOferta() {
    try {
        const response = await fetch('http://localhost:3000/ofertas');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los productos en oferta:', error);
        return [];
    }
}



async function mostrarProductos() {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';

    const productosOferta = await obtenerProductosOferta(); 
    const productos = await obtenerProductos(); 

    productos.forEach(producto => {
        const descripcionCortada = producto.description.length > 30 ? producto.description.substring(0, 30) + '...' : producto.description;
        let esProductoEnOferta = false;
        let ofertaCorrespondiente = null;

        const productoOferta = productosOferta.find(oferta => oferta.id === producto.id);

        if (productoOferta) {
            esProductoEnOferta = true;
            ofertaCorrespondiente = productoOferta;
        }

        const precioOriginal = producto.price;
        const precioFinal = esProductoEnOferta ? producto.price * (1 - ofertaCorrespondiente.discount / 100) : producto.price;
        const montoDescontado = esProductoEnOferta ? (precioOriginal - precioFinal).toFixed(2) : '';
        const descuentoInfo = esProductoEnOferta ? `Descuento: ${ofertaCorrespondiente.discount}%` : '';
        const precioInfo = esProductoEnOferta ? `
            <p>Precio Original: <del>$${precioOriginal.toFixed(2)}</del></p>
            <p style="color: #0290bb;">Precio Final: $${precioFinal.toFixed(2)}</p>` : `
            <p>Precio: $${precioOriginal.toFixed(2)}</p>`;

        const productoCard = `
            <div class="card ${esProductoEnOferta ? 'oferta' : ''}">
                <img src="${producto.image}" alt="${producto.title}">
                <h3>${producto.title}</h3>
                <p class="description" title="${producto.description}">${descripcionCortada}</p>
                <p>Categoría: ${producto.category}</p>
                ${descuentoInfo !== '' ? `<p>${descuentoInfo}</p>` : ''}
                ${montoDescontado !== '' ? `<p>Monto Descontado: $${montoDescontado}</p>` : ''}
                ${precioInfo}
                <button class="btn-agregar" onclick="agregarAlCarrito('${producto.title}', ${precioFinal}, '${producto.image}')">Agregar al carrito</button>
            </div>
        `;
        productGrid.innerHTML += productoCard;
    });
}


// script del menu responsive sticky menu

var nav = document.getElementById('mySidenav')

window.addEventListener('scroll', function () {
    if (window.pageYOffset > nav.offsetTop) {
        nav.classList.add('nav-fixed')
    } else {
        nav.classList.remove('nav-fixed')
    }
})
 // script del menu responsive effecto accordeon
var submenu = document.getElementsByClassName('link-submenu')

for (var i = 0; i < submenu.length; i++) {
    submenu[i].onclick = function () {
        var content = this.nextElementSibling

        if (content.style.maxHeight) {
            content.style.maxHeight = null
        } else {
            content.style.maxHeight = content.scrollHeight + "px"
        }

    }
}












mostrarProductos();
mostrarProductosEnCarrito();

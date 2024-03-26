let carrito = {};
let productos = [];

function cargarProductos() {
  fetch("../data/productos.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      mostrarProductos(data); // Llama a la función para mostrar los productos después de cargarlos
    })
    .catch((error) => {
      console.error("Error al cargar los productos:", error);
    });
}

// Función para mostrar los productos en el contenedor
function mostrarProductos(productos) {
  const productosContainer = document.getElementById("productos-container");
  productos.forEach((producto) => {
    const productoHTML = `
      <div class="col mb-5 contenedorHijo">
        <div class="card h-100 product">
          <img class="card-img-top product-image" src="${producto.imagen}" alt="${producto.nombre}">
          <div class="card-body p-4">
            <div class="text-center">
              <h5 class="fw-bolder">${producto.nombre}</h5>
              <span class="text-muted categoria">Categoria: ${producto.categoria} $${producto.precio}</span>
            </div>
            <div class="dropdown mt-3 contenedorHijo text-center">
              <button class="btn btn-secondary dropdown-toggle dropdownMenuButton" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Cantidad</button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li><a class="dropdown-item quantity-selection" href="#">1</a></li>
                <li><a class="dropdown-item quantity-selection" href="#">2</a></li>
                <li><a class="dropdown-item quantity-selection" href="#">3</a></li>
              </ul>
            </div>
          </div>
          <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div class="text-center">
              <a class="btn btn-outline-dark mt-auto btnAddToCart" href="#">Add to cart</a>
            </div>
          </div>
        </div>
      </div>
    `;
    productosContainer.insertAdjacentHTML("beforeend", productoHTML);
  });

  // Agregar event listeners a los botones "Add to Cart"
  const botonesAddToCart = document.querySelectorAll(".btnAddToCart");
  botonesAddToCart.forEach((boton) => {
    boton.addEventListener("click", (event) => {
      event.preventDefault();
      const nombreProductoElement = boton
        .closest(".product")
        .querySelector("h5");
      const nombreProducto = nombreProductoElement
        ? nombreProductoElement.innerText
        : "";

      const precioProductoElement = boton
        .closest(".product")
        .querySelector(".precio");
      const precioProducto = precioProductoElement
        ? parseFloat(precioProductoElement.innerText.replace("$", ""))
        : 0;
      addToCart(nombreProducto, 1, precioProducto); // Agregar 1 unidad del producto al carrito
    });
  });

  // Event listener para la selección de cantidad
  document.querySelectorAll(".quantity-selection").forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      const selectedQuantity = event.target.innerText;
      event.target
        .closest(".dropdown")
        .querySelector(
          ".dropdownMenuButton"
        ).innerText = `Cantidad: ${selectedQuantity}`;
    });
  });
}

cargarProductos();

document.addEventListener("DOMContentLoaded", function () {
  const productosContainer = document.getElementById("productos-container");

  // Hacer una solicitud AJAX para obtener el JSON de productos
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const productos = JSON.parse(xhr.responseText);
      mostrarProductos(productos);
    }
  };
  xhr.open("GET", "../data/productos.json", true);
  xhr.send();
});

function guardarCarritoEnSessionStorage() {
  sessionStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarCarritoDesdeSessionStorage() {
  const carritoGuardado = sessionStorage.getItem("carrito");
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    updateCartCounter(); // Actualizar el contador del carrito después de cargarlo
  }
}

cargarCarritoDesdeSessionStorage();

// Función para agregar un producto al carrito
function addToCart(nombre, cantidad, precioUnitario) {
  if (isNaN(cantidad) || cantidad <= 0) {
    Toastify({
      text: `Por favor, ingrese una cantidad válida.`,
      duration: 3000, // Duración del toast en milisegundos (3 segundos en este caso)
      close: true, // Habilitar el botón para cerrar el toast
      gravity: "bottom", // Posición del toast en la pantalla
      position: "center", // Posición del toast en la pantalla
      style: {
        background: "red",
      },
    }).showToast();

    /*  alert("Por favor, ingrese una cantidad válida."); */
    return;
  }

  // Validar que la cantidad no exceda cierto límite (On-Going: Mejora para la entrega Final)
  const cantidadLimite = 10;
  if (cantidad > cantidadLimite) {
    alert(`La cantidad máxima permitida por producto es de ${cantidadLimite}.`);
    return;
  }

  // Verificar si el producto ya está en el carrito
  if (carrito.hasOwnProperty(nombre)) {
    carrito[nombre].cantidad += cantidad;
  } else {
    carrito[nombre] = { cantidad, precioUnitario };
  }

  // Actualizar el contador del carrito
  updateCartCounter();

  Toastify({
    text: `Se agregó "${nombre}" al carrito`,
    duration: 3000, // Duración del toast en milisegundos (3 segundos en este caso)
    close: true, // Habilitar el botón para cerrar el toast
    gravity: "bottom", // Posición del toast en la pantalla
    position: "center", // Posición del toast en la pantalla
  }).showToast();

  guardarCarritoEnSessionStorage();
}

// Función para actualizar el contador del carrito
function updateCartCounter() {
  const cartCounter = document.getElementById("cartCounter");
  if (cartCounter) {
    const totalItems = Object.values(carrito).reduce(
      (total, item) => total + item.cantidad,
      0
    );
    cartCounter.innerText = totalItems;
  }
}

document.querySelectorAll(".quantity-selection").forEach((item) => {
  item.addEventListener("click", (event) => {
    event.preventDefault();
    const selectedQuantity = event.target.innerText;
    event.target
      .closest(".dropdown")
      .querySelector(
        ".dropdownMenuButton"
      ).innerText = `Cantidad: ${selectedQuantity}`;
  });
});

// Función para obtener el precio unitario según el nombre del producto
function obtenerPrecioUnitario(nombreProducto) {
  const productos = [
    { nombre: "Perro", precioUnitario: 6400 },
    { nombre: "Gato", precioUnitario: 7300 },
    { nombre: "Elefante", precioUnitario: 8500 },
    { nombre: "Zorro", precioUnitario: 7000 },
    { nombre: "Luffi", precioUnitario: 6500 },
    { nombre: "Naruto", precioUnitario: 7000 },
    { nombre: "Dragon Ball", precioUnitario: 15000 },
    { nombre: "Llamas", precioUnitario: 15000 },
    { nombre: "Bambi", precioUnitario: 15000 },
  ];

  // Buscar el producto por su nombre
  const producto = productos.find((p) => p.nombre === nombreProducto);

  if (producto) {
    return producto.precioUnitario;
  } else {
    console.error(`Producto no encontrado: ${nombreProducto}`);
    return 0;
  }
}

// Obtener todos los botones "Add to Cart"
const botonesAddToCart = document.querySelectorAll(".btnAddToCart");

botonesAddToCart.forEach((boton) => {
  boton.addEventListener("click", (event) => {
    event.preventDefault();
    const nombreProductoElement = boton.closest(".product").querySelector("h5");
    const nombreProducto = nombreProductoElement
      ? nombreProductoElement.innerText
      : "";

    const precioProductoElement = boton
      .closest(".product")
      .querySelector(".precio");
    const precioProducto = precioProductoElement
      ? parseFloat(precioProductoElement.innerText.replace("$", ""))
      : 0;

    const selectedQuantity = boton
      .closest(".product")
      .querySelector(".dropdownMenuButton")
      .innerText.split(": ")[1];
    const cantidad = parseInt(selectedQuantity);

    addToCart(nombreProducto, cantidad, precioProducto);
  });
});

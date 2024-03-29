let carrito = {};

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
    const nombreProducto = boton
      .closest(".product")
      .querySelector("h5").innerText;

    const selectedQuantity = boton
      .closest(".product")
      .querySelector(".dropdownMenuButton")
      .innerText.split(": ")[1];

    const cantidad = parseInt(selectedQuantity);

    const precioUnitario = obtenerPrecioUnitario(nombreProducto);

    addToCart(nombreProducto, cantidad, precioUnitario);
  });
});

function limpiarSessionStorage() {
  sessionStorage.clear();
}

// Resetear las cantidades de los contenedores a cero
function resetQuantities() {
  const dropdownButtons = document.querySelectorAll(".dropdownMenuButton");
  dropdownButtons.forEach((button) => {
    button.innerText = "Cantidad";
  });
}

// Mostrar el contenido del modal de confirmación de compra
function mostrarTotalCompra(totalCompra) {
  const confirmationMessage = `¿Estás seguro que deseas realizar la compra?`;
  const totalMessage = `Total a pagar: $${totalCompra.toFixed(2)}`;

  // Actualizar el contenido del modal
  document.getElementById("confirmationBody").innerHTML = `
        <p>${confirmationMessage}</p>
        <p>${totalMessage}</p>
      `;

  // Ocultar el carrito al mostrar el modal de confirmación
  document.getElementById("carritoContenedor").style.display = "none";

  // Mostrar el modal como un modal de diálogo
  const myModal = new bootstrap.Modal(document.getElementById("confirmModal"), {
    backdrop: "static",
    keyboard: false,
  });
  myModal.show();

  // Función para el evento de confirmar compra
  function confirmPurchase() {
    Swal.fire({
      position: "bottom-end'",
      icon: "success",
      title: "Compra realizada con éxito.",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      limpiarSessionStorage();
      // Limpiar el carrito
      carrito = {};

      // Actualizar la visualización del carrito
      mostrarCarrito();

      // Actualizar el contador del carrito después de limpiarlo
      updateCartCounter();

      // Reiniciar las cantidades de los contenedores a cero
      resetQuantities();

      myModal.hide();

      // Eliminar el event listener después de confirmar la compra
      document
        .getElementById("confirmPurchaseButton")
        .removeEventListener("click", confirmPurchase);
    });
  }

  document
    .getElementById("confirmPurchaseButton")
    .addEventListener("click", confirmPurchase);
}

// Calcular el total de la compra
function calcularTotalCompra() {
  let totalCompra = 0;

  for (const producto of Object.values(carrito)) {
    const totalProducto = producto.cantidad * producto.precioUnitario;
    const importeConIva = totalProducto * 0.21;
    const precioTotalAPagar = totalProducto + importeConIva;
    totalCompra += precioTotalAPagar;
  }

  return totalCompra;
}

// Mostrar el contenido del carrito en una ventana emergente
function mostrarCarrito() {
  const carritoContenedorExistente =
    document.getElementById("carritoContenedor");

  if (carritoContenedorExistente) {
    carritoContenedorExistente.remove();
  }

  const carritoContenedor = document.createElement("div");
  carritoContenedor.id = "carritoContenedor";

  // Verificar si el carrito está vacío
  if (Object.keys(carrito).length === 0) {
    Toastify({
      text: `Carrito vacío`,
      duration: 3000,
      close: false,
      gravity: "top",
      position: "center",
      style: {
        background: "green",
      },
    }).showToast();
    return;
  }

  // Visualizo la fecha de la compra
  const fechaCompraElement = document.createElement("p");
  fechaCompraElement.innerText = `Día de la compra: ${new Date(
    Date.now()
  ).toLocaleDateString()}`;
  carritoContenedor.appendChild(fechaCompraElement);

  // Mostrar el texto "Detalle de la compra hasta el momento"
  const detalleCompraElement = document.createElement("p");
  detalleCompraElement.innerText = "Detalle de la compra hasta el momento:";
  carritoContenedor.appendChild(detalleCompraElement);

  // Mostrar los elementos del carrito
  const listaCarrito = document.createElement("ul");

  let totalSinIva = 0;

  for (const [nombre, producto] of Object.entries(carrito)) {
    const listItem = document.createElement("li");
    const totalProducto = producto.cantidad * producto.precioUnitario;
    totalSinIva += totalProducto;
    const importeConIva = totalProducto * 0.21;
    const precioTotalAPagar = totalProducto + importeConIva;

    listItem.innerText = `Producto: ${nombre} - Cantidad: ${
      producto.cantidad
    } - Importe: $${totalProducto.toFixed(2)} - IVA: $${importeConIva.toFixed(
      2
    )} - Precio total por producto: $${precioTotalAPagar.toFixed(2)}`;
    listaCarrito.appendChild(listItem);
  }

  // Agregar la lista al contenedor
  carritoContenedor.appendChild(listaCarrito);

  // Agregar el total a pagar al final del carrito
  const totalAPagarElement = document.createElement("p");
  const totalCompra = calcularTotalCompra();
  totalAPagarElement.innerText = `Total a pagar: $${totalCompra.toFixed(2)}`;
  carritoContenedor.appendChild(totalAPagarElement);

  // Agregar botón de "Cerrar"
  const closeButton = document.createElement("button");
  closeButton.innerText = "Cerrar";
  closeButton.addEventListener("click", () => {
    carritoContenedor.remove();
  });
  carritoContenedor.appendChild(closeButton);

  // Agregar botón de "Limpiar Carrito" solo si el carrito no está vacío
  if (Object.keys(carrito).length > 0) {
    const clearButton = document.createElement("button");
    clearButton.innerText = "Limpiar Carrito";
    clearButton.addEventListener("click", () => {
      // Limpiar el carrito al hacer clic en el botón "Limpiar Carrito"
      carrito = {};
      // Actualizar la visualización del carrito
      mostrarCarrito();
      // Actualizar el contador del carrito después de limpiarlo
      updateCartCounter();
    });
    carritoContenedor.appendChild(clearButton);
  }

  // Agregar botón de "Pagar"
  const payButton = document.createElement("button");
  payButton.innerText = "Pagar";
  payButton.addEventListener("click", () => {
    const totalCompra = calcularTotalCompra();
    mostrarTotalCompra(totalCompra);
  });
  carritoContenedor.appendChild(payButton);

  // Agregar el contenedor del carrito al cuerpo del documento
  document.body.appendChild(carritoContenedor);
}

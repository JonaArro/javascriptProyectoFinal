document.addEventListener("DOMContentLoaded", function () {
  const formularioBusqueda = document.querySelector("#formulario-busqueda");
  const inputBusqueda = document.querySelector("#input-busqueda");
  const contenedorResultados = document.querySelector("#contenedor-resultados");

  formularioBusqueda.addEventListener("submit", function (event) {
    event.preventDefault();
    const textoBusqueda = inputBusqueda.value.trim().toLowerCase();
    if (textoBusqueda === "") {
      contenedorResultados.innerHTML = "<p>Ingrese un término de búsqueda.</p>";
      return;
    }
    const productos = [
      {
        nombre: "Perro",
        categoria: "Sonajero",
        precio: 6400,
        imagen: "../asset/1.Sonajero_Perro.png",
      },
      {
        nombre: "Gato",
        categoria: "Sonajero",
        precio: 7300,
        imagen: "../asset/2.Sonajero_Gato.png",
      },
      {
        nombre: "Elefante",
        categoria: "Peluche",
        precio: 8500,
        imagen: "../asset/3.Peluche_Elefante.png",
      },
      {
        nombre: "Zorro",
        categoria: "Peluche",
        precio: 7000,
        imagen: "../asset/4.Peluche_Zorro.png",
      },
      {
        nombre: "Luffi",
        categoria: "Peluche",
        precio: 6500,
        imagen: "../asset/5.Peluche_Lufi.png",
      },
      {
        nombre: "Naruto",
        categoria: "Peluche",
        precio: 7000,
        imagen: "../asset/6.Peluche_ Naruto.png",
      },
      {
        nombre: "Dragon Ball",
        categoria: "Cunero",
        precio: 15000,
        imagen: "../asset/7.Cunero_Dragon_Ball.png",
      },
      {
        nombre: "Llamas",
        categoria: "Cunero",
        precio: 15000,
        imagen: "../asset/8.Cunero_Llamas.png",
      },
      {
        nombre: "Bambi",
        categoria: "Cunero",
        precio: 15000,
        imagen: "../asset/9.Cunero_Bambi.png",
      },
    ];
    const resultados = productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(textoBusqueda)
    );
    if (resultados.length === 0) {
      const contenedorMensaje = document.querySelector("#mensaje-busqueda");
      contenedorMensaje.innerHTML = "<p>Ingrese un término de búsqueda.</p>";
      return;
    }
    //HTML para mostrar los resultados
    const htmlResultados = resultados
      .map(
        (producto) =>
          `<div class="col mb-5 contenedorHijo">
                <div class="card h-100 product">
                    <img class="card-img-top product-image" src="${producto.imagen}" alt="${producto.nombre}">
                    <div class="card-body p-4">
                      <div class="text-center">
                        <h5 class="fw-bolder">${producto.nombre}</h5>
                        <span class="text-muted categoria">Categoria: ${producto.categoria}</span>
                        <span class="text-muted precio">$${producto.precio}</span>
                     </div>
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                      <div class="text-center">
                        <a class="btn btn-outline-dark mt-auto btnAddToCart" href="#">Add to cart</a>
                      </div>
                    </div>
                  </div>
                </div>
            </div>`
      )
      .join("");
    contenedorResultados.innerHTML = `<div class="container px-4 px-lg-5 mt-5"><div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">${htmlResultados}</div></div>`;
    const botonesAddToCartBusqueda = document.querySelectorAll(".btnAddToCart");

    // Agrega event listeners a los botones "Add to Cart" en los resultados de búsqueda
    botonesAddToCartBusqueda.forEach((boton) => {
      boton.addEventListener("click", (event) => {
        event.preventDefault();

        const productoSeleccionado = boton.closest(".product");
        const nombreProducto =
          productoSeleccionado.querySelector("h5").innerText;

        // Busca el elemento que contiene la categoría y el precio
        const categoriaElement =
          productoSeleccionado.querySelector(".categoria");
        const precioElement = productoSeleccionado.querySelector(".precio");
        // Obténgo el texto que contiene la categoría y el precio
        const categoriaText = categoriaElement.innerText;
        const precioText = precioElement.innerText;
        // Utiliza una expresión regular para extraer solo el precio del texto
        const precioMatch = precioText.match(/\d+(\.\d+)?/);
        // Verifica si se encontró un precio válido
        if (precioMatch) {
          // Convierte el precio a un número de punto flotante
          const precioUnitario = parseFloat(precioMatch[0]);
          // Verifica si el precio es válido
          if (!isNaN(precioUnitario)) {
            // Llama a addToCart con el precio unitario correcto
            const cantidad = 1; // O la cantidad deseada, en este caso 1
            addToCart(nombreProducto, cantidad, precioUnitario);
          } else {
            console.error("Precio unitario no válido:", precioMatch[0]);
          }
        } else {
          console.error(
            "No se pudo encontrar un precio válido en el texto:",
            precioText
          );
        }
      });
    });
  });
});

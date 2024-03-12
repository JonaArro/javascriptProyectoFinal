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
        nombre: "Sonajero Perro",
        categoria: "Sonajero",
        precio: 6400,
        imagen: "../asset/1.Sonajero_Perro.png",
      },
      {
        nombre: "Sonajero Gato",
        categoria: "Sonajero",
        precio: 7300,
        imagen: "../asset/2.Sonajero_Gato.png",
      },
      {
        nombre: "Peluche Elefante",
        categoria: "Peluche",
        precio: 8500,
        imagen: "../asset/3.Peluche_Elefante.png",
      },
      {
        nombre: "Peluche Zorro",
        categoria: "Peluche",
        precio: 7000,
        imagen: "../asset/4.Peluche_Zorro.png",
      },
      {
        nombre: "Cunero Dragon Ball",
        categoria: "Cunero",
        precio: 15000,
        imagen: "../asset/5.Cunero_Dragon_Ball.png",
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
                            <span class="text-muted">Categoria: ${producto.categoria} $</span>${producto.precio}
                        </div>
                    </div>
                </div>
            </div>`
      )
      .join("");
    contenedorResultados.innerHTML = `<div class="container px-4 px-lg-5 mt-5"><div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">${htmlResultados}</div></div>`;
  });
});

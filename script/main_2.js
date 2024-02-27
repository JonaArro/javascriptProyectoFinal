//Variables principales
let password = 1;
let loginAttempts = 4; // Número máximo de intentos
let loggedIn = false;
let carrito = []; // Definir el carrito
const listaProductosSonajero = [];
const listaProductosCunero = [];
const listaProductosLetras = [];
const listaProductosPeluche = [];

//Clase Producto
class Productos {
  constructor(id, nombre, categoria, subCategoria, precio, stock, img) {
    this.id = id;
    this.nombre = nombre;
    this.categoria = categoria;
    this.subCategoria = subCategoria;
    this.precio = precio;
    this.stock = stock;
    this.img = img;
  }
}
//Declaración, seteo y Carga de Arrays
const productosSonajeros = [
  [1, "Perro", "Sonajero", "Animal", 10000, 10, "imagen1.jpg"],
  [2, "Zorro", "Sonajero", "Animal", 10000, 10, "imagen1.jpg"],
  [3, "Gallo", "Sonajero", "Animal", 7000, 10, "imagen1.jpg"],
  [4, "Vaca", "Sonajero", "Animal", 10000, 10, "imagen1.jpg"],
];

for (const data of productosSonajeros) {
  const [id, nombre, categoria, subCategoria, precio, stock, img] = data;
  listaProductosSonajero.push(
    new Productos(
      id,
      nombre,
      categoria,
      subCategoria,
      parseFloat(precio),
      stock,
      img
    )
  );
}

const productosCunero = [
  [1, "Estrellas y planetas", "Cunero", "Universo", 35000, 10, "imagen1.jpg"],
  [2, "Estrellas", "Cunero", "Universo", 35000, 10, "imagen1.jpg"],
  [3, "Animales de la Granja", "Cunero", "Animal", 35000, 10, "imagen1.jpg"],
  [4, "Animales del mar", "Cunero", "Animal", 35000, 10, "imagen1.jpg"],
  [5, "Dinosaurios", "Cunero", "Dinosaurio", 35000, 10, "imagen1.jpg"],
];

for (const data of productosCunero) {
  const [id, nombre, categoria, subCategoria, precio, stock, img] = data;
  listaProductosCunero.push(
    new Productos(
      id,
      nombre,
      categoria,
      subCategoria,
      parseFloat(precio),
      stock,
      img
    )
  );
}

const productosLetras = [
  [1, "Letra", "Palabra", "Letra", 1500, 0, "imagen1.jpg"], //Los nombres son a pedido no hay Stock
  [2, "Estrella", "Palabra", "Universo", 500, 10, "imagen1.jpg"],
  [3, "Esfera", "Palabra", "Figura geométrica", 500, 10, "imagen1.jpg"],
  [4, "Borla", "Palabra", "General", 500, 10, "imagen1.jpg"],
];

for (const data of productosLetras) {
  const [id, nombre, categoria, subCategoria, precio, stock, img] = data;
  listaProductosLetras.push(
    new Productos(
      id,
      nombre,
      categoria,
      subCategoria,
      parseFloat(precio),
      stock,
      img
    )
  );
}

const productosPeluches = [
  [1, "Perro", "Peluche", "Animal", 10000, 10, "imagen1.jpg"],
  [2, "Zorro", "Peluche", "Animal", 10000, 10, "imagen1.jpg"],
  [3, "Jirafa", "Peluche", "Animal", 10000, 10, "imagen1.jpg"],
  [4, "Elefante", "Peluche", "Animal", 10000, 10, "imagen1.jpg"],
  [5, "T-Rex", "Peluche", "Dinosaurio", 10000, 10, "imagen1.jpg"],
  [6, "Brontosaurio", "Peluche", "Dinosaurio", 10000, 10, "imagen1.jpg"],
  [7, "Triceratop", "Peluche", "Dinosaurio", 10000, 10, "imagen1.jpg"],
];

for (const data of productosPeluches) {
  const [id, nombre, categoria, subCategoria, precio, stock, img] = data;
  listaProductosPeluche.push(
    new Productos(
      id,
      nombre,
      categoria,
      subCategoria,
      parseFloat(precio),
      stock,
      img
    )
  );
}

//-----------------------------------------------------
//Funciones
//-----------------------------------------------------

// Calcular el impuesto del 21% del total
function calcularIVA(total) {
  let iva = total * 0.21;
  // Redondear el resultado del cálculo del IVA
  iva = Math.round(iva);
  return iva;
}

//Proceso de pago del carrito
function pagarCarrito() {
  if (carrito.length > 0) {
    let subtotal = carrito.reduce(
      (acc, item) => acc + item.precioUnitario * item.cantidad,
      0
    );
    let fecha = new Date();
    let iva = calcularIVA(subtotal);
    let total = subtotal + iva;

    let confirmation = confirm(
      "Resumen del carrito de compras al " +
        fecha.toLocaleDateString() +
        ":\n\n" +
        carrito
          .map(
            (item, index) =>
              `${index + 1}. Producto: ${item.nombre} - Cantidad: ${
                item.cantidad
              } - Precio Unitario: $${item.precioUnitario}`
          )
          .join("\n") +
        "\n\nSubtotal: $" +
        subtotal.toFixed(2) +
        "\nIVA (21%): $" +
        iva.toFixed(2) +
        "\nTotal a pagar (incluido IVA): $" +
        total.toFixed(2) +
        "\n\n¿Desea confirmar la compra?"
    );

    if (confirmation) {
      // Limpiar el carrito después de pagar
      carrito = [];
      alert("¡Gracias por su compra! El carrito ha sido vaciado.");
    } else {
      let eliminarProducto = confirm(
        "¿Desea eliminar algún producto del carrito?"
      );

      if (eliminarProducto) {
        let idProducto = parseInt(
          prompt(
            "Ingrese el número del producto que desea eliminar:\n\n" +
              carrito
                .map(
                  (item, index) =>
                    `${index + 1}. Producto: ${item.nombre} - Cantidad: ${
                      item.cantidad
                    } - Precio Unitario: $${item.precioUnitario}`
                )
                .join("\n")
          )
        );

        if (
          !isNaN(idProducto) &&
          idProducto >= 1 &&
          idProducto <= carrito.length
        ) {
          // Obtener el índice del producto en base al número ingresado
          let index = idProducto - 1;
          let eliminado = carrito.splice(index, 1)[0];
          alert(`Se ha eliminado el producto ${eliminado.nombre} del carrito.`);
        } else {
          alert("Número de producto inválido.");
        }
      }
    }
  } else {
    alert("El carrito está vacío. No hay nada que pagar.");
  }
}

//Buscar Productos
function buscarProducto() {
  let textoBusqueda = prompt("Ingrese el nombre del producto a buscar:");

  let productosEncontrados = [];

  // Buscar en la lista de Sonajeros
  productosEncontrados = productosEncontrados.concat(
    listaProductosSonajero.filter((producto) =>
      producto.nombre.toLowerCase().includes(textoBusqueda.toLowerCase())
    )
  );

  // Buscar en la lista de Cuneros
  productosEncontrados = productosEncontrados.concat(
    listaProductosCunero.filter((producto) =>
      producto.nombre.toLowerCase().includes(textoBusqueda.toLowerCase())
    )
  );

  // Buscar en la lista de Letras
  productosEncontrados = productosEncontrados.concat(
    listaProductosLetras.filter((producto) =>
      producto.nombre.toLowerCase().includes(textoBusqueda.toLowerCase())
    )
  );

  // Buscar en la lista de Peluches
  productosEncontrados = productosEncontrados.concat(
    listaProductosPeluche.filter((producto) =>
      producto.nombre.toLowerCase().includes(textoBusqueda.toLowerCase())
    )
  );

  if (productosEncontrados.length > 0) {
    // Mostrar detalles de los productos encontrados
    let mensaje = "Productos encontrados:\n\n";
    productosEncontrados.forEach((producto) => {
      mensaje += `Nombre: ${producto.nombre}\nCategoría: ${producto.categoria}\nPrecio: $${producto.precio}\nStock: ${producto.stock}\n\n`;
    });
    alert(mensaje);
  } else {
    alert("No se encontraron productos que coincidan con la búsqueda.");
  }
}

//Confirmar Salida sin FInalizar la compra
function confirmarSalirSinFinalizarCompra() {
  if (carrito.length > 0) {
    let confirmacionSalir = confirm(
      "Aún tienes productos en el carrito. ¿Estás seguro de salir sin finalizar la compra?"
    );
    if (confirmacionSalir) {
      alert("Gracias por visitarnos. ¡Hasta luego!");
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
}

// Compras
// a.- Compra de sonajeros
function compraSonajero() {
  let continuar;

  do {
    let opcionesDisponibles = listaProductosSonajero
      .map((producto) => `${producto.id}. ${producto.nombre}`)
      .join("\n");
    let idProducto = parseInt(
      prompt(
        "Ingrese el ID del Sonajero que desea comprar:\n" +
          opcionesDisponibles +
          "\n"
      )
    );

    // Verificar si el usuario canceló la entrada
    if (idProducto === null) {
      alert("Se canceló la operación.");
      return; // Salir de la función
    }

    // Buscar el producto en listaProductosSonajero
    let productoEncontrado = listaProductosSonajero.find(
      (producto) => producto.id === idProducto
    );

    if (productoEncontrado) {
      let cantidad;
      while (true) {
        cantidad = prompt(
          `¿Cuántos ${productoEncontrado.nombre} desea comprar?`
        );
        if (cantidad === null) {
          // Si el usuario cancela, volver al menú de sonajeros
          alert("Se canceló la operación.");
          return compraSonajero();
        } else {
          cantidad = parseInt(cantidad);
          if (!isNaN(cantidad) && cantidad > 0) {
            if (cantidad <= productoEncontrado.stock) {
              break;
            } else {
              alert("No hay suficiente stock disponible para esa cantidad.");
            }
          } else {
            alert("Por favor, ingrese una cantidad válida mayor que cero.");
          }
        }
      }

      // Verificar si el usuario canceló la entrada
      if (cantidad === null) {
        alert("Se canceló la operación.");
        return; // Salir de la función
      }

      // Verificar si hay suficiente stock
      if (cantidad <= productoEncontrado.stock) {
        // Restar la cantidad comprada del stock
        productoEncontrado.stock -= cantidad;

        // Agregar el producto al carrito global
        carrito.push({
          id: productoEncontrado.id,
          nombre: productoEncontrado.nombre,
          categoria: productoEncontrado.categoria,
          precioUnitario: productoEncontrado.precio,
          cantidad: cantidad,
        });

        alert(
          `Se ha agregado la cantidad de ${cantidad} Sonajero/s de ${productoEncontrado.nombre} al carrito.`
        );
      } else {
        alert(
          `No hay suficiente stock disponible para Sonajeros de ${productoEncontrado.nombre}.`
        );
        continue; // Volver al inicio del bucle
      }
    } else {
      alert("El ID ingresado no corresponde a ningún sonajero.");
    }

    continuar = prompt(
      "¿Desea agregar más Productos Sonajeros al carrito? (s/n)"
    );

    // Verificar si el usuario canceló la entrada
    if (continuar === null) {
      alert("Se canceló la operación.");
      return; // Salir de la función
    }

    // Convertir a minúsculas y verificar la respuesta solo si no es null
    continuar = continuar.toLowerCase();

    // Verificar si la respuesta es válida
    if (continuar !== "s" && continuar !== "n") {
      alert("Por favor, ingrese una respuesta válida (s/n).");
    }
  } while (continuar === "s");

  // Mostrar el resumen del carrito
  if (carrito.length > 0) {
    let total = carrito.reduce(
      (acc, item) => acc + item.precioUnitario * item.cantidad,
      0
    );

    alert(
      "Resumen Parcial del carrito de compras:\n\n" +
        carrito
          .map(
            (item) =>
              `Producto ${item.categoria} de ${item.nombre} - Cantidad: ${item.cantidad} - Precio Unitario: $${item.precioUnitario}`
          )
          .join("\n") +
        "\n\nTotal a pagar: $" +
        total.toFixed(2)
    );
  } else {
    alert("El carrito está vacío.");
  }
}

// b.- Compra de cuneros
function compraCunero() {
  let continuar;

  do {
    let opcionesDisponibles = listaProductosCunero
      .map((producto) => `${producto.id}. ${producto.nombre}`)
      .join("\n");
    let idProducto = parseInt(
      prompt(
        "Ingrese el ID del cunero que desea comprar:\n" +
          opcionesDisponibles +
          "\n"
      )
    );

    // Verificar si el usuario cancela
    if (idProducto === null) {
      alert("Se canceló la operación.");
      return; // Salir de la función
    }

    // Buscar el producto en listaProductosCunero por ID
    let productoEncontrado = listaProductosCunero.find(
      (producto) => producto.id === idProducto
    );

    if (productoEncontrado) {
      let cantidad;
      while (true) {
        cantidad = prompt(
          `¿Cuántos Cuneros de ${productoEncontrado.nombre} desea comprar?`
        );
        if (cantidad === null) {
          // Si el usuario cancela, volver al menú de cuneros
          alert("Se canceló la operación.");
          return compraCunero();
        } else {
          cantidad = parseInt(cantidad);
          if (!isNaN(cantidad) && cantidad > 0) {
            if (cantidad <= productoEncontrado.stock) {
              break;
            } else {
              alert("No hay suficiente stock disponible para esa cantidad.");
            }
          } else {
            alert("Por favor, ingrese una cantidad válida mayor que cero.");
          }
        }
      }

      // Verificar si hay suficiente stock
      if (cantidad <= productoEncontrado.stock) {
        // Restar la cantidad comprada del stock
        productoEncontrado.stock -= cantidad;

        // Agregar el producto al carrito global
        carrito.push({
          id: productoEncontrado.id,
          nombre: productoEncontrado.nombre,
          categoria: productoEncontrado.categoria,
          precioUnitario: productoEncontrado.precio,
          cantidad: cantidad,
        });

        alert(
          `Se ha agregado la cantidad de ${cantidad} Cunero/s de ${productoEncontrado.nombre} al carrito.`
        );
      } else {
        alert(
          `No hay suficiente stock disponible para Cuneros de ${productoEncontrado.nombre}.`
        );
        continue; // Volver al inicio del bucle
      }
    } else {
      alert("El ID ingresado no corresponde a ningún Cunero.");
    }

    continuar = prompt(
      "¿Desea agregar más Productos Cuneros al carrito? (s/n)"
    );

    // Verificar si el usuario cancela
    if (continuar === null) {
      alert("Se canceló la operación.");
      return; // Salir de la función
    }

    // Convertir a minúsculas y verificar la respuesta solo si no es null
    continuar = continuar.toLowerCase();

    // Verificar si la respuesta es válida
    if (continuar !== "s" && continuar !== "n") {
      alert("Por favor, ingrese una respuesta válida (s/n).");
    }
  } while (continuar === "s");

  // Mostrar el resumen del carrito
  if (carrito.length > 0) {
    let total = carrito.reduce(
      (acc, item) => acc + item.precioUnitario * item.cantidad,
      0
    );

    alert(
      "Resumen Parcial del carrito de compras:\n\n" +
        carrito
          .map(
            (item) =>
              `Producto ${item.categoria} de ${item.nombre} - Cantidad: ${item.cantidad} - Precio Unitario: $${item.precioUnitario}`
          )
          .join("\n") +
        "\n\nTotal a pagar: $" +
        total.toFixed(2)
    );
  } else {
    alert("El carrito está vacío.");
  }
}

// c.- Compra de letras por palabra
function compraLetrasPorPalabra() {
  let palabra = prompt("Ingrese el nombre que desea adquirir:");
  let totalLetrasAgregadas = palabra.length; // Total de letras agregadas al carrito

  // Encontrar el producto con id: 1 en la lista de productos de letras
  let productoEncontrado = listaProductosLetras.find(
    (producto) => producto.id === 1
  );

  // Verificar si se encontró el producto
  if (productoEncontrado) {
    // Agregar el producto al carrito global
    carrito.push({
      id: productoEncontrado.id,
      nombre: productoEncontrado.nombre,
      categoria: productoEncontrado.categoria,
      precioUnitario: productoEncontrado.precio,
      cantidad: totalLetrasAgregadas, // Cantidad total de letras
    });

    // Mostrar mensaje de alerta
    alert(
      `Se ha agregado la cantidad de ${totalLetrasAgregadas} letras al carrito.`
    );

    // Preguntar si desea agregar productos al inicio y al final de la palabra
    let opcion = prompt(
      "¿Desea agregar decoraciones al inicio y al final de la palabra? (s/n)"
    ).toLowerCase();

    if (opcion === "s") {
      mostrarProductosDisponibles();
    }
  } else {
    alert(`No hay producto disponible para la letra.`);
  }
}

//Mostrar productos disponibles para decoraciones de letras
function mostrarProductosDisponibles() {
  let productosDisponibles = listaProductosLetras.filter(
    (producto) => producto.id >= 2 && producto.id <= 4
  );

  let mensaje =
    "Decoraciones disponibles para agregar al inicio y al final de la palabra:\n\n";

  for (const producto of productosDisponibles) {
    mensaje += `${producto.id}. ${producto.nombre}\n`;
  }

  let seleccionInicio = parseInt(
    prompt(mensaje + "\nElija el ID de la Decoración para agregar al inicio:")
  );
  let seleccionFinal = parseInt(
    prompt(mensaje + "\nElija el ID de la Decoración para agregar al final:")
  );

  agregarProductosInicioYFin(seleccionInicio, seleccionFinal);
}

// Agregar productos al inicio y al final de la palabra
function agregarProductosInicioYFin(idInicio, idFinal) {
  let productosAgregados = 0;

  // Buscar los productos seleccionados en la lista de productos de letras
  let productoInicio = listaProductosLetras.find(
    (producto) => producto.id === idInicio
  );

  let productoFinal = listaProductosLetras.find(
    (producto) => producto.id === idFinal
  );

  // Verificar si se encontraron ambos productos
  if (productoInicio && productoFinal) {
    // Verificar si hay suficiente stock para ambos productos
    if (productoInicio.stock >= 1 && productoFinal.stock >= 1) {
      // Restar la cantidad seleccionada del stock de cada producto
      productoInicio.stock -= 1;
      productoFinal.stock -= 1;

      // Agregar cada producto al carrito con una cantidad de 1
      carrito.push({
        id: productoInicio.id,
        nombre: productoInicio.nombre,
        categoria: productoInicio.categoria,
        precioUnitario: productoInicio.precio,
        cantidad: 1,
      });

      carrito.push({
        id: productoFinal.id,
        nombre: productoFinal.nombre,
        categoria: productoFinal.categoria,
        precioUnitario: productoFinal.precio,
        cantidad: 1,
      });

      productosAgregados += 2;
    } else {
      alert(
        "No hay suficiente stock disponible para agregar al inicio y al final de la palabra."
      );
    }
  } else {
    alert("Los productos seleccionados no están disponibles.");
  }

  // Mostrar mensaje indicando la cantidad de productos agregados al carrito
  if (productosAgregados > 0) {
    alert(
      `Se han agregado ${productosAgregados} productos al inicio y al final de la palabra.`
    );
    mostrarResumenCarrito(); // Mostrar resumen del carrito
  } else {
    alert("No se agregaron productos al inicio y al final de la palabra.");
  }
}

//d.- Compra de peluches
function compraPeluches() {
  let continuar;

  do {
    let opcionesDisponibles = listaProductosPeluche
      .map((producto) => `${producto.id}. ${producto.nombre}`)
      .join("\n");
    let idProducto = parseInt(
      prompt(
        "Ingrese el ID del Peluche que desea comprar:\n" +
          opcionesDisponibles +
          "\n"
      )
    );

    // Verificar si el usuario cancela
    if (idProducto === null) {
      alert("Se canceló la operación.");
      return; // Salir de la función
    }

    // Buscar el producto en listaProductosPeluche por ID
    let productoEncontrado = listaProductosPeluche.find(
      (producto) => producto.id === idProducto
    );

    if (productoEncontrado) {
      let cantidad;
      while (true) {
        cantidad = prompt(
          `¿Cuántos Peluches de ${productoEncontrado.nombre} desea comprar?`
        );
        if (cantidad === null) {
          // Si el usuario cancela, volver al menú de peluches
          alert("Se canceló la operación.");
          return compraPeluches();
        } else {
          cantidad = parseInt(cantidad);
          if (!isNaN(cantidad) && cantidad > 0) {
            if (cantidad <= productoEncontrado.stock) {
              break;
            } else {
              alert("No hay suficiente stock disponible para esa cantidad.");
            }
          } else {
            alert("Por favor, ingrese una cantidad válida mayor que cero.");
          }
        }
      }

      // Verificar si hay suficiente stock
      if (cantidad <= productoEncontrado.stock) {
        // Restar la cantidad comprada del stock
        productoEncontrado.stock -= cantidad;

        // Agregar el producto al carrito global
        carrito.push({
          id: productoEncontrado.id,
          nombre: productoEncontrado.nombre,
          categoria: productoEncontrado.categoria,
          precioUnitario: productoEncontrado.precio,
          cantidad: cantidad,
        });

        alert(
          `Se ha agregado la cantidad de ${cantidad} Peluche/s de ${productoEncontrado.nombre} al carrito.`
        );
      } else {
        alert(
          `No hay suficiente stock disponible para Peluches de ${productoEncontrado.nombre}.`
        );
        continue; // Volver al inicio del bucle
      }
    } else {
      alert("El ID ingresado no corresponde a ningún peluche.");
    }

    continuar = prompt(
      "¿Desea agregar más Productos Peluches al carrito? (s/n)"
    );

    // Verificar si el usuario cancela
    if (continuar === null) {
      alert("Se canceló la operación.");
      return; // Salir de la función
    }

    // Convertir a minúsculas y verificar la respuesta solo si no es null
    continuar = continuar.toLowerCase();

    // Verificar si la respuesta es válida
    if (continuar !== "s" && continuar !== "n") {
      alert("Por favor, ingrese una respuesta válida (s/n).");
    }
  } while (continuar === "s");

  // Mostrar el resumen del carrito
  if (carrito.length > 0) {
    let total = carrito.reduce(
      (acc, item) => acc + item.precioUnitario * item.cantidad,
      0
    );

    alert(
      "Resumen Parcial del carrito de compras:\n\n" +
        carrito
          .map(
            (item) =>
              `Producto ${item.categoria} de ${item.nombre} - Cantidad: ${item.cantidad} - Precio Unitario: $${item.precioUnitario}`
          )
          .join("\n") +
        "\n\nTotal a pagar: $" +
        total.toFixed(2)
    );
  } else {
    alert("El carrito está vacío.");
  }
}

// Mostrar el resumen del carrito
function mostrarResumenCarrito() {
  if (carrito.length > 0) {
    let total = carrito.reduce(
      (acc, item) => acc + item.precioUnitario * item.cantidad,
      0
    );

    let carritoParcial = carrito
      .map(
        (item) =>
          `Producto ${item.categoria} ${item.nombre} - Cantidad: ${
            item.cantidad
          } - Precio Unitario: $${item.precioUnitario * item.cantidad}`
      )
      .join("\n");

    alert(
      "Resumen Parcial del carrito de compras:\n\n" +
        carritoParcial +
        "\n\nTotal a pagar: $" +
        total.toFixed(2)
    );
  } else {
    alert("El carrito está vacío.");
  }
}

// ------------------------------------
// Código Principal
// ------------------------------------
alert("🏦 Sistema de Ventas Amigurumi 🏦");

for (let i = 0; i < loginAttempts; i++) {
  let enteredPassword = prompt("🔑🔑 Ingrese su password 🔑🔑");

  if (parseInt(enteredPassword) === password) {
    loggedIn = true;
    alert("🖥️⌨ Bienvenido a Luani Amigurumis ⌨🖥️");
    break; // Sale del bucle si la contraseña es correcta
  } else {
    alert(
      "❗Ingresó incorrectamente su password, pruebe nuevamente. \nIntento: " +
        (i + 1)
    );
  }
}

if (loggedIn) {
  let option;

  do {
    option = prompt(
      "Seleccione el tipo de Amigurumi que desea comprar \n  a.- Sonajeros 💰\n  b.- Cuneros \n  c.- Nombres \n  d.- Peluches \n---------------\n  e.- Busqueda \n---------------\n  p.- Pagar \n---------------\n  x.- Salir 🚪"
    );

    switch (option) {
      case "a":
        compraSonajero();
        break;

      case "b":
        compraCunero();
        break;

      case "c":
        compraLetrasPorPalabra();
        break;

      case "d":
        compraPeluches();
        break;

      case "e":
        buscarProducto();
        break;

      case "p":
        pagarCarrito();
        break;

      case "x":
        if (confirmarSalirSinFinalizarCompra()) {
          alert("➡️➡️Sistema de Ventas Amigurumi");
          break;
        }
        // Si el usuario decide no salir, continúa con el bucle
        continue;

      default:
        alert("🛑❌ Opción no válida ❌🛑");
        break;
    }
  } while (option !== "x");
} else {
  alert(
    "Ha alcanzado el número máximo de intentos. \n🔒🔒Su cuenta ha sido bloqueada.🔒🔒"
  );
}

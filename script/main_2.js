let password = 1;
let loginAttempts = 4; // Número máximo de intentos
let loggedIn = false;
let carrito = []; // Definir el carrito

class Producto {
  constructor(id, nombre, precio, stock, img) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
    this.img = img;
  }
}

const listaProductos = [];
const listaProductosSonajero = [];
const listaProductosCunero = [];
const listaProductosLetras = [];
const listaProductosPeluche = [];

// Array de datos de productos
const productosData = [
  [1, "sonajero", 2500, 10, "imagen1.jpg"],
  [2, "cunero", 9500, 5, "imagen2.jpg"],
  [3, "letras", 1000, 20, "imagen3.jpg"],
  [4, "peluche", 2500, 8, "imagen4.jpg"],
];

// Crear productos usando un bucle
for (const data of productosData) {
  const [id, nombre, precio, stock, img] = data;
  listaProductos.push(new Producto(id, nombre, parseFloat(precio), stock, img));
}

console.log(listaProductos.length);

class Productos {
  constructor(id, nombre, categoria, precio, stock, img) {
    this.id = id;
    this.nombre = nombre;
    this.categoria = categoria;
    this.precio = precio;
    this.stock = stock;
    this.img = img;
  }
}

const productosSonajeros = [
  [1, "Perro", "animal", 2500, 10, "imagen1.jpg"],
  [2, "Zorro", "animal", 2500, 10, "imagen1.jpg"],
  [3, "Gallo", "animal", 2500, 10, "imagen1.jpg"],
  [4, "Vaca", "animal", 2500, 10, "imagen1.jpg"],
];

// Crear productos usando un bucle
for (const data of productosSonajeros) {
  const [id, nombre, categoria, precio, stock, img] = data;
  listaProductosSonajero.push(
    new Productos(id, nombre, categoria, parseFloat(precio), stock, img)
  );
}
console.log(listaProductosSonajero);

const productosCunero = [
  [1, "Estrellas y planetas", "universo", 2500, 10, "imagen1.jpg"],
  [2, "Estrellas", "universo", 2500, 10, "imagen1.jpg"],
  [3, "Animales de la Granja", "animal", 2500, 10, "imagen1.jpg"],
  [4, "Animales del mar", "animal", 2500, 10, "imagen1.jpg"],
  [5, "Dinosaurios", "dinosaurio", 2500, 10, "imagen1.jpg"],
];

// Crear productos usando un bucle
for (const data of productosCunero) {
  const [id, nombre, categoria, precio, stock, img] = data;
  listaProductosCunero.push(
    new Productos(id, nombre, categoria, parseFloat(precio), stock, img)
  );
}
console.log(listaProductosCunero);

const productosLetras = [
  [1, "Letra", "letra", 2500, 10, "imagen1.jpg"],
  [2, "Estrella", "universo", 2500, 10, "imagen1.jpg"],
  [3, "Esfera", "figura geometrica", 2500, 10, "imagen1.jpg"],
  [4, "borla", "general", 2500, 10, "imagen1.jpg"],
];

// Crear productos usando un bucle
for (const data of productosLetras) {
  const [id, nombre, categoria, precio, stock, img] = data;
  listaProductosLetras.push(
    new Productos(id, nombre, categoria, parseFloat(precio), stock, img)
  );
}
console.log(listaProductosLetras);

const productosPeluches = [
  [1, "Perro", "animal", 2500, 10, "imagen1.jpg"],
  [2, "Zorro", "animal", 2500, 10, "imagen1.jpg"],
  [3, "Jirafa", "animal", 2500, 10, "imagen1.jpg"],
  [4, "Elefante", "animal", 2500, 10, "imagen1.jpg"],
  [5, "T-Rex", "dinosaurio", 2500, 10, "imagen1.jpg"],
  [6, "Brontosaurio", "dinosaurio", 2500, 10, "imagen1.jpg"],
  [7, "Triceratop", "dinosaurio", 2500, 10, "imagen1.jpg"],
];

// Crear productos usando un bucle
for (const data of productosPeluches) {
  const [id, nombre, categoria, precio, stock, img] = data;
  listaProductosPeluche.push(
    new Productos(id, nombre, categoria, parseFloat(precio), stock, img)
  );
}
console.log(listaProductosPeluche);

function compraSonajero() {
  let continuar;

  do {
    let opcionesDisponibles = listaProductosSonajero
      .map((producto) => `${producto.id}. ${producto.nombre}`)
      .join("\n");
    let idProducto = parseInt(
      prompt(
        "Ingrese el ID del sonajero que desea comprar:\n" +
          opcionesDisponibles +
          "\n"
      )
    );

    // Buscar el producto en listaProductosSonajero
    let productoEncontrado = listaProductosSonajero.find(
      (producto) => producto.id === idProducto
    );

    if (productoEncontrado) {
      let cantidad = parseInt(
        prompt(`¿Cuántos Sonajeros ${productoEncontrado.nombre} desea comprar?`)
      );

      // Verificar si hay suficiente stock
      if (cantidad <= productoEncontrado.stock) {
        // Restar la cantidad comprada del stock
        productoEncontrado.stock -= cantidad;

        // Agregar el producto al carrito global
        carrito.push({
          id: productoEncontrado.id,
          nombre: productoEncontrado.nombre,
          precioUnitario: productoEncontrado.precio,
          cantidad: cantidad,
        });

        alert(
          `Se ha agregado la cantidad de ${cantidad} Sonajeros ${productoEncontrado.nombre} al carrito.`
        );
      } else {
        alert(
          `No hay suficiente stock disponible para ${productoEncontrado.nombre}.`
        );
      }
    } else {
      alert("El ID ingresado no corresponde a ningún sonajero.");
    }

    continuar = prompt(
      "¿Desea agregar más Productos Sonajeros al carrito? (s/n)"
    ).toLowerCase();
  } while (continuar === "s");

  // Mostrar el resumen del carrito
  if (carrito.length > 0) {
    let total = carrito.reduce(
      (acc, item) => acc + item.precioUnitario * item.cantidad,
      0
    );

    alert(
      "Resumen del carrito de compras:\n\n" +
        carrito
          .map(
            (item) =>
              `${item.nombre} - Cantidad: ${item.cantidad} - Precio Unitario: $${item.precioUnitario}`
          )
          .join("\n") +
        "\n\nTotal a pagar: $" +
        total.toFixed(2)
    );
  } else {
    alert("El carrito está vacío.");
  }
}

function compraCunero() {
  let continuar;

  do {
    let opcionesDisponibles = listaProductosSonajero
      .map((producto) => `${producto.id}. ${producto.nombre}`)
      .join("\n");
    let idProducto = parseInt(
      prompt(
        "Ingrese el ID del cunero que desea comprar:\n" +
          opcionesDisponibles +
          "\n"
      )
    );

    // Buscar el producto en listaProductosCunero por ID
    let productoEncontrado = listaProductosCunero.find(
      (producto) => producto.id === idProducto
    );

    if (productoEncontrado) {
      let cantidad = parseInt(
        prompt(`¿Cuántos Cuneros ${productoEncontrado.nombre} desea comprar?`)
      );

      // Verificar si hay suficiente stock
      if (cantidad <= productoEncontrado.stock) {
        // Restar la cantidad comprada del stock
        productoEncontrado.stock -= cantidad;

        // Agregar el producto al carrito global
        carrito.push({
          id: productoEncontrado.id,
          nombre: productoEncontrado.nombre,
          precioUnitario: productoEncontrado.precio,
          cantidad: cantidad,
        });

        alert(
          `Se ha agregado la cantidad de ${cantidad} Cuneros ${productoEncontrado.nombre} al carrito.`
        );
      } else {
        alert(
          `No hay suficiente stock disponible para ${productoEncontrado.nombre}.`
        );
      }
    } else {
      alert("El ID ingresado no corresponde a ningún cunero.");
    }

    continuar = prompt(
      "¿Desea agregar más Productos cuneros al carrito? (s/n)"
    ).toLowerCase();
  } while (continuar === "s");

  // Mostrar el resumen del carrito
  if (carrito.length > 0) {
    let total = carrito.reduce(
      (acc, item) => acc + item.precioUnitario * item.cantidad,
      0
    );

    alert(
      "Resumen del carrito de compras:\n\n" +
        carrito
          .map(
            (item) =>
              `${item.nombre} - Cantidad: ${item.cantidad} - Precio Unitario: $${item.precioUnitario}`
          )
          .join("\n") +
        "\n\nTotal a pagar: $" +
        total.toFixed(2)
    );
  } else {
    alert("El carrito está vacío.");
  }
}

function compraPeluches() {
  let continuar;

  do {
    let opcionesDisponibles = listaProductosSonajero
      .map((producto) => `${producto.id}. ${producto.nombre}`)
      .join("\n");
    let idProducto = parseInt(
      prompt(
        "Ingrese el ID del Peluche que desea comprar:\n" +
          opcionesDisponibles +
          "\n"
      )
    );

    // Buscar el producto en listaProductosPeluche por ID
    let productoEncontrado = listaProductosPeluche.find(
      (producto) => producto.id === idProducto
    );

    if (productoEncontrado) {
      let cantidad = parseInt(
        prompt(`¿Cuántos Peluches ${productoEncontrado.nombre} desea comprar?`)
      );

      // Verificar si hay suficiente stock
      if (cantidad <= productoEncontrado.stock) {
        // Restar la cantidad comprada del stock
        productoEncontrado.stock -= cantidad;

        // Agregar el producto al carrito global
        carrito.push({
          id: productoEncontrado.id,
          nombre: productoEncontrado.nombre,
          precioUnitario: productoEncontrado.precio,
          cantidad: cantidad,
        });

        alert(
          `Se ha agregado la cantidad de ${cantidad} Peluches${productoEncontrado.nombre} al carrito.`
        );
      } else {
        alert(
          `No hay suficiente stock disponible para ${productoEncontrado.nombre}.`
        );
      }
    } else {
      alert("El ID ingresado no corresponde a ningún peluche.");
    }

    continuar = prompt(
      "¿Desea agregar más Productos peluches al carrito? (s/n)"
    ).toLowerCase();
  } while (continuar === "s");

  // Mostrar el resumen del carrito
  if (carrito.length > 0) {
    let total = carrito.reduce(
      (acc, item) => acc + item.precioUnitario * item.cantidad,
      0
    );

    alert(
      "Resumen del carrito de compras:\n\n" +
        carrito
          .map(
            (item) =>
              `${item.nombre} - Cantidad: ${item.cantidad} - Precio Unitario: $${item.precioUnitario}`
          )
          .join("\n") +
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
    alert("🖥️⌨ Bienvenido a Luani ⌨🖥️");
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
      "Seleccione el tipo de producto que desea comprar \n  a.- Sonajeros 💰\n  b.- Cuneros \n  c.- Letras \n  d.- Peluches \n  e.- Busqueda \n  p.- Pagar \n  x.- Salir 🚪"
    );

    switch (option) {
      case "a":
        compraSonajero();
        break;

      case "b":
        compraCunero();
        break;

      case "c":
        compraLetras();
        break;

      case "d":
        compraPeluches();
        break;
      case "e":
        buscarProducto();
        break;
      case "x":
        alert("➡️➡️Saliendo del Simulador Financiero");
        break;

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

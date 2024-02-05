let password = 1982;
let loginAttempts = 4; // Número máximo de intentos
let loggedIn = false;
const cotizacionDolarCompra = 850;
const cotizacionDolarVenta = 830;
const cotizacionEuroCompra = 930;
const cotizacionEuroVenta = 900;

function validarEntradasPrestamo(montoPrestamo, plazoMeses) {
  if (
    isNaN(montoPrestamo) ||
    isNaN(plazoMeses) ||
    montoPrestamo <= 0 ||
    plazoMeses <= 0
  ) {
    alert("Por favor, ingrese valores válidos y positivos.");
    return false;
  }
  return true;
}

function calcularTasaInteresAnual(plazoMeses) {
  if (plazoMeses >= 1 && plazoMeses <= 6) {
    return 30;
  } else if (plazoMeses >= 7 && plazoMeses <= 12) {
    return 50;
  } else if (plazoMeses >= 13 && plazoMeses <= 18) {
    return 65;
  } else if (plazoMeses >= 19 && plazoMeses <= 24) {
    return 80;
  } else {
    return 100;
  }
}

function mostrarPorcentajesInteres() {
  alert(
    "Porcentajes de interés según el plazo:\n" +
      "1-6 meses: 30%\n" +
      "7-12 meses: 50%\n" +
      "13-18 meses: 65%\n" +
      "19-24 meses: 80%\n" +
      "Más de 25 meses: 100%"
  );
}

function simuladorPrestamo() {
  let montoPrestamo, plazoMeses;

  mostrarPorcentajesInteres(); // Mostrar porcentajes antes de solicitar datos

  do {
    montoPrestamo = parseFloat(prompt("Ingrese el monto del préstamo:"));
    plazoMeses = parseInt(prompt("Ingrese el plazo del préstamo en meses:"));
  } while (!validarEntradasPrestamo(montoPrestamo, plazoMeses));

  // Calcular la tasa de interés anual según los rangos establecidos
  let tasaInteresAnual = calcularTasaInteresAnual(plazoMeses);

  // Calcular la cuota mensual
  let tasaInteresMensual = tasaInteresAnual / 100 / 12;
  let cuotas = "";

  for (let i = 1; i <= plazoMeses; i++) {
    let cuotaMensual =
      (montoPrestamo * tasaInteresMensual) /
      (1 - Math.pow(1 + tasaInteresMensual, -plazoMeses));

    cuotas += `Mes: ${i}, Cuota Mensual (ARS): ${cuotaMensual.toFixed(2)}\n`;
  }

  alert("Detalles del préstamo por mes:\n" + cuotas);
}

function cotizarDolar(pesos, compra = true) {
  return compra ? pesos / cotizacionDolarCompra : pesos * cotizacionDolarVenta;
}

function cotizarEuro(pesos, compra = true) {
  return compra ? pesos / cotizacionEuroCompra : pesos * cotizacionEuroVenta;
}

function validarCantidad(cantidad) {
  if (isNaN(cantidad) || cantidad <= 0) {
    alert("Por favor, ingrese valores válidos y positivos.");
    return false;
  }
  return true;
}

function simuladorDolares() {
  let opcion = prompt(
    "Seleccione la operación que desea realizar:\n" +
      "a.- Compra de dólares 📥💵\n" +
      "b.- Venta de dólares 📤💵\n\n" +
      "Cotizaciones del día:\n" +
      "Compra: $" +
      cotizacionDolarCompra +
      "\nVenta: $" +
      cotizacionDolarVenta
  );

  let cantidadCompraDolar;
  let cantidadVtaDolar;
  if (opcion === "a") {
    do {
      cantidadCompraDolar = prompt(
        "Ingrese en pesos la cantidad de dolares a comprar:"
      );
    } while (
      !validarCantidad(cantidadCompraDolar) ||
      isNaN(parseFloat(cantidadCompraDolar))
    );

    alert(
      "Con $ " +
        cantidadCompraDolar +
        " pesos puede comprar: U$S" +
        cotizarDolar(parseFloat(cantidadCompraDolar)).toFixed(2) +
        " (dólares)"
    );
  } else if (opcion === "b") {
    do {
      cantidadVtaDolar = prompt("Ingrese la cantidad a vender:");
    } while (
      !validarCantidad(cantidadVtaDolar) ||
      isNaN(parseFloat(cantidadVtaDolar))
    );

    alert(
      "Vendiendo U$S " +
        cantidadVtaDolar +
        " dólares puede obtener: $" +
        cotizarDolar(cantidadVtaDolar, false).toFixed(2) +
        " (pesos)"
    );
  } else {
    alert("Opción no válida");
  }
}

function simuladorEuros() {
  let opcion = prompt(
    "Seleccione la operación que desea realizar:\n" +
      "a.- Compra de Euros 📥💶\n" +
      "b.- Venta de Euros 📤💶\n\n" +
      "Cotizaciones del día:\n" +
      "Compra: $" +
      cotizacionEuroCompra +
      "\nVenta: $" +
      cotizacionEuroVenta
  );

  if (opcion === "a") {
    let cantidadCompraEuro = parseFloat(
      prompt("Ingrese en pesos la cantidad de Euros a comprar:")
    );
    alert(
      "Con $ " +
        cantidadCompraEuro +
        " pesos puede comprar: €" +
        cotizarDolar(cantidadCompraEuro).toFixed(2) +
        " (euros)"
    );
  } else if (opcion === "b") {
    let cantidadVtaEuro = parseFloat(prompt("Ingrese la cantidad a vender:"));
    alert(
      "Vendiendo € " +
        cantidadVtaEuro +
        " euros puede obtener: $" +
        cotizarDolar(cantidadVtaEuro, false).toFixed(2) +
        " (pesos)"
    );
  } else {
    alert("Opción no válida");
  }
}

// ------------------------------------
// Código Principal
// ------------------------------------
alert("🏦 Simulador Financiero 🏦");

for (let i = 0; i < loginAttempts; i++) {
  let enteredPassword = prompt("🔑🔑 Ingrese su password 🔑🔑");

  if (parseInt(enteredPassword) === password) {
    loggedIn = true;
    alert("🖥️⌨ Bienvenido al Simulador Financiero ⌨🖥️");
    break; // Sale del bucle si la contraseña es correcta
  } else {
    alert(
      "Ingresó incorrectamente su password, pruebe nuevamente. \nIntento: " +
        (i + 1)
    );
  }
}

if (loggedIn) {
  let option;

  do {
    option = prompt(
      "Seleccione el tipo de operación que desea realizar \n   a.- Simulador Prestamo personal 💰\n   b.- Simulador Compra/Venta U$D (Dolar) 💵 \n   c.- Simulador Compra/Venta € (Euros) 💶 \n   d.- Salir 🚪"
    );

    switch (option) {
      case "a":
        simuladorPrestamo();
        break;

      case "b":
        simuladorDolares();
        break;

      case "c":
        simuladorEuros();
        break;

      case "d":
        alert("➡️➡️Saliendo del Simulador Financiero");
        break;

      default:
        alert("Opción no válida");
        break;
    }
  } while (option !== "d");
} else {
  alert(
    "Ha alcanzado el número máximo de intentos. \n🔒🔒Su cuenta ha sido bloqueada.🔒🔒"
  );
}

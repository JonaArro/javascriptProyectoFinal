let password = 1982;
let loginAttempts = 4; // Número máximo de intentos
let loggedIn = false;
const cotizacionDolarCompra = 848;
const cotizacionDolarVenta = 808;
const cotizacionEuroCompra = 941;
const cotizacionEuroVenta = 881;

function validarEntradasPrestamo(montoPrestamo, plazoMeses) {
  if (
    isNaN(montoPrestamo) ||
    isNaN(plazoMeses) ||
    montoPrestamo <= 0 ||
    plazoMeses <= 0
  ) {
    alert("❗Por favor, ingrese valores válidos y positivos.❗");
    return false;
  }
  return true;
}

function calcularTasaInteresAnual(plazoMeses) {
  // Tasa tomadas de ejemplo del BBVA
  if (plazoMeses >= 1 && plazoMeses <= 6) {
    return 286.13; // TEA para 6 meses
  } else if (plazoMeses >= 7 && plazoMeses <= 12) {
    return 293.09; // TEA para 12 meses
  } else if (plazoMeses >= 13 && plazoMeses <= 18) {
    return 296.61; // TEA para 18 meses
  } else if (plazoMeses >= 19 && plazoMeses <= 24) {
    return 296.61; // TEA para 24 meses
  } else {
    return 298.8; // TEA para más de 24 meses
  }
}

function mostrarPorcentajesInteres() {
  alert(
    "Porcentajes de interés según el plazo:\n" +
      "1-6 meses: 286.13% (TEA)\n" +
      "7-12 meses: 293.09% (TEA)\n" +
      "13-18 meses: 296.61% (TEA)\n" +
      "19-24 meses: 296.61% (TEA)\n" +
      "Más de 25 meses: 298.80% (TEA)"
  );
}

function simuladorPrestamo() {
  let montoPrestamo, plazoMeses;

  mostrarPorcentajesInteres(); // Mostrar porcentajes antes de solicitar datos

  do {
    montoPrestamo = parseFloat(prompt("💲Ingrese el monto del préstamo:"));
    plazoMeses = parseInt(prompt("🗓️Ingrese el plazo del préstamo en meses:"));
  } while (!validarEntradasPrestamo(montoPrestamo, plazoMeses));

  // Calcular la tasa de interés anual según los rangos establecidos
  let tasaInteresAnual = calcularTasaInteresAnual(plazoMeses);

  // Calcular la cuota mensual
  let tasaInteresMensual = tasaInteresAnual / 100 / 12;
  let cuotas = "";

  for (let i = 1; i <= plazoMeses; i++) {
    // Fórmula de amortización de préstamos con interés compuesto
    let cuotaMensual =
      (montoPrestamo * tasaInteresMensual) /
      (1 - Math.pow(1 + tasaInteresMensual, -plazoMeses));

    cuotas += `Mes: ${i}, Cuota Mensual ($): ${cuotaMensual.toFixed(2)}\n`;
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
  if (isNaN(cantidad) || cantidad <= 9) {
    alert("❗Por favor, ingrese valores válidos y positivos mayores a 9.❗");
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

  if (opcion === "a") {
    do {
      cantidadCompraDolar = parseFloat(
        prompt("💲Ingrese en pesos la cantidad de dólares a comprar:")
      );
    } while (
      !validarCantidad(cantidadCompraDolar) ||
      isNaN(parseFloat(cantidadCompraDolar))
    );

    alert(
      "Con $ " +
        cantidadCompraDolar +
        " pesos puede comprar: U$D" +
        cotizarDolar(parseFloat(cantidadCompraDolar)).toFixed(2) +
        " (dólares)"
    );
  } else if (opcion === "b") {
    do {
      cantidadVtaDolar = prompt("Ingrese la cantidad de dólares a vender:");
    } while (
      !validarCantidad(cantidadVtaDolar) ||
      isNaN(parseFloat(cantidadVtaDolar))
    );

    alert(
      "Vendiendo U$D " +
        cantidadVtaDolar +
        " dólares puede obtener: $" +
        cotizarDolar(cantidadVtaDolar, false).toFixed(2) +
        " (pesos)"
    );
  } else {
    alert("🛑❌ Opción no válida ❌🛑");
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
    do {
      cantidadCompraEuro = parseFloat(
        prompt("💲Ingrese en pesos la cantidad de Euros a comprar:")
      );
    } while (
      !validarCantidad(cantidadCompraEuro) ||
      isNaN(parseFloat(cantidadCompraEuro))
    );

    alert(
      "Con $ " +
        cantidadCompraEuro +
        " pesos puede comprar: €" +
        cotizarDolar(cantidadCompraEuro).toFixed(2) +
        " (euros)"
    );
  } else if (opcion === "b") {
    do {
      cantidadVtaEuro = parseFloat(
        prompt("Ingrese la cantidad de Euros a vender:")
      );
    } while (
      !validarCantidad(cantidadVtaEuro) ||
      isNaN(parseFloat(cantidadVtaEuro))
    );

    alert(
      "Vendiendo € " +
        cantidadVtaEuro +
        " euros puede obtener: $" +
        cotizarDolar(cantidadVtaEuro, false).toFixed(2) +
        " (pesos)"
    );
  } else {
    alert("🛑❌ Opción no válida ❌🛑");
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
      "❗Ingresó incorrectamente su password, pruebe nuevamente. \nIntento: " +
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
        alert("🛑❌ Opción no válida ❌🛑");
        break;
    }
  } while (option !== "d");
} else {
  alert(
    "Ha alcanzado el número máximo de intentos. \n🔒🔒Su cuenta ha sido bloqueada.🔒🔒"
  );
}

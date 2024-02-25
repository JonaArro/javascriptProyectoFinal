let password = 1;
let loginAttempts = 4; // Número máximo de intentos
let loggedIn = false;
class Cotizacion {
  constructor(cotizacionCompra, cotizacionVenta) {
    this.cotizacionCompra = cotizacionCompra;
    this.cotizacionVenta = cotizacionVenta;
  }
}
// Array para almacenar las cotizaciones del dólar
let cotizacionesDolar = [];

// Cotización default
const cotizacionDolarHoy = new Cotizacion(848, 808);

// Agrego cotización default al array
cotizacionesDolar.push(cotizacionDolarHoy);

const cotizacionEuroHoy = new Cotizacion(941, 881);

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
  let ultimaCotizacion = cotizacionesDolar[cotizacionesDolar.length - 1]; // Última cotización almacenada
  return compra
    ? pesos / ultimaCotizacion.cotizacionCompra
    : pesos * ultimaCotizacion.cotizacionVenta;
}

function cotizarEuro(pesos, compra = true) {
  return compra
    ? pesos / cotizacionEuroHoy.cotizacionCompra
    : pesos * cotizacionEuroHoy.cotizacionVenta;
}

function validarCantidad(cantidad) {
  if (isNaN(cantidad) || cantidad <= 9) {
    alert("❗Por favor, ingrese valores válidos y positivos mayores a 9.❗");
    return false;
  }
  return true;
}

function simuladorDolares() {
  function mostrarOpciones() {
    let cotizacionActual = cotizacionesDolar[cotizacionesDolar.length - 1];
    return prompt(
      "Seleccione la operación que desea realizar:\n" +
        "a.- Compra de dólares 📥💵\n" +
        "b.- Venta de dólares 📤💵\n" +
        "c.- Carga manualmente su cotización y simule\n" +
        "r.- Resetear cotizaciones a los valores del día\n\n" +
        "Cotizaciones actuales :\n" +
        "Compra: $" +
        cotizacionActual.cotizacionCompra +
        "\nVenta: $" +
        cotizacionActual.cotizacionVenta
    );
  }

  if (cotizacionesDolar.length === 0) {
    // Si no hay cotizaciones almacenadas, mostrar un mensaje y salir de la función
    alert(
      "No hay cotizaciones disponibles. Por favor, cargue una cotización antes de continuar."
    );
    return;
  }

  // Crear la cadena de texto para las cotizaciones cargadas manualmente
  let cotizacionesManuales = "Cotizaciones cargadas manualmente:\n";
  for (let cotizacion of cotizacionesDolar.slice(1)) {
    cotizacionesManuales +=
      "Compra: $" +
      cotizacion.cotizacionCompra +
      "\n" +
      "Venta: $" +
      cotizacion.cotizacionVenta +
      "\n";
  }

  let opcion = mostrarOpciones();

  if (opcion === "a") {
    // Opción para comprar dólares
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
    // Opción para vender dólares
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
  } else if (opcion === "c") {
    // Opción para cargar manualmente la cotización del dólar
    let nuevaCotizacionCompra = parseFloat(
      prompt("Ingrese la nueva cotización de compra del dólar:")
    );
    let nuevaCotizacionVenta = parseFloat(
      prompt("Ingrese la nueva cotización de venta del dólar:")
    );

    if (!isNaN(nuevaCotizacionCompra) && !isNaN(nuevaCotizacionVenta)) {
      let nuevaCotizacion = new Cotizacion(
        nuevaCotizacionCompra,
        nuevaCotizacionVenta
      );
      cotizacionesDolar.push(nuevaCotizacion); // Agregar nueva cotización al array
      alert("Cotizaciones actualizadas correctamente.");
      // Después de actualizar las cotizaciones, llamar nuevamente a simuladorDolares
      simuladorDolares();
    } else {
      alert(
        "Error al ingresar las cotizaciones. Por favor, ingrese valores numéricos válidos."
      );
    }
  } else if (opcion === "r") {
    // Opción para resetear las cotizaciones a los valores por defecto
    cotizacionesDolar = []; // Vaciar el array de cotizaciones
    cotizacionesDolar.push(cotizacionDolarHoy); // Agregar la cotización por defecto
    alert("Cotizaciones reseteadas a los valores por defecto.");
    // Después de resetear las cotizaciones, llamar nuevamente a simuladorDolares
    simuladorDolares();
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
      cotizacionEuroHoy.cotizacionCompra +
      "\nVenta: $" +
      cotizacionEuroHoy.cotizacionVenta
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

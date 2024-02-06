# Simulador Financiero

Simulador financiero interactivo que permite realizar operaciones como simulaciones de préstamos personales, compra/venta de dólares y euros.

## Índice

1. [Configuración inicial](#configuración-inicial)
2. [Funciones Principales](#funciones-principales)
   - [calcularTasaInteresAnual(plazoMeses)](#calculartasadeinteresanualplazomeses)
   - [mostrarPorcentajesInteres()](#mostrarporcentajesinteres)
   - [simuladorPrestamo()](#simuladorprestamo)
   - [cotizarDolar(pesos, compra = true)](#cotizardolarpesos-compra--true)
   - [cotizarEuro(pesos, compra = true)](#cotizareuropesos-compra--true)
   - [simuladorDolares()](#simuladordolares)
   - [simuladorEuros()](#simuladoreuros)
3. [Código Principal](#código-principal)
4. [Instrucciones de Uso](#instrucciones-de-uso)

## Configuración inicial

- `password`: Contraseña requerida para acceder al simulador.
- `loginAttempts`: Número máximo de intentos para ingresar la contraseña.
- Cotizaciones del día:
  - `cotizacionDolarCompra`: Cotización de compra del dólar.
  - `cotizacionDolarVenta`: Cotización de venta del dólar.
  - `cotizacionEuroCompra`: Cotización de compra del euro.
  - `cotizacionEuroVenta`: Cotización de venta del euro.

## Funciones Principales

### `calcularTasaInteresAnual(plazoMeses)`

Esta función calcula la tasa de interés anual (TEA) según el plazo en meses.

### `mostrarPorcentajesInteres()`

Muestra porcentajes de interés según el plazo en meses.

### `simuladorPrestamo()`

Permite simular un préstamo personal ingresando el monto y el plazo en meses.

### `cotizarDolar(pesos, compra = true)`

Cotiza la cantidad de dólares que se pueden comprar o vender según la cotización del día.

### `cotizarEuro(pesos, compra = true)`

Cotiza la cantidad de euros que se pueden comprar o vender según la cotización del día.

### `simuladorDolares()`

Permite simular la compra o venta de dólares.

### `simuladorEuros()`

Permite simular la compra o venta de euros.

## Código Principal

- Solicita la contraseña al usuario con un límite de intentos.
- Una vez autenticado, presenta un menú interactivo para elegir entre diferentes simulaciones.
- Permite al usuario realizar simulaciones según sus elecciones.

## Instrucciones de Uso

1. Ejecutar el programa.
2. Ingresar la contraseña cuando se solicite.
3. Seleccionar la operación deseada según el menú interactivo.

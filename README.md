# Sistema de Ventas de Amigurumis

Este es un sistema de ventas de amigurumis que permite a los usuarios comprar diversos tipos de productos, como sonajeros, cuneros, letras para formar palabras y peluches. Los usuarios pueden agregar productos al carrito, ver el resumen del carrito, buscar productos por nombre y finalmente pagar por los productos seleccionados.

## Requisitos previos

Este sistema requiere tener un navegador web compatible con JavaScript habilitado.

## Instrucciones de Uso

### Inicio de Sesión:

- Para acceder al sistema, se solicitará una contraseña.
- La contraseña predeterminada es 1982.
- Si se ingresa incorrectamente tres veces, se bloqueará la cuenta.

### Selección de Productos:

- Se presenta un menú con las siguientes opciones:
  - a. Comprar Sonajeros
  - b. Comprar Cuneros
  - c. Comprar Nombres (Letras)
  - d. Comprar Peluches
  - e. Búsqueda de Productos por Nombre
  - p. Pagar Carrito
  - x. Salir del Sistema

### Compra de Productos:

- Los usuarios pueden seleccionar productos de cada categoría ingresando el ID del producto deseado.
- Se debe ingresar la cantidad deseada de cada producto.
- Se muestra un resumen parcial del carrito después de agregar cada producto.

### Búsqueda de Productos:

- Los usuarios pueden buscar productos por nombre.
- Se mostrarán los productos cuyos nombres contengan la cadena de búsqueda.

### Pagar Carrito:

- Se muestra un resumen completo del carrito de compras.
- Se calcula el total a pagar, incluido el IVA (21%).
- Se solicita confirmación antes de finalizar la compra.
- Después de pagar, el carrito se vacía.

### Salir del Sistema:

- Se puede salir del sistema en cualquier momento seleccionando la opción 'x'.
- Si hay productos en el carrito sin pagar, se solicitará confirmación antes de salir.

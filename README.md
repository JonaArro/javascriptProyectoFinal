# Sistema de Ventas de Amigurumis

Este es un sistema de ventas de amigurumis que permite a los usuarios comprar diversos tipos de productos, como sonajeros, cuneros y peluches. Los usuarios pueden agregar productos al carrito, ver el resumen del carrito, buscar productos por nombre.

## Características

- Registro de usuarios con validación de correo electrónico único.
- Inicio de sesión de usuarios con bloqueo de cuenta después de un número máximo de intentos fallidos.
- Búsqueda de productos por nombre.
- Visualización de resultados de búsqueda con opción de agregar productos al carrito.
- Carrito de compras persistente utilizando `sessionStorage`.
- Confirmación de compra con cálculo del total a pagar.
- Integración con Bootstrap y SweetAlert2 para una mejor experiencia de usuario.
- Capacidad de cargar usuarios desde un archivo JSON o desde el almacenamiento local (previo registro).

## Archivos Principales

- `index.html`: Página principal de la aplicación.
- `login.html`: Página de inicio de sesión que permite a los usuarios iniciar sesión en sus cuentas registradas. Incluye campos para ingresar correo electrónico y contraseña, así como opciones para recordar la información de inicio de sesión y enlaces para registro y recuperación de contraseña.
- `register.html`: Página de registro que permite a los nuevos usuarios crear una cuenta en la tienda. Incluye campos para ingresar nombre, correo electrónico y contraseña, así como un botón para enviar el formulario de registro.
- `products.html`: Página que muestra la lista de productos disponibles en la tienda. Cada producto incluye su nombre, categoría, precio y una opción para agregarlo al carrito. Esta página también permite la búsqueda de productos.
- `script.js`: Contiene la lógica del carrito de compras, manejo del `sessionStorage`, y funciones relacionadas con la manipulación del DOM.
- `register.js`: Maneja el registro de usuarios y la validación de datos de entrada.
- `login.js`: Gestiona el inicio de sesión de usuarios y el bloqueo de cuentas.
- `carrito.js`: Funciones para limpiar el carrito, calcular el total de la compra y mostrar el contenido del carrito.
- `buscar.js`: Implementa la funcionalidad de búsqueda de productos y la visualización de resultados.

## Requisitos del Sistema

- Navegador web moderno compatible con HTML5, CSS3 y JavaScript.
- Conexión a Internet para acceder a los recursos externos.

## Cómo Ejecutar la Aplicación

1. Clona o descarga el repositorio en tu máquina local.
2. Abre el archivo `index.html` en tu navegador web.

## Contribuciones

¡Las contribuciones son bienvenidas! Si deseas mejorar esta aplicación, no duden en enviar un mail a arroyo.jonatan@gmail.com.

## Autores

- Arroyo Jonatan Damian

## Colaboración

- Arroyo Juan Ignacio (Dibujo)
- Arroyo Luca Gabriel (Test)
- Aguirre Gisele Romina (Maneger del proyecto)

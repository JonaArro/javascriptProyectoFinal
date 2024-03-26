// Función para cargar los usuarios del JSON
async function loadUsers() {
  try {
    const response = await fetch("../data/usuarios.json");
    const users = await response.json();
    return users;
  } catch (error) {
    console.error("Error loading users:", error);
    return [];
  }
}

// Función para inicializar la sesión después de cargar los usuarios
async function initializeSession() {
  try {
    const jsonUsers = await loadUsers();
    formGetInto.addEventListener("submit", handleSubmit.bind(null, jsonUsers));
  } catch (error) {
    console.error("Error initializing session:", error);
  }
}

// Llamamos a la función para inicializar la sesión
initializeSession();

const formGetInto = document.querySelector("#getIntoForm"),
  mailInput = document.querySelector("#inputEmail"),
  passInput = document.querySelector("#inputPass");

let attempts = 0;
const maxAttempts = 4; // Define el número máximo de intentos permitidos
let formSubmitted = false; // Variable para controlar si el formulario ha sido enviado

// Seleccionar el checkbox "Recuérdame"
const rememberCheckbox = document.querySelector("#exampleCheck1");

// Función para manejar el evento submit del formulario
function handleSubmit(jsonUsers, event) {
  event.preventDefault();

  // Verificar si el formulario ya se ha enviado
  if (formSubmitted) {
    return; // Salir de la función si ya se ha enviado el formulario
  }

  // Marcar el formulario como enviado
  formSubmitted = true;

  const email = mailInput.value;
  const password = passInput.value;

  if (!email || !password) {
    alert("Por favor, complete todos los campos.");
    formSubmitted = false; // Restablecer el estado del formulario
    return;
  }

  // Llamar a la función initSession para iniciar sesión
  initSession(jsonUsers, email, password);
}

function initSession(jsonUsers, email, password) {
  // Verifica si ya se ha excedido el límite de intentos
  if (attempts >= maxAttempts) {
    Swal.fire({
      position: "justify",
      icon: "error",
      title:
        "Has excedido el número de intentos permitidos. Tu cuenta ha sido bloqueada, por favor comuníquese con el Administrador",
      showConfirmButton: true,
    });
    formSubmitted = false; // Restablecer el estado del formulario
    return; // Detiene la ejecución de la función
  }

  let userFoundJson = jsonUsers.find((user) => {
    return user.mail === email && user.pass.toString() === password; // Convertir el password del JSON a cadena antes de comparar
  });

  let userFoundLS = usersLS.find((user) => {
    return user.mail === email && user.pass.toString() === password; // Convertir el password del JSON a cadena antes de comparar
  });

  if (userFoundJson || userFoundLS) {
    if (
      (userFoundJson && userFoundJson.status !== "blocked") ||
      (userFoundLS && userFoundLS.status !== "blocked")
    ) {
      Swal.fire({
        position: "center",
        icon: "success",
        title:
          "¡Bienvenido, " +
          (userFoundJson ? userFoundJson.name : userFoundLS.name) +
          "!",
        showConfirmButton: false,
        timer: 2000, // El mensaje de bienvenida se mostrará por 2 segundos
      }).then(() => {
        location.href = "../pages/products.html";
      });
    } else {
      alert("Tu cuenta está bloqueada. Por favor, contacta al administrador.");
    }
  } else {
    attempts++; // Incrementa el contador de intentos solo si el usuario no fue encontrado
    Swal.fire({
      position: "justify",
      icon: "warning",
      title:
        "Correo electrónico o contraseña incorrectos. Intento " +
        attempts +
        " de " +
        maxAttempts +
        ".",
      showConfirmButton: true,
    });
    formSubmitted = false; // Restablecer el estado del formulario
  }
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function recoverLs() {
  return JSON.parse(localStorage.getItem("users"));
}

const usersLS = recoverLs();

// Función para restablecer el estado del formulario después de la ejecución del evento
function resetFormState() {
  formSubmitted = false; // Restablecer el estado del formulario
}

// Agregar el event listener para el evento submit del formulario
formGetInto.addEventListener("submit", resetFormState);

rememberCheckbox.addEventListener("click", function () {
  // Obtener los valores del correo electrónico y la contraseña
  const email = mailInput.value;
  const password = passInput.value;

  // Verificar si el checkbox está marcado
  if (this.checked) {
    // Guardar los valores en el localStorage
    localStorage.setItem("rememberedEmail", email);
    localStorage.setItem("rememberedPassword", password);
  } else {
    // Si el checkbox no está marcado, eliminar los valores del localStorage
    localStorage.removeItem("rememberedEmail");
    localStorage.removeItem("rememberedPassword");
  }
});

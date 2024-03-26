// Función para cargar los usuarios del JSON
async function loadUsers() {
  try {
    const response = await fetch("../data/usuarios.json");
    const users = await response.json();
    console.log("Usuarios cargados exitosamente:", users);
    return users;
  } catch (error) {
    console.error("Error cargando usuarios:", error);
    return null;
  }
}

// Función para inicializar la sesión después de cargar los usuarios
async function initializeSession() {
  try {
    const jsonUsers = await loadUsers();
    if (jsonUsers !== null) {
      formGetInto.addEventListener(
        "submit",
        handleSubmit.bind(null, jsonUsers)
      );
    } else {
      console.error("No se pudieron cargar los usuarios.");
    }
  } catch (error) {
    console.error("Error inicializando sesión:", error);
  }
}

// Inicio de sesión
initializeSession();

const formGetInto = document.querySelector("#getIntoForm"),
  mailInput = document.querySelector("#inputEmail"),
  passInput = document.querySelector("#inputPass");

let attempts = 0;
const maxAttempts = 4;
let formSubmitted = false;

const rememberCheckbox = document.querySelector("#exampleCheck1");

// Función para manejar el evento submit del formulario
function handleSubmit(jsonUsers, event) {
  event.preventDefault();

  // Verificar si el formulario ya se ha enviado
  if (formSubmitted) {
    return;
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

  initSession(jsonUsers, email, password);
}

function initSession(jsonUsers, email, password) {
  // Valido si jsonUsers es null o undefined antes de continuar
  if (!jsonUsers) {
    console.error("Los usuarios no se han cargado correctamente.");
    return;
  }

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
    attempts = 0; // Restablecer el contador de intentos
    return; // Detiene la ejecución de la función
  }

  let userFoundJson = jsonUsers.find((user) => {
    return user.mail === email && user.pass.toString() === password; // Convertir el password del JSON a string antes de comparar
  });

  let userFoundLS = usersLS.find((user) => {
    return user.mail === email && user.pass.toString() === password; // Convertir el password del JSON a string antes de comparar
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
        timer: 2000,
      }).then(() => {
        location.href = "../pages/products.html";
      });
    } else {
      alert("Tu cuenta está bloqueada. Por favor, contacta al administrador.");
    }
  } else {
    attempts++; // Incrementa el contador de intentos solo si el usuario no fue encontrado o está bloqueado
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
  formSubmitted = false;
}

// Agregar el event listener para el evento submit del formulario
formGetInto.addEventListener("submit", resetFormState);

rememberCheckbox.addEventListener("click", function () {
  const email = mailInput.value;
  const password = passInput.value;

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

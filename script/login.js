// Función para cargar los usuarios del JSON
async function loadUsers() {
  try {
    // Verificar si ya hay usuarios en el localStorage
    const usersFromLocalStorage = JSON.parse(localStorage.getItem("users"));
    if (usersFromLocalStorage && usersFromLocalStorage.length > 0) {
      console.log(
        "Usuarios cargados desde el localStorage:",
        usersFromLocalStorage
      );
      return usersFromLocalStorage; // Retorna los usuarios del localStorage si ya están cargados
    }

    // Si no hay usuarios en el localStorage, cargar desde el JSON y guardar en el localStorage
    const response = await fetch("../data/usuarios.json");
    const users = await response.json();
    console.log("Usuarios cargados exitosamente desde el JSON:", users);
    localStorage.setItem("users", JSON.stringify(users)); // Guardar los usuarios en el localStorage
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
    if (jsonUsers !== null && jsonUsers.length > 0) {
      formGetInto.addEventListener(
        "submit",
        handleSubmit.bind(null, jsonUsers)
      );
    } else {
      console.error(
        "No se pudieron cargar los usuarios o el arreglo está vacío."
      );
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
  // Valida si jsonUsers es null o undefined antes de continuar
  if (!jsonUsers || jsonUsers.length === 0) {
    console.error(
      "Los usuarios no se han cargado correctamente o están vacíos."
    );
    return;
  }

  // Valida si usersLS está definido y no es null antes de continuar
  if (!usersLS || usersLS.length === 0) {
    console.error(
      "Los usuarios del localStorage no se han cargado correctamente o están vacíos."
    );
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

  // Aquí podemos utilizar jsonUsers y usersLS para buscar el usuario
  let userFoundJson = jsonUsers.find((user) => {
    return user.mail === email && user.pass.toString() === password;
  });

  let userFoundLS = usersLS.find((user) => {
    return user.mail === email && user.pass.toString() === password;
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

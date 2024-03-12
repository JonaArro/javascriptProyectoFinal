const formGetInto = document.querySelector("#getIntoForm"),
  mailInput = document.querySelector("#inputEmail"),
  passInput = document.querySelector("#inputPass");

let attempts = 0;

function initSession(users, email, password) {
  let userFound = users.find((user) => {
    return user.mail === email && user.pass === password;
  });
  ////AGREGAR LOGICA DE USUARIO NO ENCONTRADO
  if (userFound) {
    if (userFound.status !== "blocked") {
      /*       alert("Usuario encontrado"); */
      location.href = "./products.html";
    } else {
      alert("Tu cuenta está bloqueada. Por favor, contacta al administrador.");
    }
  } else {
    attempts++;
    if (attempts >= 4) {
      Swal.fire({
        position: "justify",
        icon: "error",
        title:
          "Has excedido el número de intentos permitidos. Tu cuenta ha sido bloqueada.",
        showConfirmButton: true,
      });
      // Bloquear la cuenta del usuario
      users.forEach((user) => {
        if (user.mail === mailInput.value) {
          user.block(); // Llama al método block para bloquear la cuenta
          saveUsers(users);
        }
      });
    } else {
      Swal.fire({
        position: "justify",
        icon: "warning",
        title: "Password Incorrecto. Intento " + attempts + " de 4.",
        showConfirmButton: true,
      });
    }
  }
}
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function recoverLs() {
  return JSON.parse(localStorage.getItem("users"));
}

const usersLS = recoverLs();

formGetInto.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = mailInput.value;
  const password = passInput.value;

  if (!email || !password) {
    alert("Por favor, complete todos los campos.");
    return;
  }

  initSession(usersLS, email, password);
});

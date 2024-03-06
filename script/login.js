const btnIngresar = document.querySelector("#getIntoForm"),
  mailInput = document.querySelector("#inputEmail"),
  passInput = document.querySelector("#inputPass");

let attempts = 0;

function initSession(users) {
  let userFound = users.find((userFound) => {
    console.log(userFound);
    return (
      userFound.mail == mailInput.value && userFound.pass == passInput.value
    );
  });

  if (userFound) {
    alert("Usuario encontrado");
    location.href = "./products.html";
  } else {
    attempts++;
    if (attempts >= 4) {
      alert(
        "Has excedido el número de intentos permitidos. Tu cuenta ha sido bloqueada."
      );
      users.forEach((user) => {
        if (user.mail === mailInput.value) {
          user.blocked = true;
          localStorage.setItem("users", JSON.stringify(users));
        }
      });
    } else {
      alert("Usuario No encontrado. Intento " + attempts + " de 4.");
    }
  }
}

function recoverLs() {
  return JSON.parse(localStorage.getItem("users"));
}

const usersLS = recoverLs();

btnIngresar.addEventListener("submit", (e) => {
  e.preventDefault();
  initSession(usersLS);
});

/* // Función para manejar el inicio de sesión
function handleLogin(email, enteredPassword) {
  // Verificar la contraseña utilizando tu lógica existente en JavaScript
  for (let i = 0; i < loginAttempts; i++) {
    if (parseInt(enteredPassword) === password) {
      loggedIn = true;
      alert("🪢🪡Bienvenido a LUANI Amigurumis 🪡🪢");
      break; // Sale del bucle si la contraseña es correcta
    } else {
      alert(
        "❗Ingresó incorrectamente su password, pruebe nuevamente. \nIntento: " +
          (i + 1)
      );
    }
  }

  if (!loggedIn) {
    alert(
      "Ha alcanzado el número máximo de intentos. \n🔒🔒Su cuenta ha sido bloqueada.🔒🔒"
    );
  }
}

// Evento de inicio de sesión
document.addEventListener("DOMContentLoaded", function () {
  let loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Evita que el formulario se envíe

      // Obtener los valores de correo electrónico y contraseña ingresados por el usuario
      let email = document.getElementById("exampleInputEmail1").value;
      let password = document.getElementById("exampleInputPassword1").value;

      // Llamar a la función handleLogin con los datos ingresados por el usuario
      handleLogin(email, password);
    });
  }
});
 */

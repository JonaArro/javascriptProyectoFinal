const formRegister = document.querySelector("#formReg"),
  nameReg = document.querySelector("#regName"),
  mailReg = document.querySelector("#regMail"),
  passReg = document.querySelector("#regPass"),
  btnReg = document.querySelector("#regBtn");

let users = JSON.parse(localStorage.getItem("users")) || [];

class User {
  constructor(name, mail, pass, status) {
    this.name = name;
    this.mail = mail;
    this.pass = pass;
    this.status = status || "new"; //Status: New;Block;recover
  }
  block() {
    this.status = "blocked";
  }
  recover() {
    this.status = "recover";
  }
}

function saveLs(arr) {
  return localStorage.setItem("users", JSON.stringify(arr));
}

formRegister.addEventListener("submit", (e) => {
  e.preventDefault();
  const existingUser = users.find((user) => user.mail === mailReg.value);

  if (existingUser) {
    Swal.fire({
      position: "justify",
      icon: "warning",
      title: "Ya existe un usuario registrado con este correo electrónico.",
      showConfirmButton: true,
    });
    return;
  }

  // Si no hay un usuario existente con el mismo correo, crear uno nuevo
  const newUser = new User(nameReg.value, mailReg.value, passReg.value);
  if (newUser.status === "new") {
    users.push(newUser);
    saveLs(users);
    Swal.fire({
      position: "justify",
      icon: "success",
      title: "Usuario creado exitosamente",
      showConfirmButton: true,
    }).then(() => {
      formRegister.reset();
      // Redireccionar a la pantalla de inicio de sesión
      window.location.href = "../pages/login.html";
    });
  } else {
    Swal.fire({
      position: "justify",
      icon: "error",
      title: "No puedes registrar un usuario bloqueado.",
      showConfirmButton: true,
    });
  }
});

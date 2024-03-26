const formRegister = document.querySelector("#formReg");
const nameReg = document.querySelector("#regName");
const mailReg = document.querySelector("#regMail");
const passReg = document.querySelector("#regPass");

class User {
  constructor(name, mail, pass, status) {
    this.name = name;
    this.mail = mail;
    this.pass = pass;
    this.status = status || "new"; //Status: New;Block;recover
  }
  block() {
    this.status = "blocked"; // a implementar logica cuando vea back
  }
  recover() {
    this.status = "recover"; // a implementar logica cuando vea back
  }
}

function saveLs(arr) {
  localStorage.setItem("users", JSON.stringify(arr));
}

// Cargar el archivo JSON de usuarios
async function loadUsersFromJson() {
  try {
    const response = await fetch("../data/usuarios.json");
    const usersJson = await response.json();
    return usersJson;
  } catch (error) {
    console.error("Error loading users from JSON:", error);
    return [];
  }
}

formRegister.addEventListener("submit", async (e) => {
  e.preventDefault();
  const usersJson = await loadUsersFromJson();
  const existingUserJson = usersJson.find(
    (user) => user.mail.toLowerCase() === mailReg.value.toLowerCase()
  );
  const existingUserLS = JSON.parse(localStorage.getItem("users")) || [];

  if (
    existingUserJson ||
    existingUserLS.find(
      (user) => user.mail.toLowerCase() === mailReg.value.toLowerCase()
    )
  ) {
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
    existingUserLS.push(newUser); // Agregamos el nuevo usuario al arreglo del Local Storage
    saveLs(existingUserLS); // Guardamos el arreglo actualizado en el Local Storage
    Swal.fire({
      position: "justify",
      icon: "success",
      title: "¡Registro exitoso!",
      text: "¡Bienvenido a nuestra tienda!",
      showConfirmButton: true,
    }).then((shouldResetForm) => {
      if (shouldResetForm) {
        formRegister.reset(); // Resetear el formulario solo si shouldResetForm es true
      }
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
